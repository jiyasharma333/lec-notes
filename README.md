# Lec-Notes: AI Lecture Audio to Notes

**Lec-Notes** is a web application that helps students automatically convert lecture audio recordings into clear, structured notes using cutting-edge AI models (OpenAI Whisper for speech-to-text and Gemini API for summarization).  
The project consists of a React frontend (deployed on Vercel) and a Python FastAPI backend (runs locally).

## Features

- Upload long audio lectures and get text transcripts instantly
- AI-generated summarization and note formatting
- User-friendly React-based frontend
- Modular Python backend for easy experimentation
- Support for various audio file formats

## Demo

- **Frontend:** https://lec-notes.vercel.app
- **Backend:** *Runs locally only* — see instructions below


## Architecture

```
[User] → [React Frontend (Vercel)] → [Python FastAPI Backend (local)]
```

1. User uploads audio via the web interface.
2. Frontend sends file to backend via REST API (implemented with FastAPI).
3. Backend transcribes audio (Whisper), then summarizes (Gemini).
4. Notes and transcript are returned to the user.


## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+
- FFmpeg installed and on PATH
- [OpenAI Whisper](https://github.com/openai/whisper) dependencies
- Gemini API credentials (or valid substitute)

### Backend (Runs Locally)

1. **Clone the repo**
    ```
    git clone https://github.com/youruser/lec-notes.git
    cd lec-notes/backend
    ```

2. **Install dependencies**
    ```
    pip install -r requirements.txt
    ```

3. **Set up environment**
    - Copy `.env.example` to `.env` and fill in required API keys and config as needed.

4. **Run the backend**
    ```
    uvicorn app:app --reload
    ```
    *(Or replace `app:app` with your main FastAPI script/module)*

5. **Access API docs at**  
   [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend (React)

1. **Navigate to frontend folder**
    ```
    cd ../frontend
    ```

2. **Install frontend dependencies**
    ```
    npm install
    ```

3. **Setup environment variables**
    - Edit `.env` to set API URL, e.g.:  
      ```
      REACT_APP_API_URL=http://localhost:8000
      ```

4. **Run the frontend locally**
    ```
    npm start
    ```
    - Or deploy to Vercel for public access.

5. **Use the app**  
   Go to [http://localhost:3000](http://localhost:3000) or your Vercel deployment.

## Note on Backend Deployment

The backend currently **does not support public cloud deployment** due to large dependencies (Whisper/PyTorch).  
**It must be run locally on your machine.**  
Make sure your React frontend points to your local API instance for full functionality.

## Customization

- To use a different summarization service, update the backend accordingly.
- For deployment on different cloud/VPS, additional configuration may be required.

## Credits

- OpenAI Whisper(https://github.com/openai/whisper)
- Gemini API Documentation
- React/FastAPI Docs
