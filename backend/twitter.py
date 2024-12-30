from requests_oauthlib import OAuth1Session
import os
import json
import base64

# Set your Twitter API credentials
consumer_key = "fQd6u5SoKW5RFmFDjbBcI4gNW"
consumer_secret = "dfnJ7gaeBysUXCJj36kTAu5mT1IY1a3gAzbRIH2UI7Dt3QANzb"

# First, we'll need to upload the media
def upload_media(oauth, image_path):
    # Read the image file
    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()
    
    # Encode image in base64
    b64_image = base64.b64encode(image_data).decode('utf-8')
    
    # Upload media to Twitter
    media_upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    files = {
        'media_data': b64_image
    }
    media_response = oauth.post(media_upload_url, files=files)
    
    if media_response.status_code != 200:
        raise Exception(
            "Media upload failed: {} {}".format(
                media_response.status_code, media_response.text
            )
        )
    
    return media_response.json()['media_id']

# Get request token
request_token_url = "https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write"
oauth = OAuth1Session(consumer_key, client_secret=consumer_secret)

try:
    fetch_response = oauth.fetch_request_token(request_token_url)
except ValueError:
    print("There may have been an issue with the consumer_key or consumer_secret you entered.")

resource_owner_key = fetch_response.get("oauth_token")
resource_owner_secret = fetch_response.get("oauth_token_secret")
print("Got OAuth token: %s" % resource_owner_key)

# Get authorization
base_authorization_url = "https://api.twitter.com/oauth/authorize"
authorization_url = oauth.authorization_url(base_authorization_url)
print("Please go here and authorize: %s" % authorization_url)
verifier = input("Paste the PIN here: ")

# Get the access token
access_token_url = "https://api.twitter.com/oauth/access_token"
oauth = OAuth1Session(
    consumer_key,
    client_secret=consumer_secret,
    resource_owner_key=resource_owner_key,
    resource_owner_secret=resource_owner_secret,
    verifier=verifier,
)
oauth_tokens = oauth.fetch_access_token(access_token_url)

access_token = oauth_tokens["oauth_token"]
access_token_secret = oauth_tokens["oauth_token_secret"]

# Make the request
oauth = OAuth1Session(
    consumer_key,
    client_secret=consumer_secret,
    resource_owner_key=access_token,
    resource_owner_secret=access_token_secret,
)

# Path to your image file
image_path = "X_logo.jpg"  # Replace with your image path

# Upload the image first
media_id = upload_media(oauth, image_path)

# Create payload with media
payload = {
    "text": "Hello world! This is a tweet with an image.",
    "media": {
        "media_ids": [str(media_id)]
    }
}

# Making the request
response = oauth.post(
    "https://api.twitter.com/2/tweets",
    json=payload,
)

if response.status_code != 201:
    raise Exception(
        "Request returned an error: {} {}".format(response.status_code, response.text)
    )

print("Response code: {}".format(response.status_code))

# Saving the response as JSON
json_response = response.json()
print(json.dumps(json_response, indent=4, sort_keys=True))