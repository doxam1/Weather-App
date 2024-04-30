import "../styles/style.css";

const locationSubmit = document.querySelector(".locationSubmit");
const weatherDisplayDiv = document.querySelector(".weatherDisplayDiv");

locationSubmit.onclick = () => {
  const location = document.querySelector("#locationInput").value;
  getWeather(location);
};

function getWeather(location) {
  // make it also in async/await.

  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5214792350054eb78b5162558241604&q=${location}&days=3`,
    {
      mode: "cors",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      weatherDisplayDiv.style.display = "flex";
      weatherDisplayDiv.innerHTML = `
        <h2 class="cityHeader"> ${response.location.name}, ${response.location.country}</h2>
        <div class="threeDayWeatherDivs">
        <div class="todayDiv"></div>
        <div class="tomorrowDiv"></div>
        <div class="dayAfterTomorrowDiv"></div>
        </div>`;

      const todayWeatherDiv = document.querySelector(".todayDiv");
      todayWeatherDiv.style.background = `center/40% url('http:${response.current.condition.icon}')`;
      todayWeatherDiv.innerHTML = `
        <h3> Today Weather </h3>
        <div> <b>Temp:</b> ${response.current.temp_c} <div>
        <div> <b>Condition:</b> ${response.current.condition.text} </div>        
        `;

      const tomorrowWeatherDiv = document.querySelector(".tomorrowDiv");
      tomorrowWeatherDiv.style.background = `center/40% url('http:${response.forecast.forecastday[1].day.condition.icon}')`;
      4;
      tomorrowWeatherDiv.innerHTML = `
      <h3> ${response.forecast.forecastday[1].date} </h3>
      <div> <b>Average temp:</b> ${response.forecast.forecastday[1].day.avgtemp_c} <div>
      <div> <b>Condition:</b> ${response.forecast.forecastday[1].day.condition.text} </div> 
      `;

      const dayAfterTomorrowWeatherDiv = document.querySelector(
        ".dayAfterTomorrowDiv"
      );
      dayAfterTomorrowWeatherDiv.style.background = `center/40% url('http:${response.forecast.forecastday[2].day.condition.icon}')`;
      dayAfterTomorrowWeatherDiv.innerHTML = `
      <h3> ${response.forecast.forecastday[2].date} </h3>
      <div> <b>Average temp:</b> ${response.forecast.forecastday[2].day.avgtemp_c} <div>
      <div> <b>Condition:</b> ${response.forecast.forecastday[2].day.condition.text} </div> 
      `;
    })
    .catch((msg) => {
      console.log(msg);
      weatherDisplayDiv.innerHTML = `<p> Sorry, I couldn't find a city or a country named ${location} </p>`;
    });
}
