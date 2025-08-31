# Используем официальный Python-образ
FROM python:3.11-slim

WORKDIR /app

COPY main.py ./
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "main:app"] 