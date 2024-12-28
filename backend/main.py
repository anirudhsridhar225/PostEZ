from fastapi import FastAPI
from api.text_processing import process_text
from api.speech_to_text import transcribe_audio

app = FastAPI()

@app.post("/process-text/")
async def process_text_endpoint(text: str):
    return await process_text(text)

@app.post("/transcribe-audio/")
async def transcribe_audio_endpoint():
    return await transcribe_audio()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)