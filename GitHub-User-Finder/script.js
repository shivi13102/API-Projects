const apiKey = "a07f3743f2591d05c08b8dadfd14e280"; // Replace with your Weatherstack API key

document.getElementById("search-btn").addEventListener("click", fetchWeather);

function fetchWeather() {
  const city = document.getElementById("city-input").value;
  const weatherInfo = document.getElementById("weather-info");
  const errorMsg = document.getElementById("error-msg");

  if (city.trim() === "") {
    errorMsg.textContent = "Please enter a city name!";
    errorMsg.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
    return;
  }

  // Weatherstack API URL
  const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch weather data!");
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error.info || "City not found!");
      }
      updateWeatherUI(data);
      errorMsg.classList.add("hidden");
    })
    .catch((error) => {
      errorMsg.textContent = error.message;
      errorMsg.classList.remove("hidden");
      weatherInfo.classList.add("hidden");
    });
}

function updateWeatherUI(data) {
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const weatherDescription = document.getElementById("weather-description");
  const weatherIcon = document.getElementById("weather-icon");
  const weatherInfo = document.getElementById("weather-info");

  cityName.textContent = `${data.location.name}, ${data.location.country}`;
  temperature.textContent = `Temperature: ${data.current.temperature} °C`;
  weatherDescription.textContent = `Weather: ${data.current.weather_descriptions[0]}`;
  weatherIcon.src = data.current.weather_icons[0];
  weatherIcon.alt = data.current.weather_descriptions[0];

  weatherInfo.classList.remove("hidden");
}
