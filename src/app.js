let apiKey = "20tf89a5ec2abe273e4324aaode1b5bf";
let celsius = null;

function displayWeather() {
  document.getElementById("current_weather").style.display = "block";
}

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
