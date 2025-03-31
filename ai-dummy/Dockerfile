# Gunakan image Python resmi
FROM python:3.10-slim

# Set lingkungan kerja dalam container
WORKDIR /app

# Salin semua file proyek ke dalam container
COPY . /app

# Install FFmpeg
RUN apt update && apt install -y ffmpeg

# Install semua dependensi Python
RUN pip install --no-cache-dir -r reqlist.txt

# Expose port WebSocket
EXPOSE 8000

# Jalankan server WebSocket
CMD ["python", "server.py"]
