import os
from dotenv import load_dotenv
import requests
from prompts import PROMPTS

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

def gemini_generate(transcript, task):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
    user_prompt = PROMPTS[task].format(transcript=transcript)

    headers = {
        "Content-Type": "application/json"
    }

    data = {
        "contents": [{
            "parts": [{"text": user_prompt}]
        }]
    }

    response = requests.post(url, headers=headers, json=data)
    if response.ok:
        try:
            return response.json()["candidates"][0]["content"]["parts"][0]["text"]
        except Exception:
            return f"Gemini response format error: {response.content}"
    else:
        return f"Gemini API request failed: {response.status_code}\n{response.content.decode()}"
