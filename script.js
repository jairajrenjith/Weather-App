const API_KEY_PLACEHOLDER = "This is no longer needed on the client-side for security.";

document.getElementById("searchBtn").addEventListener("click", getWeather);

const weatherMap = {
    'Clear': 'clear-background',
    'Clouds': 'clouds-background',
    'Rain': 'rain-background',
    'Drizzle': 'drizzle-background',
    'Thunderstorm': 'thunderstorm-background',
    'Snow': 'snow-background',
    'Mist': 'mist-background',
    'Smoke': 'smoke-background',
    'Haze': 'haze-background',
    'Fog': 'fog-background',
    'default': 'default-background' 
};

function changeBackground(weatherMain) {
    const body = document.getElementById("appBody");
    const newClass = weatherMap[weatherMain] || weatherMap['default'];

    Object.values(weatherMap).forEach(cls => {
        body.classList.remove(cls);
    });
    body.classList.remove('default-background');

    body.classList.add(newClass);
}

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const card = document.getElementById("currentWeather");
    const loadingIndicator = document.getElementById("loading");
    
    if (!city) {
        alert("Enter a valid city name!");
        return;
    }
    
    document.getElementById("currentWeatherContent").innerHTML = ""; 
    card.classList.add("hidden");
    document.getElementById("forecastTitle").classList.add("hidden");
    document.getElementById("forecast").classList.add("hidden");
    card.classList.remove("initial-template");
    loadingIndicator.classList.remove("hidden");
    
    const currentWeatherURL = `/api/current-weather?city=${city}`;

    try {
        const currentRes = await fetch(currentWeatherURL);
        const currentData = await currentRes.json();
        
        loadingIndicator.classList.add("hidden");

        if (currentData.cod !== 200) {
            alert("City not found!");
            card.classList.add("initial-template");
            changeBackground('default');
            return;
        }

        displayCurrentWeather(currentData);
        changeBackground(currentData.weather[0].main);

        const { lat, lon } = currentData.coord;

        const forecastURL = `/api/forecast-weather?lat=${lat}&lon=${lon}`;

        const forecastRes = await fetch(forecastURL);
        const forecastData = await forecastRes.json();

        displayForecast(forecastData);

    } catch (error) {
        console.error(error);
        loadingIndicator.classList.add("hidden");
        card.classList.add("initial-template");
        alert("Something went wrong with the server!");
        changeBackground('default');
    }
}


function displayCurrentWeather(data) {
    const card = document.getElementById("currentWeather");
    const content = document.getElementById("currentWeatherContent");

    card.classList.remove("initial-template");

    content.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <h1>${Math.round(data.main.temp)}°C</h1>
        <p>${data.weather[0].description.toUpperCase()}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        <p class="detail-line">Humidity: <span>${data.main.humidity}%</span></p>
        <p class="detail-line">Wind: <span>${data.wind.speed} m/s</span></p>
    `;

    card.classList.remove("hidden");
}

function displayForecast(data) {
    const box = document.getElementById("forecast");
    box.innerHTML = "";

    const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    daily.forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        box.innerHTML += `
            <div class="forecast-item">
                <h4>${date}</h4>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].main}">
                <p>${Math.round(item.main.temp)}°C</p>
                <p>${item.weather[0].main}</p>
            </div>
        `;
    });

    document.getElementById("forecastTitle").classList.remove("hidden");
    box.classList.remove("hidden");
}
