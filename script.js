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
        // Use a proxy server to make the API request
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
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
