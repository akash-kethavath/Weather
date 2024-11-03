// OpenWeatherMap API key
const API_KEY = 'b3b8f9a151d976e14c12f0114f00f00f';

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityElement = document.getElementById('city');
const descriptionElement = document.getElementById('description');
const temperatureElement = document.getElementById('temperature');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const airQualityElement = document.getElementById('air-quality');

// Event listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Function to fetch weather data
async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found. Please try again.');
            return;
        }

        updateWeatherInfo(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data. Please try again.');
    }
}

// Function to update weather information
function updateWeatherInfo(data) {
    cityElement.textContent = `${data.name}, ${data.sys.country}`;
    descriptionElement.textContent = data.weather[0].description;
    temperatureElement.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    
    // Placeholder for air quality (you can integrate with another API if needed)
    airQualityElement.textContent = 'Air Quality: Data not available';
}

// Initial weather data (optional)
getWeather('London'); // You can set a default city here
