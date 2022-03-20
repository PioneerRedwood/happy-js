const mapStatus = document.querySelector("#location-status");
const findMeButton = document.querySelector("#find-me");
const mapLink = document.querySelector("#map-link");
const mapContainer = document.querySelector("#weather-map");

// refer https://leafletjs.com/
function createMap(lat, lon) {
    const mapOptions = {
        center: [lat, lon],
        zoom: 15
    };

    const map = new L.map(mapContainer, mapOptions);
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
}

function geoSuccessHandler(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    mapStatus.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${lat}/${lon}`;

    mapLink.textContent = `This location Latitude: ${lat} °, Longitude: ${lon} °`;
    
    // localStorage
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lon);

    createMap(lat, lon);
}

function geoErrorHandler() {
    mapStatus.textContent = "Can't retrieve current position.";
}

function geoFindMe() {
    mapLink.href = "";
    mapLink.textContent = "";

    if(!navigator.geolocation) {
        mapStatus.textContent = "This browser does not support 'Geolocation' API.";
    } else {
        mapStatus.textContent = "Searching ... it might take a minutes";
        navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler);
    }
}

// document.querySelector("#find-me").addEventListener("click", geoFindMe);

if(localStorage.getItem("latitude") !== null && localStorage.getItem("longitude") !== null) {
    findMeButton.className = "hidden";
    setTimeout(geoFindMe, 500);
} else {
    findMeButton.className = "";
    findMeButton.addEventListener("click", geoFindMe);
}