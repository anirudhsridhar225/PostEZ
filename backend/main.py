from fastapi import FastAPI
from pydantic import BaseModel
from api.text_processing import process_text
from api.speech_to_text import transcribe_audio
from services.speech_service import generate_image

app = FastAPI()

class TextPrompt(BaseModel):
    prompt: str

@app.post("/process-text/")
async def process_text_endpoint(text: str):
    return await process_text(text)

@app.post("/transcribe-audio/")
async def transcribe_audio_endpoint():
    return await transcribe_audio()

@app.post("/generate-image/")
async def generate_image_endpoint(prompt: TextPrompt):
    result = generate_image(prompt.prompt)
    return {"message": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)