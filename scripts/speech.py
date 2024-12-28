import requests
import json
from dotenv import load_dotenv
import os
import base64
from openai import OpenAI
import openai

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI()


def transcribe_audio_with_api_key(local_audio_path):
    # Get API key from the environment variable
    api_key = os.getenv('GOOGLE_API_KEY')

    if not api_key:
        raise ValueError("API key not found. Please set the GOOGLE_API_KEY in the .env file.")

    print(f"Using API key: {api_key}")

    # API endpoint for Google Speech-to-Text
    url = f"https://speech.googleapis.com/v1/speech:recognize?key={api_key}"

    with open(local_audio_path, "rb") as audio_file:
        audio_content = base64.b64encode(audio_file.read()).decode("utf-8") 

    # Configure the request payload
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
        # Create an image using DALL·E 3
        response = client.images.generate(prompt=prompt,
        n=1,
        size="1024x1024",
        model="dall-e-3"  # Specify the DALL·E 3 model)
        )
        # Extract the image URL from the response
        image_url = response.data[0].url

        # Download the image
        image_data = requests.get(image_url).content

        # Save the image to a file
        with open(output_file, 'wb') as file:
            file.write(image_data)

        print(f"Image saved as {output_file}")

    except Exception as e:
        print(f"An error occurred: {e}")


# Example usage
if __name__ == "__main__":
    # Path to your audio file (adjust this path)
    audio_path = "/home/shadowx/VSCODE/hack$day/PostEZ/scripts/An_address_by_Opposition_Leader_Anthony_Albanese (mp3cut.net).mp3"  

    # try:
    #     # Call the function to transcribe the audio
    #     transcription = transcribe_audio_with_api_key(audio_path)
    #     print("Transcription:")
    #     print(transcription)
    # except Exception as e:
    #     print(f"An error occurred: {e}")
    try:
        prompt = "Illustrate a man demonstrating a lat pulldown"
        generate_image(prompt)
    except Exception as e:
        print(e)