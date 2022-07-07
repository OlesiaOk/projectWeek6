//import "./styles.css";
function reciveTime() {
  let currentTime = new Date();
  let date = currentTime.getDate();
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[currentTime.getDay()];
  let monthes = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthes[currentTime.getMonth()];
  return `${day}, ${date} ${month} ${hours}:${minutes}`;
}
let currentDate = document.querySelector("#date");
currentDate.innerHTML = reciveTime();

function showCurrentTemperature(response) {
  const ct = document.querySelector("#city");
  ct.innerHTML = response.data.name;
  document.querySelector("#temperatureValue").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#sun").innerHTML = response.data.weather[0].icon;
}
function searchCity(city) {
  let apiKey = "3b6b66f380d0f8c6b4889aa8f7d07c34";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "3b6b66f380d0f8c6b4889aa8f7d07c34";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
  console.log(apiUrl);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
const searchCityTag = document.querySelector("#search-city");
searchCityTag.addEventListener("submit", handleSubmit);

const currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
