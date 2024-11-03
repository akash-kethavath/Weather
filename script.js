// OpenWeatherMap API key
const API_KEY = '8a4dd1d64843e20f7390e25ad8fa2d51';

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
    getWeather();
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
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    windElement.textContent = `${data.wind.speed} m/s`;
    humidityElement.textContent = `${data.main.humidity}%`;
    
    // Placeholder for air quality (you can integrate with another API if needed)
    airQualityElement.textContent = 'Data not available';
}

// Initial weather data
getWeather('Hyderabad');
