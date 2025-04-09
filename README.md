# 🧠 Byte Brain Setup Guide

This guide walks you through setting up the environment and dependencies for the Byte Brain project. It includes installing necessary tools, running key services, and preparing the system for local development and experimentation.

---

## 🔧 Prerequisites

Make sure the following tools are installed on your machine:

### 1. [Ollama](https://ollama.com)
```bash
# Follow installation instructions from: https://ollama.com/download
```

### 2. [Docker](https://www.docker.com/get-started/)
```bash
# Follow installation instructions from: https://docs.docker.com/desktop/
```

### 3. [Anaconda / Miniconda](https://www.anaconda.com/download)
```bash
# Follow installation instructions from: https://www.anaconda.com/docs/main
```

### 4. [Anaconda / Miniconda](https://www.anaconda.com/download)
```bash
# Follow installation instructions from: https://www.anaconda.com/docs/main
```

## 🤖 Ollama Model Setup

This project uses multiple AI models served locally via [Ollama](https://ollama.com). Please make sure Ollama is installed and running on your system.

### 📥 Install Ollama

Follow the installation guide for your OS:  
👉 https://ollama.com/download

Once installed, start the Ollama service.

---

### 🚀 Run Required Ollama Models

Use the following commands to download and run each model:

```bash
ollama run mxbai-embed-large:latest
```
```bash
ollama run llava:latest
```
```bash
ollama run deepseek-llm:latest
```

## 🐳 Docker Container Setup

The Byte Brain project relies on several services running via Docker. Follow the steps below to spin up each required container.

---

### 1. 🔁 Redis 

Redis is used for caching and real-time data management.

```bash
docker run -d --name redis-stack \
-p 6379:6379 -p 8001:8001 \
redis/redis-stack:latest
```

### 2. 📚 ChromaDB

Used for vector storage and similarity search.

```bash
docker run -v ./chroma-data:/data \
-p 1020:8000 \
chromadb/chroma
```

### 3. 🐘 Zookeeper

docker run -p 2181:2181 zookeeper

```bash
docker run -v ./chroma-data:/data \
-p 1020:8000 \
chromadb/chroma
```

### 4. 📨 Kafka

Kafka is used for streaming data between services. Replace <IP_ADDRESS> with your machine’s IP address:

```bash
docker run -d -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<IP_ADDRESS>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<IP_ADDRESS>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

### 5. 🧩 MongoDB

Used as a primary NoSQL database for storing structured and semi-structured data.

```bash
docker run -d --name mongo_container \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=<USERNAME> \
-e MONGO_INITDB_ROOT_PASSWORD=<PASSWORD> \
mongo
```

## 📄 OCR Dependencies

The Byte Brain project uses OCR (Optical Character Recognition) to extract text from documents and images. The following tools must be installed:

---

### 🔠 Tesseract OCR

Tesseract is an open-source OCR engine used to recognize text in images.

#### ✅ Windows
- Download installer from:  
  [Tesseract at UB Mannheim](https://github.com/UB-Mannheim/tesseract/wiki)
- During installation, ensure the option to **add to system PATH** is checked.
- If not, manually add the Tesseract installation directory (e.g., `C:\Program Files\Tesseract-OCR`) to the system `PATH`.

#### ✅ macOS
```bash
brew install tesseract
```

#### To verify installation:
```bash
tesseract --version
```

---

### 📄 Poppler
Poppler is required to convert PDF documents to images or text, which can then be processed by Tesseract.

### ✅ Windows
- Download from:
 [Poppler Windows Builds](https://github.com/oschwartz10612/poppler-windows/releases)
- Extract the ZIP file.
- Add the bin/ directory to your system PATH.

### ✅ macOS
```bash
brew install poppler
```

#### To verify installation:
```bash
pdftoppm -h
```

## 📁 Clone & Setup Project
```bash
git clone https://github.com/Yatin-aggarwal/ByteBrain.git
```

```bash
cd ByteBrain
```


## ✅ You're all set!
Now you can begin working with Byte Brain! Ensure all services and dependencies are running in the background.
