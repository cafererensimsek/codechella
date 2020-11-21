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

    tweets = api.search('#covid19', count=1)

    result = []
    token_list = []
    stop_words = set(nltk.corpus.stopwords.words('english'))

    for tweet in tweets:
        print(tweet.text)
        tokens = nltk.word_tokenize(re.sub('[^A-Za-z0-9]+', ' ', tweet.text))
        for token in tokens:
            if(token == 'RT' or '@' in token):
                token_list.delete(token)
            if (token not in stop_words):
                token_list.append(token)

    for token in token_list:
        result.append({'text': token, 'value': token_list.count(token)})

    return {'result': result}
