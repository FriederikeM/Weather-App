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

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let currentHours = now.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentHours}:${currentMinutes}`;
}

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

  // celsius to fahrenheit conversion

  celsiusTemperature = Math.round(response.data.main.temp);

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
    iconElement.setAttribute("class", "fas fa-cloud-showers-heavy");
  } else if (response.data.weather[0].icon === "09n") {
    iconElement.setAttribute("class", "fas fa-cloud-showers-heavy");
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
}

// forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
     <div class="col-2">
         <h3>
           ${formatHours(forecast.dt * 1000)}
         </h3>
       <img 
            src= "http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" id="forecast-icon"/>
        <div class="weather-forecast-temperature" id="weather-forecast-temperature">
           <strong><span class="forecast-temperature">${Math.round(
             forecast.main.temp_max
           )}</span>°</strong id="celsius-max"> 
        </div>
     </div>
     `;
  }
}

function searchCity(city) {
  let apiKey = "c3d15673f9179ab862ad1d46b1b4c163";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// format temperature unit

let celsiusTemperature = null;

function changeUnitToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let forecastItems = document.querySelectorAll(".forecast-temperature");
  forecastItems.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;

    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

  // to avoid double conversion
  celsius.addEventListener("click", changeUnitToCelsius);
  fahrenheit.removeEventListener("click", changeUnitToFahrenheit);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeUnitToFahrenheit);

function changeUnitToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = celsiusTemperature;

  let forecastItems = document.querySelectorAll(".forecast-temperature");
  forecastItems.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;

    // convert to Celsius
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });

  // to avoid double conversion
  celsius.removeEventListener("click", changeUnitToCelsius);
  fahrenheit.addEventListener("click", changeUnitToFahrenheit);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeUnitToCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Milan");
