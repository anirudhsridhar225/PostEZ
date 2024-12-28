import os
import base64
import requests
from dotenv import load_dotenv
from openai import OpenAI
import openai

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI()

async def transcribe_audio_service(file_path: str) -> str:
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key:
        raise ValueError("API key not found. Please set the GOOGLE_API_KEY in the .env file.")

    url = f"https://speech.googleapis.com/v1/speech:recognize?key={api_key}"

    with open(file_path, "rb") as audio_file:
        audio_content = base64.b64encode(audio_file.read()).decode("utf-8")

    payload = {
        "config": {
            "encoding": "MP3",
            "sampleRateHertz": 16000,
            "languageCode": "en-US"
        },
        "audio": {
            "content": audio_content
        }
    }

    headers = {"Content-Type": "application/json"}
    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        response_data = response.json()
        transcript = ""
        for result in response_data.get("results", []):
            transcript += result["alternatives"][0]["transcript"]
        return transcript
    else:
        raise Exception(f"API request failed: {response.status_code} - {response.text}")

def generate_image(prompt, output_file="generated_image.png"):
    try:
        response = client.images.generate(prompt=prompt, n=1, size="1024x1024", model="dall-e-3")
        image_url = response.data[0].url
        image_data = requests.get(image_url).content

        with open(output_file, 'wb') as file:
            file.write(image_data)

        print(f"Image saved as {output_file}")
    except Exception as e:
        print(f"An error occurred: {e}")