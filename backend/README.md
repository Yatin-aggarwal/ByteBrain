# ByteBrain Backend

This is the backend service for **ByteBrain**, built using Node.js and Express, and connected to MongoDB.

## 🚀 Getting Started

Follow these steps to run the backend locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Yatin-aggarwal/ByteBrain.git
cd ByteBrain/backend
```

### 2. Install Dependencies
Make sure you have Node.js and npm installed. Then run:

```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the backend directory with the following content:

```bash
PORT=8000
MONGO_USER=<USERNAME>
MONGO_PASSWORD=<PASSWORD>
```

### 4. Start the Development Server

```bash
nodemon index.js
```
The server will start on http://localhost:8000.
