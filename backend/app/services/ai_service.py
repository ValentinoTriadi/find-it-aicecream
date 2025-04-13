import asyncio
import websockets
import whisper
import tempfile
import json
import base64
import os
import ollama
import re

model = whisper.load_model("tiny.en")


class AIService:

    def __init__(self):
        self.audio_file = None
        self.transcript = None

    async def ensure_model_exists(self, model_name):
        """Cek apakah model tersedia, jika tidak, lakukan pull."""
        try:
            available_models = ollama.list()["models"]
            model_names = [m["name"] for m in available_models]

            if model_name not in model_names:
                print(
                    f"[INFO] Model '{model_name}' tidak ditemukan, sedang melakukan pull..."
                )
                pull_response = ollama.pull(model_name)
                print(f"[INFO] Pull selesai: {pull_response}")
            else:
                print(f"[INFO] Model '{model_name}' sudah tersedia.")

        except Exception as e:
            print(f"[ERROR] Gagal mengecek atau pull model: {e}")

    async def chat_with_ollama(self, prompt, requesting_user=None):
        """Mengirim permintaan ke Ollama dan memastikan respons valid untuk feedback, scoring, dan recommendations."""
        try:
            await self.ensure_model_exists("qwen2.5:0.5b")  # Pastikan model tersedia

            response = ollama.chat(
                model="qwen2.5:0.5b", messages=[{"role": "system", "content": prompt}]
            )
            response_text = response["message"]["content"]

            print(f"[INFO] Hasil dari Ollama: {response_text}")

            # **🔍 Cari JSON dengan regex yang lebih kuat**
            match = re.search(
                r"\{(?:[^{}]|(?:\{[^{}]*\}))*\}", response_text, re.DOTALL
            )

            if match:
                json_text = match.group(0)  # Ambil hanya bagian JSON
                parsed_data = json.loads(json_text)  # Parsing ke dictionary

                print(f"[INFO] Hasil dari Ollama (regex parsing): {parsed_data}")

                # **📌 Cek jenis respons yang tersedia**
                result = {}

                if "feedback" in parsed_data:
                    result["feedback"] = {
                        "user1": parsed_data["feedback"].get("user1", ""),
                        "user2": parsed_data["feedback"].get("user2", ""),
                    }

                if "scoring" in parsed_data:
                    result["scoring"] = {
                        "user1": str(
                            parsed_data["scoring"].get("user1", "")
                        ),  # Pastikan skor jadi string
                        "user2": str(parsed_data["scoring"].get("user2", "")),
                    }

                if "recommendations" in parsed_data:
                    result["recommendations"] = {
                        "user1": parsed_data["recommendations"].get(
                            "user1", "No recommendation available."
                        ),
                        "user2": parsed_data["recommendations"].get(
                            "user2", "No recommendation available."
                        ),
                    }


                # **🔄 Jika permintaan spesifik (recommend_script), hanya ambil bagian terkait**
                if requesting_user and "recommendations" in result:
                    return result["recommendations"].get(
                        requesting_user, "No recommendation found."
                    )

                return result if result else {"error": "No valid data found."}

            else:
                print("[ERROR] Failed to extract JSON, trying alternative method...")
                json_start = response_text.find("{")
                json_end = response_text.rfind("}")

                if json_start != -1 and json_end != -1:
                    json_text = response_text[json_start : json_end + 1]
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

    async def generate_feedback(self, conversation):
        """Menghasilkan feedback keseluruhan untuk semua user"""

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
            {conversation}

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

        result = await self.chat_with_ollama(prompt)

        # **Ambil hanya bagian feedback**
        return result.get("feedback", {"error": "No feedback available."})

    async def generate_scoring(self, conversation):
        """Menghasilkan skor keseluruhan 1-3 untuk semua user berdasarkan performa"""

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
            {conversation}

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

        result = await self.chat_with_ollama(prompt)

        # **Ambil hanya bagian scoring**
        return result.get("scoring", {"error": "No scoring available."})

    async def generate_recommend_script(self, requesting_user, conversation):
        """Generates conversational script recommendations using few-shot learning."""

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
        {conversation}

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

        result = await self.chat_with_ollama(prompt, requesting_user)

        # **Ambil hanya rekomendasi untuk user yang diminta**
        return (
            result
            if isinstance(result, str)
            else {"error": "No recommendation available."}
        )
