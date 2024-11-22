document.addEventListener("DOMContentLoaded", async () => {
    try {
        // 1. Get the public IP address
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;
        console.log("Public IP:", ipAddress);

        // 2. Get location information based on the IP address
        const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        const locationData = await locationResponse.json();
        console.log("Location Data:", locationData);

        const { city, region, country } = locationData;

        // 3. Fetch weather using IP address
        const weatherByIpResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${ipAddress}`);
        const weatherByIpData = await weatherByIpResponse.json();
        console.log("Weather by IP:", weatherByIpData);

        // 4. Fetch weather using location details
        const weatherByLocationResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${city},${region},${country}`);
        const weatherByLocationData = await weatherByLocationResponse.json();
        console.log("Weather by Location:", weatherByLocationData);

        // Update the page with fetched data
        document.body.innerHTML += `
            <div class="container mt-4">
                <h3>Your IP: ${ipAddress}</h3>
                <h4>Location: ${city}, ${region}, ${country}</h4>
                <h5>Weather (by IP): ${weatherByIpData.current.condition.text}, ${weatherByIpData.current.temp_c}°C</h5>
                <h5>Weather (by Location): ${weatherByLocationData.current.condition.text}, ${weatherByLocationData.current.temp_c}°C</h5>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching data:", error);
        document.body.innerHTML += `<p class="text-danger">An error occurred: ${error.message}</p>`;
    }
});
