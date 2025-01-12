# Weather & Exchange Rate App

## Overview

This application allows users to:
1. **Fetch real-time weather data** for any city using the OpenWeather API.
2. **View the current exchange rate** of USD to KZT using the ExchangeRate API.
3. **Locate the city on an interactive map** using Leaflet.js with coordinates provided by OpenWeather.
4. Enjoy a **random joke** displayed on every page reload, sourced from Geek Jokes API.

### Features
- **Clean and user-friendly interface** with centered weather details and a responsive design.
- **Dynamic joke refresh**: Every page load shows a new joke to keep users engaged.
- **Interactive map** for visualizing the entered city's location.
- **Error handling** for invalid city names or API failures.
- **Responsive layout** for mobile, tablet, and desktop users.

---

## Setup Instructions

### 1. Prerequisites
Ensure the following are installed on your system:
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### 2. Clone the Repository
```bash
git clone https://github.com/Mukhamedyakub/weather-exchange-rate-app.git
cd weather-exchange-rate-app
```

### 3. Install Dependencies
Run the following command to install required packages:
```bash
npm install
```

### 4. Register for API Keys
To use this application, you will need API keys from these services:

#### OpenWeather API (Weather and Geocoding)
1. Visit [OpenWeather API](https://openweathermap.org/api).
2. Sign up or log in to your account.
3. Navigate to the "API Keys" section in your account dashboard.
4. Generate an API key.

#### ExchangeRate API
1. Visit [ExchangeRate API](https://exchangerate.host/).
2. Sign up or log in to your account.
3. Follow the documentation to get your free API key.

### 5. Environment Variables
Create a `.env` file in the root of the project and add your API keys:
```env
WEATHER_API_KEY=your_openweather_api_key
EXCHANGE_RATE_API_KEY=your_exchangerate_api_key
```

> Replace `your_openweather_api_key` and `your_exchangerate_api_key` with your actual API keys.

### 6. Run the Application
Start the server:
```bash
node server.js
```

Open the application in your browser:
```
http://localhost:3000
```

---

## API Usage

### 1. OpenWeather API
**Base URL:** `https://api.openweathermap.org/data/2.5/weather`

- **Purpose:** Fetches real-time weather data.
- **Key Parameters:**
    - `q`: City name (e.g., `London`)
    - `units`: Metric system (`metric` for Celsius)
    - `appid`: Your OpenWeather API key

**Example Request:**
```bash
http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=your_openweather_api_key
```

**Response Includes:**
- `main.temp`: Temperature
- `main.feels_like`: Feels like temperature
- `main.humidity`: Humidity percentage
- `sys.country`: Country code
- `weather[0].description`: Weather description
- `coord.lat` and `coord.lon`: Coordinates for mapping

---

### 2. ExchangeRate API
**Base URL:** `https://api.exchangerate.host/latest`

- **Purpose:** Fetches the exchange rate of USD to KZT.
- **Key Parameters:**
    - `access_key`: Your API key
    - `base`: Base currency (e.g., `USD`)
    - `symbols`: Target currency (e.g., `KZT`)

**Example Request:**
```bash
https://api.exchangerate.host/latest?access_key=your_exchangerate_api_key&base=USD&symbols=KZT
```

**Response Includes:**
- `rates.KZT`: Exchange rate for USD → KZT.

---

### 3. Geek Jokes API
**Base URL:** `https://geek-jokes.sameerkumar.website/api?format=json`

- **Purpose:** Fetches a random programming or geek joke.
- **Example Request:**
```bash
https://geek-jokes.sameerkumar.website/api?format=json
```

**Response Includes:**
- `joke`: A random joke as a string.

---

## Key Features and Design Decisions

### 1. Random Joke Integration
- The application fetches a new joke from the Geek Jokes API every time the page is reloaded.
- This adds a fun, engaging element for users.

### 2. Weather and Exchange Rate Data
- Real-time weather information includes:
    - Temperature, feels-like temperature, humidity, and wind speed.
    - A weather icon and description for better user experience.
- Exchange rate (USD → KZT) is displayed prominently at the top.

### 3. Interactive Map
- Uses Leaflet.js to visualize the city’s location based on coordinates from the OpenWeather API.

### 4. Responsive Design
- Adapts to different screen sizes, providing a seamless experience across devices.
- Weather details and jokes are centered for better readability.

### 5. Error Handling
- Graceful handling of errors like:
    - Invalid city names.
    - API connection issues.
    - Missing or invalid API keys.

---

## File Structure

```
weather-exchange-rate-app/
├── public/
│   └── css/
│       └── style.css    # Styling for the app
├── views/
│   └── index.ejs        # Main HTML template
├── .env                 # Environment variables
├── server.js            # Application server
├── package.json         # Project dependencies and metadata
```

---

## How It Works

### 1. Home Page Load
- Fetches the USD → KZT exchange rate from the ExchangeRate API.
- Fetches a random joke from the Geek Jokes API.
- Displays the exchange rate and joke on the home page.

### 2. Search for Weather
- The user enters a city name and submits the form.
- Fetches weather data for the city from the OpenWeather API.
- Displays weather details and updates the map with the city's location.

---

## Screenshots

### 1. Home Page
- Displays the current exchange rate.
- Includes a weather search bar and a random joke.

### 2. Weather Results
- Shows detailed weather information.
- Displays a map pinpointing the city’s location.
