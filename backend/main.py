main.py

from fastapi import FastAPI
from pydantic import BaseModel
from api.text_processing import process_text
from api.speech_to_text import transcribe_audio
from services.speech_service import generate_image
from api.scraping import search_and_scrape

app = FastAPI()

class TextPrompt(BaseModel):
    prompt: str

class ScrapeQuery(BaseModel):
    query: str
    num_results: int

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

@app.post("/scrape/")
async def scrape_endpoint(scrape_query: ScrapeQuery):
    results = search_and_scrape(scrape_query.query, scrape_query.num_results)
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
