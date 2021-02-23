function showDetails(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temperatureUnit");
  let cityElement = document.querySelector("#show-city");
  let descriptionElement = document.querySelector("#show-detail");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "a1436310c1d8f47f9c04f28cd4c73311";
let apiUnits = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=${apiKey}&units=${apiUnits}`;

axios.get(apiUrl).then(showDetails);
