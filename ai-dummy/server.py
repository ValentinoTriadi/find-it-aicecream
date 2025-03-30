import asyncio
import websockets
import whisper
import tempfile
import json
import base64
import os
import ollama
import re

# Load Whisper model
model = whisper.load_model("medium.en")

# Menyimpan daftar klien yang terhubung dengan user ID
connected_clients = {}  # {websocket: "user1" / "user2"}

# Menyimpan transkripsi untuk setiap user
conversation_history = {"user1": [], "user2": []}

async def process_audio(data):
    """Mengonversi audio Base64 ke teks menggunakan Whisper"""
    try:
        user_id = data["user"]
        audio_base64 = data["audio"]

        # Decode Base64 menjadi bytes
        audio_bytes = base64.b64decode(audio_base64)

        # Simpan sebagai file sementara
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_audio:
            temp_audio.write(audio_bytes)
            temp_audio_path = temp_audio.name

        print(f"[INFO] ({user_id}) Menerima audio...")

        # Konversi WebM ke WAV menggunakan ffmpeg
        wav_path = temp_audio_path.replace(".webm", ".wav")
        ffmpeg_cmd = f"ffmpeg -i {temp_audio_path} -ar 16000 -ac 1 -c:a pcm_s16le {wav_path}"
        process = await asyncio.create_subprocess_shell(ffmpeg_cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
        stdout, stderr = await process.communicate()

        # Jika ffmpeg gagal, kirim error
        if process.returncode != 0:
            print(f"[ERROR] ffmpeg gagal: {stderr.decode()}")
            return {"error": "Konversi audio gagal"}

        print(f"[INFO] ({user_id}) Konversi selesai, memproses dengan Whisper...")

        # Proses dengan Whisper
        transcription = model.transcribe(wav_path)["text"]
        print(f"[INFO] ({user_id}) Hasil Transkripsi: {transcription}")

        # Simpan transkripsi ke conversation history
        conversation_history[user_id].append(transcription)

        # Hapus file sementara
        os.remove(temp_audio_path)
        os.remove(wav_path)

        return {"user": user_id, "text": transcription}

    except Exception as e:
        print(f"[ERROR] Gagal memproses audio: {e}")
        return {"error": "Gagal memproses audio."}
    
async def chat_with_ollama(prompt, requesting_user=None):
    """Mengirim permintaan ke Ollama dan memastikan respons valid untuk feedback, scoring, dan recommendations."""
    try:
        response = ollama.chat(model='deepseek-r1:8b', messages=[{"role": "system", "content": prompt}])
        response_text = response['message']['content']

        print(f"[INFO] Hasil dari Ollama: {response_text}")

        # **🔍 Cari JSON dengan regex yang lebih kuat**
        match = re.search(r"\{(?:[^{}]|(?:\{[^{}]*\}))*\}", response_text, re.DOTALL)

        if match:
            json_text = match.group(0)  # Ambil hanya bagian JSON
            parsed_data = json.loads(json_text)  # Parsing ke dictionary
            
            print(f"[INFO] Hasil dari Ollama (regex parsing): {parsed_data}")

            # **📌 Cek jenis respons yang tersedia**
            result = {}

            if "feedback" in parsed_data:
                result["feedback"] = {
                    "user1": parsed_data["feedback"].get("user1", ""),
                    "user2": parsed_data["feedback"].get("user2", "")
                }

            if "scoring" in parsed_data:
                result["scoring"] = {
                    "user1": str(parsed_data["scoring"].get("user1", "")),  # Pastikan skor jadi string
                    "user2": str(parsed_data["scoring"].get("user2", ""))
                }



            if "recommendations" in parsed_data:
                result["recommendations"] = {
                    "user1": parsed_data["recommendations"].get("user1", "No recommendation available."),
                    "user2": parsed_data["recommendations"].get("user2", "No recommendation available.")
                }

            # **🔄 Jika permintaan spesifik (recommend_script), hanya ambil bagian terkait**
            if requesting_user and "recommendations" in result:
                return result["recommendations"].get(requesting_user, "No recommendation found.")

            return result if result else {"error": "No valid data found."}

        else:
            print("[ERROR] Failed to extract JSON, trying alternative method...")
            json_start = response_text.find('{')
            json_end = response_text.rfind('}')
            
            if json_start != -1 and json_end != -1:
                json_text = response_text[json_start:json_end+1]
                parsed_data = json.loads(json_text)

                print(f"[INFO] Hasil dari Ollama (manual parsing): {parsed_data}")

                return parsed_data  # Kembalikan hasil parsing manual

            raise ValueError("Invalid JSON format")

    except (json.JSONDecodeError, ValueError) as e:
        print(f"[ERROR] JSON Parsing Error: {e}")
        return {"error": "Invalid JSON format from Ollama."}
    except Exception as e:
        print(f"[ERROR] Failed to generate response: {e}")
        return {"error": "Failed to generate response."}


async def generate_feedback():
    """Menghasilkan feedback keseluruhan untuk semua user"""
    conversation_text = "\n".join(
        [f"user1: {t}" for t in conversation_history["user1"]] +
        [f"user2: {t}" for t in conversation_history["user2"]]
    )

    prompt = f"""
    You are an AI language expert evaluating a conversation. Analyze the chat and provide constructive feedback for each user.

    ### **Examples (Few-Shot Learning)**  

    #### **Example 1:**  
    **Conversation:**  
    user1: "Hey, how are you today?"  
    user2: "I'm good, thank you! How about you?"  

    **Expected JSON Output:**  
    
json
    {{
        "feedback": {{
            "user1": "Your greeting is natural. You could add a follow-up question to keep the conversation flowing.",
            "user2": "Your response is polite. Try expanding your answer slightly to make the conversation more engaging."
        }}
    }}


    #### **Example 2:**  
    **Conversation:**  
    user1: "Do you think AI is useful?"  
    user2: "Yes, it's very helpful."  

    **Expected JSON Output:**  
    
json
    {{
        "feedback": {{
            "user1": "Your question is clear. You might add some context to encourage a more detailed response.",
            "user2": "Your response is brief. Consider elaborating on why you find AI useful."
        }}
    }}


    ---  

    ### **Now, analyze this conversation:**  

    **Conversation:**  
    {conversation_text}

    **Instructions:**  
    - Evaluate grammar and vocabulary.  
    - Suggest how to improve communication.  
    - Return ONLY JSON output in this exact format:  

    
json
    {{
        "feedback": {{
            "user1": "Feedback for user1...",
            "user2": "Feedback for user2..."
        }}
    }}

    """

    result = await chat_with_ollama(prompt)

    # **Ambil hanya bagian feedback**
    return result.get("feedback", {"error": "No feedback available."})

async def generate_scoring():
    """Menghasilkan skor keseluruhan 1-3 untuk semua user berdasarkan performa"""
    conversation_text = "\n".join(
        [f"user1: {t}" for t in conversation_history["user1"]] +
        [f"user2: {t}" for t in conversation_history["user2"]]
    )

    prompt = f"""
    You are evaluating a conversation. Assign an overall performance score (1-3) to each user based on their grammar, vocabulary, and fluency.

    ### **Examples (Few-Shot Learning)**  

    #### **Example 1:**  
    **Conversation:**  
    user1: "Hey, how are you today?"  
    user2: "I'm good, thank you! How about you?"  

    **Expected JSON Output:**  
    
json
    {{
        "scoring": {{
            "user1": 3,
            "user2": 3
        }}
    }}


    #### **Example 2:**  
    **Conversation:**  
    user1: "What you think AI do good?"  
    user2: "AI is help with many thing."  

    **Expected JSON Output:**  
    
json
    {{
        "scoring": {{
            "user1": 1,
            "user2": 2
        }}
    }}


    ---  

    ### **Now, analyze this conversation:**  

    **Conversation:**  
    {conversation_text}

    **Instructions:**  
    - Score each user between 1 (Poor) and 3 (Excellent).  
    - Base scores on grammar, vocabulary, and fluency.  
    - Return ONLY JSON output in this exact format:  

    
json
    {{
        "scoring": {{
            "user1": 1-3,
            "user2": 1-3
        }}
    }}

    """

    result = await chat_with_ollama(prompt)

    # **Ambil hanya bagian scoring**
    return result.get("scoring", {"error": "No scoring available."})


async def generate_recommend_script(requesting_user):
    """Generates conversational script recommendations using few-shot learning."""
    
    conversation_text = "\n".join(
        [f"user1: {t}" for t in conversation_history["user1"]] +
        [f"user2: {t}" for t in conversation_history["user2"]]
    )

    prompt = f"""
    You are an AI assistant that generates natural dialogue responses.  
    Analyze the given conversation, identify the main topic, and suggest appropriate replies for both users.

    ### **Examples (Few-Shot Learning)**  

    #### **Example 1:**  
    **Conversation:**  
    user1: "Hey, how are you today?"  
    user2: "I'm good, thank you! How about you?"  

    **Expected JSON Output:**  
    {{
        "recommendations": {{
            "user1": "I'm doing great! What have you been up to today?",
            "user2": "Glad to hear that! Any interesting plans for today?"
        }}
    }}

    #### **Example 2:**  
    **Conversation:**  
    user1: "Did you watch the new movie last night?"  
    user2: "Yes! It was amazing, I loved the plot twist."  

    **Expected JSON Output:**  
    {{
        "recommendations": {{
            "user1": "I know, right? That twist was totally unexpected! What was your favorite scene?",
            "user2": "Yeah! What part surprised you the most?"
        }}
    }}

    ---

    ### **Now, analyze this conversation:**  

    **Conversation:**  
    {conversation_text}

    **Instructions:**  
    - Identify the main topic.  
    - Suggest a natural response for each user.  
    - Return ONLY JSON output in this exact format:  

    
json
    {{
        "recommendations": {{
            "user1": "Suggested reply for user1...",
            "user2": "Suggested reply for user2..."
        }}
    }}
    """

    result = await chat_with_ollama(prompt, requesting_user)

    # **Ambil hanya rekomendasi untuk user yang diminta**
    return result if isinstance(result, str) else {"error": "No recommendation available."}

async def handle_client(websocket, path):
    """Menangani koneksi WebSocket dengan klien"""
    try:
        async for message in websocket:
            data = json.loads(message)

            # **Mendeteksi handshake pertama kali**
            if data.get("type") == "handshake":
                user_id = data["user"]
                connected_clients[websocket] = user_id  # Simpan user ID
                print(f"[INFO] Handshake diterima, klien {user_id} terhubung dari {websocket.remote_address}")
                continue  # Lewati ke pesan berikutnya

            # **Menentukan user saat klien pertama kali terhubung**
            if "user" in data:
                user_id = data["user"]
                connected_clients[websocket] = user_id  # Simpan user ID
                print(f"[INFO] Klien {user_id} terhubung dari {websocket.remote_address}")

            if "audio" in data:
                # Proses audio dengan Whisper
                response = await process_audio(data)

                # Broadcast hasil transkripsi ke semua klien
                await asyncio.gather(*(client.send(json.dumps(response)) for client in connected_clients))

            elif data.get("command") == "get_feedback":
                print(f"[INFO] Meminta feedback...")
                feedback = await generate_feedback()

                # Kirim feedback ke user yang sesuai
                for client, user in connected_clients.items():
                    if user == "user1":
                        await client.send(json.dumps({"feedback": feedback.get("user1", "")}))
                    elif user == "user2":
                        await client.send(json.dumps({"feedback": feedback.get("user2", "")}))

                print(f"[INFO] Feedback dikirim ke user1 dan user2.")

            elif data.get("command") == "get_scoring":
                print(f"[INFO] Meminta scoring...")
                scoring = await generate_scoring()

                # Kirim scoring ke user yang sesuai
                for client, user in connected_clients.items():
                    if user == "user1":
                        await client.send(json.dumps({"scoring": scoring.get("user1", "")}))
                    elif user == "user2":
                        await client.send(json.dumps({"scoring": scoring.get("user2", "")}))

                print(f"[INFO] Scoring dikirim ke user1 dan user2.")

            elif data.get("command") == "get_recommend_script":
                print(f"[INFO] Meminta rekomendasi script...")
                user = data.get("user", "user1")  # Default ke user1 jika tidak ada
                recommend_script = await generate_recommend_script(requesting_user=user)

                # Kirim hanya ke user yang meminta
                if websocket in connected_clients:
                    await websocket.send(json.dumps({"recommend_script": recommend_script}))

                print(f"[INFO] Rekomendasi script untuk {user} dikirim.")

    except websockets.exceptions.ConnectionClosed:
        print(f"[INFO] Klien {connected_clients.get(websocket, 'unknown')} terputus.")
    finally:
        if websocket in connected_clients:
            del connected_clients[websocket]  # Hapus dari daftar klien yang terhubung

async def main():
    """Menjalankan server WebSocket"""
    async with websockets.serve(handle_client, "0.0.0.0", 8000):
        print("Server WebSocket berjalan di ws://localhost:8000")
        await asyncio.Future()  # Menjaga server tetap berjalan

if __name__ == "__main__":
    asyncio.run(main())