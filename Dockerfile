# Frontend Dockerfile for Railway
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy frontend files
COPY . .

# Expose port (Railway will set PORT env var)
EXPOSE $PORT

# Set environment variables
ENV API_BASE=${API_BASE:-http://localhost:8000}

# Start server
CMD ["python", "server.py"]
