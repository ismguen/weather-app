// API-Schlüssel für OpenWeatherMap (zu Testzwecken sonst im Server speichern)
const API_KEY = "2cac22b93bc154a2d23da6682564eda2"

// DOM-Elemente
const searchBox = document.querySelector(".search input")   // Eingabefeld für die Stadt
const searchBtn = document.querySelector(".search button")  // Such-Button
const iconEl = document.querySelector(".weather-icon")      // Element für das Wetter-Icon

// Wenn der Such-Button geklickt wird
searchBtn.addEventListener("click", () => {
    const city = searchBox.value        // Lese den Stadtnamen aus dem Eingabefeld
    fetchWeather(city)                 // Aufruf der Funktion zum Abrufen der Wetterdaten
})      

// Asynchrone Funktion zum Abrufen der Wetterdaten
async function fetchWeather(city) {
    
    // HTTP-Request an die OpenWeatherMap API
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )

    // JSON-Antwort parsen
    const data = await response.json()
    console.log(data) // zur Überprüfung der Daten

    // Wetterdaten in der UI aktualisieren
    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"
    
    let condition = ""

    // Guckt, ob Wetterdaten vorhanden sind
    if (data.weather && data.weather.length > 0) {
        condition = data.weather[0].main // Haupt-Wetterzustand (z. B. Clear, Rain)
    }
    
    // Setzt das passende Emoji basierend auf dem Wetterzustand
    iconEl.textContent = getWeatherEmoji(condition)
}        

// Funktion zur Zuordnung eines Wetterzustands zu einem Emoji
function getWeatherEmoji(condition) {
    switch (condition) {
        case "Clear":
            return "☀️"
        case "Clouds":
            return "☁️"
        case "Rain":
            return "🌧️"
        case "Drizzle":
            return "🌦️"
        case "Thunderstorm":
            return "⛈️"
        case "Snow":
            return "❄️"
        case "Mist":
        case "Fog":
        case "Haze":
        case "Dust":
        case "Smoke":
        case "Sand":
        case "Ash":
            return "🌫️"
        case "Squall":
            return "💨"
        case "Tornado":
            return "🌪️"
        default:
            return "🌤️" 
    }
}

// fetchWeather("New York")
