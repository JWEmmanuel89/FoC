document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch public IP
    async function getPublicIP() {
        try {
            const response = await fetch('https://api64.ipify.org?format=json');
            const data = await response.json();
            console.log('Public IP:', data.ip);
            return data.ip;
        } catch (error) {
            console.error('Error fetching public IP:', error);
        }
    }

    // Function to get location using IP
    async function getLocation(ip) {
        try {
            const response = await fetch(`https://ipapi.co/${ip}/json/`);
            const data = await response.json();
            console.log('Location Data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    }

    // Function to get weather using IP
    async function getWeatherByIP(ip) {
        const apiKey = 'your_weather_api_key'; // Replace with your weather API key
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ip}&appid=${apiKey}`);
            const data = await response.json();
            console.log('Weather Data by IP:', data);
        } catch (error) {
            console.error('Error fetching weather data by IP:', error);
        }
    }

    // Function to get weather using location
    async function getWeatherByLocation(location) {
        const apiKey = 'your_weather_api_key'; // Replace with your weather API key
        try {
            const { latitude, longitude } = location;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
            const data = await response.json();
            console.log('Weather Data by Location:', data);
        } catch (error) {
            console.error('Error fetching weather data by location:', error);
        }
    }

    // Main function to orchestrate API calls
    async function fetchDetails() {
        const ip = await getPublicIP();
        if (!ip) return;

        const locationData = await getLocation(ip);
        if (!locationData) return;

        await getWeatherByIP(ip);

        if (locationData.latitude && locationData.longitude) {
            await getWeatherByLocation(locationData);
        } else {
            console.error('Location coordinates missing.');
        }
    }

    fetchDetails();
});
