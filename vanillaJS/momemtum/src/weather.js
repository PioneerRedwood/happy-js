const weatherStatus = document.querySelector("#weather-status");
const searchWeatherButton = document.querySelector("#search-weather");
const WEATHER_API_KEY = "cb13e50602fb0a383cbcc5ff1509258c";

// refer https://openweathermap.org/api
function updateCurrentWeather(url, completionHandler) {
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.responseType = "json";
    xmlHttpRequest.onload = () => {
        const status = xmlHttpRequest.status;

        if (status == 200) {
            completionHandler(null, xmlHttpRequest.response);
        } else {
            completionHandler(status, xmlHttpRequest.response);
        }
    };
    xmlHttpRequest.send();
}

function searchWeatherHandler(error, data) {
    if(error !== null) {
        weatherStatus.textContent = `There is a problem to get weather data X_X [error: ${error}]`;
    } else {
        weatherStatus.textContent = `The current temperature is ${data.main.temp}°.`;
    }
} 

function searchWeather() {
    const lat = localStorage.getItem("latitude");
    const lon = localStorage.getItem("longitude");

    if (lat === null && lon === null) {
        weatherStatus.textContent = "Can't find the latitude and the longitude inside of localStorage";
    } else {
        updateCurrentWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`, searchWeatherHandler);
    }
}

// searchWeatherButton.addEventListener("click", searchWeather);
setTimeout(searchWeather, 500);