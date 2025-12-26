# Weather App

A modern, responsive weather application built with HTML, CSS, and Vanilla JavaScript. This app utilizes **Vercel Serverless Functions** to interact with the **OpenWeatherMap API**, providing real-time weather updates and a 5-day forecast.

## 🚀 Features
* **Real-time Weather:** Get current temperature, humidity, wind speed, and weather descriptions for any city.
* **5-Day Forecast:** Displays daily weather trends with icons and temperatures.
* **Dynamic UI:** The background gradient automatically updates based on the weather conditions (e.g., Clear, Clouds, Rain, Snow).
* **Serverless Architecture:** Uses Vercel Serverless Functions to securely handle API requests and keep your OpenWeather API key private.
* **Glassmorphism Design:** Modern UI featuring blurred glass effects, interactive transitions, and animated floating shapes.
* **Fully Responsive:** Optimized for desktop, tablet, and mobile viewing with custom media queries.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, and Vanilla JavaScript.
* **Backend:** Node.js (Vercel Serverless Functions).
* **API:** [OpenWeatherMap API](https://openweathermap.org/api).

## 📂 Project Structure

```
Weather-App
├── api/
│   ├── current-weather.js   # Serverless function for current weather
│   └── forecast-weather.js  # Serverless function for 5-day forecast
├── index.html               # Main application structure
├── script.js                # Frontend logic and DOM manipulation
├── style.css                # Custom styling and animations
├── package.json             # Backend dependencies
└── README.md                # Project documentation
```

## Setup and Installation

1. Clone the repository

  ```bash
  git clone <repo-link>
  cd weather-app
  ```

