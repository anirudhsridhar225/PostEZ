import requests

import nest_asyncio
import json
#from llama_index.llms.gemini import Gemini
import json
from dotenv import load_dotenv
import os
import base64
from openai import OpenAI
import openai

from llama_index.core import Document
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core import VectorStoreIndex
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core import Settings
import google.generativeai as genai
from bs4 import BeautifulSoup
from googlesearch import search



# Load environment variables

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")
nest_asyncio.apply()
def get_embedding_model():
        # lc_embed_model = HuggingFaceEmbeddings(
        #     model_name="sentence-transformers/all-mpnet-base-v2"
        # )
    embeddings = OpenAIEmbedding(model="text-embedding-3-small")

    return embeddings#LangchainEmbedding(lc_embed_model)
#Settings.llm=llm = Gemini(api_key=os.getenv("GOOGLE_API_KEY"),model="models/gemini-1.5-flash")

Settings.embed_model=get_embedding_model()
def create_queries(input_text):
    """
    Generate a list of 5 search queries based on the input text.

    Args:
        input_text (str): A large string to generate queries from.

    Returns:
        list: A list of 5 generated search queries.
    """
    # Check if the input text is valid
    if not input_text or not isinstance(input_text, str):
        raise ValueError("Input text must be a non-empty string.")

    # Craft the prompt with the input text
    prompt = f"""
    You are an AI assistant specialized in generating search queries.
    Based on the following text, generate a list of exactly 5 concise, distinct and relevant search queries:
    
    Text: {input_text}
    
    Each query should be a single line and related to the main topics of the text.
    """
    
    # Generate the response using the model
    response = model.generate_content(prompt)  # Ensure 'model' is defined and initialized properly

    # Extract and process the response into a list of queries
    try:
        # Access the text content in the response structure
        text_content = response.candidates[0].content.parts[0].text.strip()

        # Split the content into individual queries
        queries = [query.strip() for query in text_content.split('\n') if query.strip()]
        print(queries)
        return queries
    except (AttributeError, IndexError) as e:
        raise RuntimeError(f"Failed to extract queries from response: {e}")


def scrape_website_content(url):
    """
    Scrapes text content from the given URL.

    Args:
        url (str): The URL to scrape.

    Returns:
        str: The scraped text content.
    """
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        # Extract text content from the website
        paragraphs = soup.find_all("p")
        content = "\n".join(p.get_text(strip=True) for p in paragraphs)
        return content
    except Exception as e:
        return f"Failed to scrape {url}: {e}"

def search_and_scrape(query, num_results=5):
    """
    Searches for a query online and scrapes text content from the top results.

    Args:
        query (str): The search query.
        num_results (int): Number of search results to scrape.

    Returns:
        dict: A dictionary with URLs as keys and their scraped content as values.
    """
    results = {}
    print(f"Searching for: {query}")
    try:
        # Perform the Google search
        for url in search(query, num_results=num_results, lang="en"):
            print(f"Scraping: {url}")
            content = scrape_website_content(url)
            results[url] = content
    except Exception as e:
        print(f"Error during search: {e}")
    return results

def process_queries(num_results=3):
    queries=create_queries(input())
    """
    Processes multiple search queries, scrapes content, and concatenates the results.

    Args:
        queries (list): A list of search queries.
        num_results (int): Number of search results to scrape per query.

    Returns:
        str: Concatenated string of all scraped content.
    """
    all_content = []
    for query in queries:
        scraped_data = search_and_scrape(query, num_results)
        for content in scraped_data.values():
            all_content.append(content)
    concatenated_content = "\n".join(all_content)
    return concatenated_content

# if __name__ == "__main__":
#     queries = [
#         "Python web scraping best practices",
#         "Beautiful Soup tutorial",
#         "How to use requests in Python"
#     ]
#     num_results = 3  # Number of search results to scrape per query
#     concatenated_text = process_queries(queries, num_results)
#     print("\nConcatenated Scraped Content:\n")
#     print(concatenated_text[:2000])  # Display only the first 2000 characters for brevity


def create_documents(full_text:str):
    document = Document(text=full_text)
    splitter = SentenceSplitter(chunk_size=500,chunk_overlap=100)
    nodes = splitter.get_nodes_from_documents([document]) 
    return nodes  
def create_index(full_text:list):
    nodes=create_documents(full_text)
    print(nodes)
    index = VectorStoreIndex(nodes)
def transcribe_audio_with_api_key(local_audio_path):



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


if __name__ == "__main__":

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
    ########################################33
    # try:
    #     prompt = "Illustrate a man demonstrating a lat pulldown"
    #     generate_image(prompt)
    # except Exception as e:
    #     print(e)
    full_text=process_queries()
    create_index(full_text)

    try:
        prompt = "Illustrate a man demonstrating a lat pulldown"
        generate_image(prompt)
    except Exception as e:
        print(e)

