import requests
from bs4 import BeautifulSoup
from googlesearch import search

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
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extract text content from the website
        paragraphs = soup.find_all("p")
        content = "\n".join(p.get_text(strip=True) for p in paragraphs)
        return content
    except Exception as e:
        return f"Failed to scrape {url}: {e}"

def search_and_scrape(query, num_results=3):
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

if __name__ == "__main__":
    query = input("Enter your search query: ")
    num_results = int(input("How many results would you like to scrape? "))
    
    scraped_data = search_and_scrape(query, num_results)
    
    print("\nScraped Content:")
    for url, content in scraped_data.items():
        print(f"\nURL: {url}\n")
        print(content[:1000])  
