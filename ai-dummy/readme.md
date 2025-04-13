# BattleTalk 1vs1

BattleTalk 1vs1 adalah sistem percakapan berbasis WebSocket yang menggunakan **Whisper** untuk Speech-to-Text dan **Ollama** untuk analisis percakapan. Sistem ini memungkinkan transkripsi suara secara real-time serta memberikan **feedback**, **scoring**, dan **rekomendasi skrip**.

## 🚀 Fitur
- **Transkripsi suara real-time** menggunakan model **Whisper**.
- **Evaluasi percakapan** dengan feedback berbasis grammar dan vocabulary.
- **Penilaian skor (1-3)** untuk performa berbicara masing-masing user.
- **Rekomendasi skrip** untuk membantu pengguna dalam percakapan.

## 📦 Instalasi
### 1. Persyaratan Sistem
Pastikan sistem Anda memiliki:
- Python 3.8+
- FFmpeg
- Dependencies yang diperlukan

### 2. Instalasi Dependensi
```sh
pip install -r requirements.txt
```

### 3. Instalasi FFmpeg (Windows)
Gunakan Chocolatey:
```sh
choco install ffmpeg
```

## 4. Instalasi Ollama
Pastikan Ollama telah terinstal di sistem Anda. Jika belum, ikuti langkah berikut:

Unduh dan instal Ollama dari [situs resmi Ollama](https://ollama.com/download).

Setelah instalasi selesai, jalankan perintah berikut untuk memastikan Ollama telah terinstal dengan benar:
```sh
ollama --version
```

## ⚙️ Cara Menjalankan Server
Jalankan server WebSocket dengan perintah berikut:
```sh
python server.py
```

Server akan berjalan pada `ws://localhost:8000`.

## 🔗 Format Komunikasi WebSocket
### 📤 Data yang dikirim oleh klien
```json
{
  "user": "user1",  
  "audio": "<base64-audio-data>"
}
```

### 📥 Data yang diterima oleh klien (transkripsi)
```json
{
  "user": "user1", 
  "text": "Hello, how are you?"
}
```

### 📥 Data hasil feedback
```json
{
  "feedback": {
    "user1": "Your grammar is good, try using more complex sentences.",
    "user2": "Your vocabulary is diverse, but watch out for grammar mistakes."
  }
}
```

### 📥 Data hasil scoring
```json
{
  "scoring": {
    "user1": 3,
    "user2": 2
  }
}
```

### 📥 Data hasil rekomendasi skrip
```json
{
  "recommend_script": {
    "user1": "You can ask about their favorite hobbies!",
    "user2": "Try to elaborate on your answer."
  }
}
```
