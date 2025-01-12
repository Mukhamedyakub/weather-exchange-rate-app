require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

// Load API keys from .env
const weatherApiKey = process.env.WEATHER_API_KEY; // OpenWeather API key
const exchangeRateApiKey = process.env.EXCHANGE_RATE_API_KEY; // ExchangeRate API key
const exchangeRateApiUrl = `https://api.exchangerate.host/live?access_key=${exchangeRateApiKey}`;

// Middleware setup
app.use(express.static('public')); // Serve static files
app.use(bodyParser.urlencoded({ extended: true })); // Parse request body

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Route: Home Page
app.get('/', async (req, res) => {
    try {
        // Fetch USD to KZT exchange rate
        const exchangeRateResponse = await axios.get(exchangeRateApiUrl);
        const exchangeRate = exchangeRateResponse.data.quotes?.USDKZT;

        // Fetch a random joke
        const jokeResponse = await axios.get('https://geek-jokes.sameerkumar.website/api?format=json');
        const joke = jokeResponse.data.joke;

        // Render the home page with exchange rate and joke
        res.render('index', {
            weatherData: null,
            exchangeRate: exchangeRate ? exchangeRate.toFixed(2) : null,
            joke: joke || 'No joke available.',
            error: null,
        });
    } catch (error) {
        console.error('Error loading data:', error.message);
        res.render('index', {
            weatherData: null,
            exchangeRate: null,
            joke: 'Failed to load a joke.',
            error: 'Failed to load data. Please try again later.',
        });
    }
});

// Route: Fetch Weather Data
app.post('/', async (req, res) => {
    const city = req.body.city;

    try {
        // Fetch USD to KZT exchange rate
        const exchangeRateResponse = await axios.get(exchangeRateApiUrl);
        const exchangeRate = exchangeRateResponse.data.quotes?.USDKZT;

        // Fetch weather data for the specified city
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
        const weatherResponse = await axios.get(weatherUrl);
        const weather = weatherResponse.data;

        // Fetch a random joke
        const jokeResponse = await axios.get('https://geek-jokes.sameerkumar.website/api?format=json');
        const joke = jokeResponse.data.joke;

        // Prepare weather data
        const weatherData = {
            city: weather.name,
            country: weather.sys.country,
            temperature: weather.main.temp,
            feels_like: weather.main.feels_like,
            humidity: weather.main.humidity,
            pressure: weather.main.pressure,
            wind_speed: weather.wind.speed,
            description: weather.weather[0].description,
            icon: weather.weather[0].icon,
            coordinates: {
                lat: weather.coord.lat,
                lon: weather.coord.lon,
            },
            rain_volume: weather.rain ? weather.rain['3h'] || 0 : 0, // Rain volume in the last 3 hours
        };

        // Render the page with weather data, exchange rate, and joke
        res.render('index', {
            weatherData: weatherData,
            exchangeRate: exchangeRate ? exchangeRate.toFixed(2) : null,
            joke: joke || 'No joke available.',
            error: null,
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.render('index', {
            weatherData: null,
            exchangeRate: null,
            joke: 'Failed to load a joke.',
            error: 'Failed to load data. Ensure the city name is correct.',
        });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
