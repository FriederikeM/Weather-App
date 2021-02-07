// week day

let weekDay = document.querySelector("#week-day");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

weekDay.innerHTML = `${day}`;

// complete date

let completeDate = document.querySelector("#complete-date");

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];
let dates = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];
let date = dates[now.getDate()];
let year = now.getFullYear();

completeDate.innerHTML = `${date}/${month}/${year}`;

// Time

let time = document.querySelector("#time");
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}

let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

time.innerHTML = `${currentHours}:${currentMinutes}`;

// city display

let form = document.querySelector("#city-search");
let h1 = document.querySelector("h1");
form.addEventListener("submit", handleSubmit);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;

  // change of main icon

  let iconElement = document.querySelector("#main-icon");
  if (
    response.data.weather[0].icon === "03d" ||
    response.data.weather[0].icon === "03n"
  ) {
    iconElement.setAttribute("class", "fas fa-cloud");
  } else if (response.data.weather[0].icon === "04d") {
    iconElement.setAttribute("class", "fas fa-cloud");
  } else if (response.data.weather[0].icon === "04n") {
    iconElement.setAttribute("class", "fas fa-cloud");
  } else if (response.data.weather[0].icon === "01d") {
    iconElement.setAttribute("class", "fas fa-sun");
  } else if (response.data.weather[0].icon === "01n") {
    iconElement.setAttribute("class", "fas fa-moon");
  } else if (response.data.weather[0].icon === "02d") {
    iconElement.setAttribute("class", "fas fa-cloud-sun");
  } else if (response.data.weather[0].icon === "02n") {
    iconElement.setAttribute("class", "fas fa-cloud-moon");
  } else if (response.data.weather[0].icon === "09d") {
    iconElement.setAttribute("class", "fas fa-showers-heavy");
  } else if (response.data.weather[0].icon === "09n") {
    iconElement.setAttribute("class", "fas fa-showers-heavy");
  } else if (response.data.weather[0].icon === "10d") {
    iconElement.setAttribute("class", "fas fa-cloud-rain");
  } else if (response.data.weather[0].icon === "10n") {
    iconElement.setAttribute("class", "fas fa-cloud-rain");
  } else if (response.data.weather[0].icon === "13d") {
    iconElement.setAttribute("class", "far fa-snowflake");
  } else if (response.data.weather[0].icon === "13n") {
    iconElement.setAttribute("class", "far fa-snowflake");
  } else if (response.data.weather[0].icon === "50d") {
    iconElement.setAttribute("class", "fas fa-stream");
  } else if (response.data.weather[0].icon === "50n") {
    iconElement.setAttribute("class", "fas fa-stream");
  }

  // convert & show sunrise & sunset time

  function convertSunriseTime(timestamp) {
    let date = new Date(timestamp);
    let sunriseHours = date.getHours();
    if (sunriseHours < 10) {
      sunriseHours = `0${sunriseHours}`;
    }

    let sunriseMinutes = date.getMinutes();
    if (sunriseMinutes < 10) {
      sunriseMinutes = `0${sunriseMinutes}`;
    }

    return `${sunriseHours}:${sunriseMinutes}`;
  }

  let sunrise = convertSunriseTime(response.data.sys.sunrise * 1000);
  document.querySelector("#sunrise").innerHTML = `${sunrise}`;

  function convertSunsetTime(timestamp) {
    let date = new Date(timestamp);
    let sunsetHours = date.getHours();
    if (sunsetHours < 10) {
      sunsetHours = `0${sunsetHours}`;
    }

    let sunsetMinutes = date.getMinutes();
    if (sunsetMinutes < 10) {
      sunsetMinutes = `0${sunsetMinutes}`;
    }

    return `${sunsetHours}:${sunsetMinutes}`;
  }

  let sunset = convertSunsetTime(response.data.sys.sunset * 1000);
  document.querySelector("#sunset").innerHTML = `${sunset}`;
}

function searchCity(city) {
  let apiKey = "c3d15673f9179ab862ad1d46b1b4c163";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputcity1").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c3d15673f9179ab862ad1d46b1b4c163";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// format temperature unit

let fahrenheit = document.querySelector("#fahrenheit");
let temperatureElement = document.querySelector("#current-temperature");
let temperature = temperatureElement.innerHTML;
fahrenheit.addEventListener("click", changeUnitToFahrenheit);

function changeUnitToFahrenheit(event) {
  event.preventDefault();
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeUnitToCelsius);

function changeUnitToCelsius(event) {
  event.preventDefault();
  temperatureElement.innerHTML = `18`;
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
