# Weather Prediction Web App

## Overview
A responsive web application that provides real-time weather forecasts and predictions using API integration.

## Features
- ✅ Real-time weather data from OpenWeatherMap API
- ✅ 5-day weather forecast
- ✅ Search by city name
- ✅ Current conditions display (Temperature, Humidity, Wind Speed, Pressure)
- ✅ Responsive design (Mobile & Desktop)
- ✅ Weather alerts
- ✅ Temperature unit conversion (Celsius/Fahrenheit)

## Tech Stack
- **Backend:** Python (Flask)
- **Frontend:** HTML5, CSS3, JavaScript
- **API:** OpenWeatherMap API
- **Database:** SQLite (for caching)

## Project Structure
```
weather-app/
├── app.py              # Flask application
├── requirements.txt    # Dependencies
├── config.py           # Configuration
├── templates/
│   ├── index.html
│   ├── forecast.html
│   └── base.html
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
└── README.md
```

## Installation
```bash
# Clone repository
git clone <repo-url>

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export OPENWEATHERMAP_API_KEY="your_api_key"

# Run the app
python app.py
```

Visit: `http://localhost:5000`

## API Integration
- **Endpoint:** OpenWeatherMap API
- **Authentication:** API Key required
- **Data Points:** Temperature, Humidity, Pressure, Wind Speed, Weather Description
- **Update Frequency:** Real-time

## Technologies Used
- Python
- Flask
- HTML5/CSS3
- JavaScript
- REST APIs
- SQLite

## Features in Detail
- **Current Weather:** Real-time conditions for searched city
- **Forecast:** 5-day weather forecast with hourly details
- **Responsive Design:** Works on mobile, tablet, and desktop
- **Error Handling:** Graceful handling of invalid city names
- **Caching:** SQLite database for improved performance

## Future Features
- Historical weather data
- Weather alerts via email/SMS
- Multiple location tracking
- Weather charts and analytics
- Integration with location services
- Dark mode
- Multilingual support

## Requirements
- Python 3.7+
- Flask
- Requests
- SQLite3
