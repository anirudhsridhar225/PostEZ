from requests_oauthlib import OAuth1Session
import os
import json

# Set your Twitter API credentials
consumer_key = "fQd6u5SoKW5RFmFDjbBcI4gNW"
consumer_secret = "dfnJ7gaeBysUXCJj36kTAu5mT1IY1a3gAzbRIH2UI7Dt3QANzb"

def get_trending_tweets():
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

    # First get the WOEID for worldwide trends (1 is the WOEID for worldwide)
    woeid = 1

    # Get trending topics
    trends_url = f"https://api.twitter.com/1.1/trends/place.json?id={woeid}"
    trends_response = oauth.get(trends_url)

    if trends_response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                trends_response.status_code, trends_response.text
            )
        )

    trends_data = trends_response.json()

    # Now get tweets for each trending topic
    tweets_data = []
    max_trends = 5  # Limit to top 5 trends to avoid rate limits

    for i, trend in enumerate(trends_data[0]['trends'][:max_trends]):
        trend_query = trend['query'] if 'query' in trend else trend['name']
        
        # Get tweets for this trend
        tweets_url = "https://api.twitter.com/2/tweets/search/recent"
        query_params = {
            'query': trend_query,
            'max_results': 10,  # Get 10 tweets per trend
            'tweet.fields': 'created_at,author_id,public_metrics'
        }
        
        tweets_response = oauth.get(
            tweets_url,
            params=query_params
        )
        
        if tweets_response.status_code != 200:
            print(f"Error getting tweets for trend {trend['name']}: {tweets_response.text}")
            continue
            
        trend_tweets = tweets_response.json()
        tweets_data.append({
            'trend': trend['name'],
            'tweet_volume': trend['tweet_volume'],
            'tweets': trend_tweets['data'] if 'data' in trend_tweets else []
        })

    return tweets_data