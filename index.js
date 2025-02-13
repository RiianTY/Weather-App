const apiKey = "";

const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const sky = document.querySelector(".sky-status");
const feelsLike = document.querySelector(".feels-like");
const skyStatus = document.querySelector(".sky-status-txt");

const input = document.querySelector(".input");
const value = document.querySelector(".cityInput");

let cityName = [];

input.addEventListener("click", function (e) {
  if (value.value) {
    cityName.push(value.value);
    document.querySelector(".data").style.display = "inline";
    document.querySelector(".card").style.cssText = `
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 400px;
          padding: 10px;
          margin: 50%;
          background-color: rgb(255, 255, 255);
          box-shadow: 0 0 10px 1px rgb(156, 156, 156);
          border-radius: 10px;"`;

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0]; // Assuming the first result is correct
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

          return fetch(apiUrl);
        } else {
          throw new Error("City not found");
        }
      })
      .then((response) => response.json())
      .then((data) => {
        // document.querySelector(".temp-img").style.display = "flex";
        const weatherIconSelector =
          `./Images/animated/${data.weather[0].icon}-animated.gif` ||
          `./Images/static/${data.weather[0].icon}.png`;

        sky.innerHTML += `
                          <img class="sky-image" src="${weatherIconSelector}" alt="" />
                          `;
        skyStatus.textContent = `${data.weather[0].description}`;
        city.textContent = `${data.name}`;
        feelsLike.textContent = `feels like: ${Math.trunc(
          data.main.feels_like
        )}°C`;
        temp.textContent = `${Math.trunc(data.main.temp)}°C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
      })
      .catch((error) => console.error("Error:", error));
  } else {
    console.log(cityName);
    console.log("error");
  }
  cityName = [];
  value.value = "";
  sky.innerHTML = "";
});
