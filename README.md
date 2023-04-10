# NASA JPL News Recap

This project is a simple Flask web application that fetches the latest news from NASA's Jet Propulsion Laboratory (JPL) website, summarizes it using OpenAI's GPT-3 API, and displays it along with an interactive 3D Mars globe showing the locations of Mars rovers.

https://nasa-jpl-news-recap.herokuapp.com/

## Prerequisites

- Python 3
- Flask
- BeautifulSoup
- Requests
- OpenAI Python package
- An OpenAI API key

## Installation

1. Clone the repository
2. Install the required dependencies in requirements.txt
3. Create a file named `openai_api_key.txt` in the root directory of the project and populate it with your OpenAI API key.

## Usage

1. Start the Flask development server via app.py
2. Open your web browser and visit `http://localhost:5000`.

## Limitations

1. Users need to have their own OpenAI API key for the ChatGPT text sumamry.
2. The web scraping method used to fetch the latest news from NASA JPL's website may break if the website's structure changes.
3. The rover locations on the 3D Mars globe are currently hardcoded to the landing locations instead of real-time.
