import "../styles/style.css";

const locationSubmit = document.querySelector('.locationSubmit');

locationSubmit.onclick = () => {
    const location = document.querySelector('#locationInput').value;

    getWeather(location);
}

function getWeather(location) {
    
    fetch(`https://api.weatherapi.com/v1/current.json?key=5214792350054eb78b5162558241604&q=${location}`, {
        mode: "cors",
    })
    .then (response => response.json())
    .then (response => console.log(response.current.temp_c));

}
