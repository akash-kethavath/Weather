let weather = {
    fetchWeather: function (city) {
        // First, we need to convert the city name to latitude and longitude using a geocoding service
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then((response) => response.json())
        .then((geoData) => {
            if (geoData.results && geoData.results.length > 0) {
                const { latitude, longitude, name, country } = geoData.results[0];
                this.getWeatherData(latitude, longitude, name, country);
            } else {
                console.error("City not found");
            }
        })
        .catch((error) => console.error("Error fetching geolocation data:", error));
    },

    getWeatherData: function (latitude, longitude, cityName, country) {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data, cityName, country))
        .catch((error) => console.error("Error fetching weather data:", error));
    },

    displayWeather: function (data, cityName, country) {
        const { temperature, windspeed } = data.current_weather;

        // Since Open-Meteo API doesn't provide icons or descriptions, you can use a default description
        document.querySelector(".city").innerText = `Weather in ${cityName}, ${country}`;
        document.querySelector(".icon").src = "https://www.example.com/default-icon.png"; // You can choose a default weather icon here
        document.querySelector(".description").innerText = "Current weather";
        document.querySelector(".temp").innerText = temperature + "°C";
        document.querySelector(".humidity").innerText = ""; // Open-Meteo doesn't provide humidity
        document.querySelector(".wind").innerText = "Wind speed: " + windspeed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${cityName}')`;
    },

    search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Default city weather when the page loads
weather.fetchWeather("Durgapur");

