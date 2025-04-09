# ByteBrain — FastAPI LLM Chat Backend

This is the backend service for ByteBrain — a FastAPI-based API server designed for building conversational applications using large language models (LLMs)

## 🚀 Getting Started

Follow these steps to run the backend locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Yatin-aggarwal/ByteBrain.git
cd ByteBrain/Api
```

### 2. Create a Conda Environment (Recommended)
To create the environment inside your project folder:

```bash
conda create --prefix ./env python=3.10
conda activate ./env
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## 🔐 Environment Variables
Create a .env file in the backend directory and add the following configuration:
```bash
MONGODB_USERNAME=<USERNAME>
MONGODB_PASSWORD=<PASSWORD>

EMAIL=<YOUR_GMAIL>
EMAIL_PASSWORD=<GMAIL_16_DIGIT_APP_PASSWORD>

hf_token=<HUGGING_FACE_TOKEN>
```
The server will start on http://localhost:8000.

## 🧪 Running the Server
```bash
uvicorn main:app --reload
```
