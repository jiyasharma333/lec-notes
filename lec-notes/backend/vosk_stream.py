import os
import json
from fastapi import WebSocket
from vosk import Model, KaldiRecognizer

MODEL_PATH = "vosk-model-small-en-us-0.15"

# Load model ONCE at server start
vosk_model = Model(MODEL_PATH)

async def recognize_stream(websocket: WebSocket):
    await websocket.accept()
    rec = KaldiRecognizer(vosk_model, 16000)
    try:
        while True:
            data = await websocket.receive_bytes()
            if rec.AcceptWaveform(data):
                result = rec.Result()
                text = json.loads(result).get("text", "")
                await websocket.send_text(text)
            else:
                partial = rec.PartialResult()
                partial_text = json.loads(partial).get("partial", "")
                await websocket.send_text(partial_text)
    except Exception as e:
        print("Vosk websocket error:", e)
        await websocket.close()
