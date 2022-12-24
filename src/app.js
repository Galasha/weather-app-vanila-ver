let apiKey = "20tf89a5ec2abe273e4324aaode1b5bf";
let celsius = null;

function displayWeather() {
  document.getElementById("current_weather").style.display = "block";
}

function formatDayForecast(timestamp) {
  let currentDate = new Date(timestamp * 1000);
  let day = currentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  console.log(days[day]);
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
      <div id="forecast_day"> ${formatDayForecast(forecastDay.time)}</div>
      <div id="forecast_icon">
        <img
          src=${forecastDay.condition.icon_url}
          id="weather_forecast_icon"
        />
      </div>
      <div class="forecast_temperature">
        <span id="forecast_temperature_max">${Math.round(
          forecastDay.temperature.maximum
        )}</span>
        <span id="forecast_temperature_min">${Math.round(
          forecastDay.temperature.minimum
        )}</span>
      </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function currentTemperature(response) {
  let newCityName = response.data.city;
  let CountryName = response.data.country;
  let newCity = document.querySelector("h2");
  newCity.innerHTML = `${newCityName}, ${CountryName}`;
  let currentTemperatureIs = Math.round(response.data.temperature.current);
  let updateTemperature = document.querySelector("#current_degrees");
  updateTemperature.innerHTML = currentTemperatureIs;
  let currentHumidity = response.data.temperature.humidity;
  let updateHumidity = document.querySelector("#curr_humidity");
  updateHumidity.innerHTML = currentHumidity;
  let currentWind = response.data.wind.speed;
  let updateWind = document.querySelector("#curr_wind");
  updateWind.innerHTML = currentWind;
  let currentWeather = response.data.condition.description;
  let updateWeather = document.querySelector("#curr_weather");
  updateWeather.innerHTML = currentWeather;
  let newIcon = document.querySelector("#current_icon_weather");
  newIcon.src = response.data.condition.icon_url;
  celsius = response.data.temperature.current;
  getForecast(response.data.coordinates);
}

function searchCity(event) {
  event.preventDefault();
  let searchCityName = document.querySelector("#search_city_name");
  let city = searchCityName.value;

  if (city !== null) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    axios.get(apiUrl).then(getForecast);
    axios.get(apiUrl).then(currentTemperature);
  } else {
    currentCityWeather();
  }
}

let searchForm = document.querySelector(".search_form");
searchForm.addEventListener("submit", searchCity);

function currentCityWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(currentTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentCityWeather);
}

let locationButton = document.querySelector(".dropdown-content");
locationButton.addEventListener("click", getCurrentPosition);

function formatDate(date) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentDate = new Date();
  let currentDayofWeek = daysOfWeek[currentDate.getDay()];
  let currentMonth = monthsOfYear[currentDate.getMonth()];
  let currentDay = currentDate.getDate();

  let request = `${currentDayofWeek}, ${currentMonth} ${currentDay} `;

  return request;
}

function formatTime() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour} : ${minutes}`;
}

current_date.innerHTML = formatDate();
current_time.innerHTML = formatTime();

function convertToFahr() {
  event.preventDefault();
  let a = 1.8;
  let b = 32;
  let fahrenheitdata = celsius * a + b;
  let currentDegreeC = document.querySelector("#current_degrees");
  currentDegreeC.innerHTML = Math.round(fahrenheitdata);
  convertCelsius.classList.remove("active");
  convertFahrenheit.classList.add("active");
}

function convertToCels() {
  event.preventDefault();
  let currentDegreeF = document.querySelector("#current_degrees");
  currentDegreeF.innerHTML = Math.round(celsius);

  convertFahrenheit.classList.remove("active");
  convertCelsius.classList.add("active");
}

let convertFahrenheit = document.querySelector("#fahrenheit");
convertFahrenheit.addEventListener("click", convertToFahr);

let convertCelsius = document.querySelector("#celsius");
convertCelsius.addEventListener("click", convertToCels);
