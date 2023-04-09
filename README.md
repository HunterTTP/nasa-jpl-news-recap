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

1. The application relies on the OpenAI API for text summarization. Users need to have their own API key and be aware of the usage costs associated with the API.
2. The web scraping method used to fetch the latest news from NASA JPL's website may break if the website's structure changes. It is important to monitor and update the scraping logic as necessary.
3. The rover locations on the 3D Mars globe are currently hardcoded. Integrating a more dynamic method to fetch and display rover locations would make the application more robust and up-to-date.
4. The application is designed for local use or small-scale deployments. For larger-scale applications, consider using caching, optimizing resource usage, and deploying the application on a scalable infrastructure.
