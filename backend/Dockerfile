# Gunakan image Python resmi
FROM python:3.12-slim

# Set lingkungan kerja dalam container
WORKDIR /app

# Salin semua file proyek ke dalam container
COPY . /app

# Install FFmpeg
RUN apt update && apt install -y ffmpeg

# Install semua dependensi Python
RUN pip install --no-cache-dir -r requirements.txt

# Expose port WebSocket
EXPOSE 8181

# Jalankan server WebSocket
CMD ["python", "-m", "app.main"]
