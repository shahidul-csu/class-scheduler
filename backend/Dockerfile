FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /app/backend
COPY requirements.txt ./
RUN pip3 install -r requirements.txt
COPY . ./
EXPOSE 8000