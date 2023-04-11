from flask import Flask, render_template
from bs4 import BeautifulSoup
import requests
import openai
import os
import json
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)


def get_latest_news_url_and_content():
    response = requests.get('https://www.jpl.nasa.gov/news?topics=Mars,Solar%20System,Stars%20and%20Galaxies,'
                            'Asteroids%20and%20Comets,Technology,Earth,Weather,Climate%20Change,Exoplanets,'
                            'Earthquakes,Robotics,CubeSats%20and%20SmallSats&page=1')
    html_content = response.text
    soup = BeautifulSoup(html_content, 'html.parser')
    card = soup.find('div', class_='SearchResultCard')
    target_page = card.find('a', href=lambda href: href.startswith('/news/'))
    link = 'https://www.jpl.nasa.gov' + target_page['href']

    response = requests.get(link)
    html_content = response.text
    soup = BeautifulSoup(html_content, 'html.parser')
    content_div = soup.find('div', itemprop='articleBody')
    content = content_div.find('div', class_='BlockText text-body-lg').get_text()

    return link, content


def summarize_text(text):
    try:
        with open("openai_api_key.txt", "r") as f:
            openai.api_key = f.read().strip()
    except FileNotFoundError:
        # If the file doesn't exist, fall back to the environment variable
        openai.api_key = os.environ.get("OPENAI_API_KEY")

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Make an engaging, easy to read and brief summary of this article:\n\n{text}\n",
        temperature=0.7,
        max_tokens=300,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    summary = response.choices[0].text.strip()
    return summary


def fetch_and_store_latest_news():
    latest_news_url, content = get_latest_news_url_and_content()
    summary = summarize_text(content)
    latest_news = {"summary": summary, "press_release_url": latest_news_url}

    with open("latest_news.json", "w") as f:
        json.dump(latest_news, f)


def read_latest_news():
    with open("latest_news.json", "r") as f:
        latest_news = json.load(f)
    return latest_news


@app.route('/')
def index():
    latest_news = read_latest_news()
    return render_template('index.html', summary=latest_news["summary"],
                           press_release_url=latest_news["press_release_url"])


if __name__ == '__main__':
    # Fetch and store the latest news at startup
    fetch_and_store_latest_news()

    # Schedule to fetch and store the latest news every 6 hours
    scheduler = BackgroundScheduler()
    scheduler.add_job(fetch_and_store_latest_news, 'interval', hours=6)
    scheduler.start()

    app.run(debug=True)
