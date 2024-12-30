from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from api.text_processing import process_text
from api.speech_to_text import transcribe_audio
from services.speech_service import generate_image
from api.scraping import search_and_scrape
from api.trends import get_trending_tweets  # Correct function name

app = FastAPI()

class TextPrompt(BaseModel):
    prompt: str

class ScrapeQuery(BaseModel):
    query: str
    num_results: int

@app.api_route("/process-text/", methods=["GET", "POST"])
async def process_text_endpoint(text: str):
    return await process_text(text)

@app.api_route("/transcribe-audio/", methods=["GET", "POST"])
async def transcribe_audio_endpoint():
    return await transcribe_audio()

@app.api_route("/generate-image/", methods=["GET", "POST"])
async def generate_image_endpoint(prompt: TextPrompt):
    result = generate_image(prompt.prompt)
    return {"message": result}

@app.api_route("/scrape/", methods=["GET", "POST"])
async def scrape_endpoint(scrape_query: ScrapeQuery):
    results = search_and_scrape(scrape_query.query, scrape_query.num_results)
    return results

@app.get("/trending-tweets/")
async def trending_tweets_endpoint():
    try:
        tweets_data = get_trending_tweets()
        return tweets_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
