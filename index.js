const apiKey = "";

const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const sky = document.querySelector(".sky");

const input = document.querySelector(".input");
const value = document.querySelector(".cityInput");

const cityName = [];

input.addEventListener("click", function (e) {
  if (input) {
    cityName.push(value.value);
    e.preventDefault();
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0]; // Assuming the first result is correct
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

          return fetch(apiUrl);
        } else {
          throw new Error("City not found");
        }
      })
      .then((response) => response.json())
      .then((data) => {
        city.textContent = `${data.name}`;
        temp.textContent = `${data.main.temp}`;
        humidity.textContent = `${data.main.humidity}`;
        sky.textContent = `${data.weather[0].description}`;
      })
      .catch((error) => console.error("Error:", error));
  } else {
    console.log(cityName);
    console.log("error");
  }
});
