import os
from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
import tempfile

from whisper_transcriber import transcribe_audio
from gemini_llm import gemini_generate

app = FastAPI()

# Enable CORS for frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/transcribe/")
async def transcribe(
    audio: UploadFile = File(...),
    model_size: str = Form("base"),
    task: str = Form("summary"),
):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
        tmp.write(await audio.read())
        tmp_path = tmp.name

    transcript = transcribe_audio(tmp_path, model_size)
    output = gemini_generate(transcript, task)
    os.remove(tmp_path)
    return {
        "transcript": transcript,
        "output": output
    }

from fastapi import WebSocket

@app.websocket("/ws/live_transcribe/")
async def websocket_live_transcribe(websocket: WebSocket):
    await websocket.accept()
    while True:
        audio_chunk = await websocket.receive_bytes()
        # Save chunk to temp file, transcribe incrementally
        # Use Whisper streaming or transcribe on chunk end
        transcript = "Live transcription is in progress..."  # Placeholder
        await websocket.send_text(transcript)

@app.post("/transcript_only/")
async def transcript_only(
    audio: UploadFile = File(...),
    model_size: str = Form("base")
):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
        tmp.write(await audio.read())
        tmp_path = tmp.name

    transcript = transcribe_audio(tmp_path, model_size)
    os.remove(tmp_path)
    return {
        "transcript": transcript
    }

@app.post("/generate_tools/")
async def generate_tools(
    transcript: str = Form(...),
    task: str = Form("quiz") # Or "flashcards"
):
    output = gemini_generate(transcript, task)
    return {
        "output": output
    }

@app.get("/health/")
async def health():
    return {"status": "backend running"}

from fastapi import WebSocket
from vosk_stream import recognize_stream

@app.websocket("/ws/transcribe/")
async def websocket_endpoint(websocket: WebSocket):
    await recognize_stream(websocket)
