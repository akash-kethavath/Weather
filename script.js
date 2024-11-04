const WEATHER_API_KEY = '8a4dd1d64843e20f7390e25ad8fa2d51';
const AQI_API_KEY = '8a4dd1d64843e20f7390e25ad8fa2d51';

// DOM elements
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const cityElement = document.getElementById('city');
const descriptionElement = document.getElementById('description');
const temperatureElement = document.getElementById('temperature');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const airQualityElement = document.getElementById('air-quality');

// Event listeners
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeatherAndAQI();
});

// Function to fetch weather and AQI data
async function getWeatherAndAQI() {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        // Fetch weather data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === '404') {
            alert('City not found. Please try again.');
            return;
        }

        // Fetch AQI data using coordinates from weather data
        const { coord } = weatherData;
        const aqiResponse = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${AQI_API_KEY}`);
        const aqiData = await aqiResponse.json();

        updateWeatherInfo(weatherData, aqiData);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data. Please try again.');
    }
}

// Function to update weather and AQI information
function updateWeatherInfo(weatherData, aqiData) {
    cityElement.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    descriptionElement.textContent = weatherData.weather[0].description;
    temperatureElement.textContent = `${Math.round(weatherData.main.temp)}°C`;
    windElement.textContent = `${weatherData.wind.speed} m/s`;
    humidityElement.textContent = `${weatherData.main.humidity}%`;
    
    // Update air quality information
    const aqi = aqiData.list[0].main.aqi;
    const aqiLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    airQualityElement.textContent = `${aqiLabels[aqi - 1]} (${aqi})`;
}

// Initial weather and AQI data
getWeatherAndAQI('Hyderabad');
