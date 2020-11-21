import tweepy
import config
from flask import Flask
import nltk
import re

app = Flask(__name__)


@app.route('/tweets', methods=['GET'])
def tweets():
    auth = tweepy.OAuthHandler(config.consumer_key, config.consumer_secret)
    auth.set_access_token(config.access_token_key, config.access_token_secret)
    api = tweepy.API(auth)

    tweets = api.search('#covid19', lang='en',
                        result_type='popular', count=200)

    counts = {}
    token_list = []
    ids = []
    result = []
    stop_words = nltk.corpus.stopwords.words('english') + ['https', 'rt', 'co']
    i = 0

    for tweet in tweets:
        tokens = nltk.word_tokenize(
            re.sub('[^A-Za-z0-9]+', ' ', tweet.text.lower()))
        for token in tokens:
            if('@' in token):
                continue
            if (token not in stop_words):
                token_list.append(token)

        if (i <= 10):
            ids.append(tweet.id_str)
            i += 1

    for token in token_list:
        if token in counts:
            counts[token] += 1
        else:
            counts[token] = 1

    for key in counts:
        result.append({'text': key, 'value': counts[key]})

    if(len(result) > 50):
        result = result[0:50]

    sorted(result, key=lambda i: i['value'], reverse=True)

    return {'words': result, 'favorites': ids}
