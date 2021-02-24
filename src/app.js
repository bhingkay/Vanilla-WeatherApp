function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

  return `${day} ${hours}:${minutes}`;
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
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
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

function search(city) {
  if (city !== "") {
    let apiKey = "a1436310c1d8f47f9c04f28cd4c73311";
    let apiUnits = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${apiUnits}`;

    axios.get(apiUrl).then(showDetails);
  } else {
    alert("Please type a city. . . ");
  }
}

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-city");
  search(cityInputElement.value);
}

search("Manila");

let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", handleSearch);
