let apiKey = "20tf89a5ec2abe273e4324aaode1b5bf";
let celsius = null;

function displayWeather() {
  document.getElementById("current_weather").style.display = "block";
}

function searchCity(event) {
  event.preventDefault();
  let searchCityName = document.querySelector("#search_city_name");
  let city = searchCityName.value;

  if (city !== null) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
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
