const apiKey = "YOUR_WEATHERSTACK_API_KEY"; // Replace with your OpenWeatherMap API key

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

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then((data) => {
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

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `Temperature: ${data.main.temp} °C`;
  weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  weatherInfo.classList.remove("hidden");
}
