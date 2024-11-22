document.addEventListener('DOMContentLoaded', () => {
    const IP_API = "https://api.ipify.org?format=json"; // Public IP API
    const LOCATION_API = "https://ipinfo.io/"; // Location API
    const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather"; // Weather API
    const WEATHER_API_KEY = "your_openweather_api_key"; // Replace with your OpenWeather API key

    async function getPublicIP() {
        try {
            const response = await fetch(IP_API);
            const data = await response.json();
            return data.ip; // Return the public IP address
        } catch (error) {
            console.error("Error fetching public IP:", error);
        }
    }

    async function getLocation(ip) {
        try {
            const response = await fetch(`${LOCATION_API}${ip}/json`);
            const data = await response.json();
            return {
                city: data.city,
                region: data.region,
                country: data.country,
                coordinates: data.loc // Latitude and longitude
            };
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    }

    async function getWeatherByIP(ip) {
        try {
            const response = await fetch(`${WEATHER_API}?q=${ip}&appid=${WEATHER_API_KEY}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching weather by IP:", error);
        }
    }

    async function getWeatherByLocation(location) {
        try {
            const [latitude, longitude] = location.coordinates.split(",");
            const response = await fetch(
                `${WEATHER_API}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching weather by location:", error);
        }
    }

    async function main() {
        const ip = await getPublicIP();
        console.log("Public IP:", ip);

        const location = await getLocation(ip);
        console.log("Location Info:", location);

        const weatherByIP = await getWeatherByIP(ip);
        console.log("Weather by IP:", weatherByIP);

        const weatherByLocation = await getWeatherByLocation(location);
        console.log("Weather by Location:", weatherByLocation);
    }

    main();
});
