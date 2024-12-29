import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

async def process_text_service(text: str) -> str:
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=text,
        max_tokens=100
    )
    return response.choices[0].text.strip()