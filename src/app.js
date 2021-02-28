function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function showDetails(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temperatureUnit");
  let cityElement = document.querySelector("#show-city");
  let descriptionElement = document.querySelector("#show-detail");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElemnent = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = `${response.data.name},${response.data.sys.country}`;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElemnent.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElemnent.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    console.log(forecast);
    forecastElement.innerHTML += `   
  <div class="col-2">
      <h3>${formatHours(forecast.dt * 1000)}</h3>
      <img
        src="images/${forecast.weather[0].icon}.png"/>
         <div class="weather-forecast-temperature">
          <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(
      forecast.main.temp_min
    )}°
        </div>
   </div>`;
  }
}

function search(city) {
  if (city !== "") {
    let apiKey = "a1436310c1d8f47f9c04f28cd4c73311";
    let apiUnits = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${apiUnits}`;

    axios.get(apiUrl).then(showDetails);
  } else {
    alert("Please type a city. . . ");
  }
  apiKey = "a1436310c1d8f47f9c04f28cd4c73311";
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-city");
  search(cityInputElement.value);
}

function showLocation(position) {
  //console.log(position);
  let apiKey = "a1436310c1d8f47f9c04f28cd4c73311";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showDetails);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperatureUnit");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperatureUnit");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = "null";

let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", handleSearch);

let currentLocationBtn = document.querySelector("#current-location-button");
currentLocationBtn.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Manila");
