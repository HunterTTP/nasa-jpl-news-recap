from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup
import openai

app = Flask(__name__)


def get_latest_news_url_and_content():
    response = requests.get('https://www.jpl.nasa.gov/news?sortBy=latestDate&page=1')
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
        prompt=f"Please make an engaging summary of the following text, keep it short and easy to read:\n\n{text}\n",
        temperature=0.7,
        max_tokens=300,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    summary = response.choices[0].text.strip()
    return summary


@app.route('/')
def index():
    latest_news_url, content = get_latest_news_url_and_content()
    summary = summarize_text(content)
    return render_template('index.html', summary=summary, press_release_url=latest_news_url)


if __name__ == '__main__':
    app.run(debug=True)
