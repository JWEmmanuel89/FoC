document.getElementById('fetchData').addEventListener('click', async () => {
    const results = document.getElementById('results');
    results.innerHTML = "Fetching data...";

    try {
        // 1. Get Public IP Address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;
        document.getElementById('ipAddress').innerText = `IP Address: ${ipAddress}`;

        // 2. Get Location based on IP Address
        const locationResponse = await fetch(`https://ipinfo.io/${ipAddress}?token=your_token_here`);
        const locationData = await locationResponse.json();
        const location = `${locationData.city}, ${locationData.region}, ${locationData.country}`;
        document.getElementById('location').innerText = `Location: ${location}`;

        // 3. Get Weather based on IP Address
        const weatherIPResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=your_api_key&q=${ipAddress}`);
        const weatherIPData = await weatherIPResponse.json();
        const weatherByIP = `Weather (by IP): ${weatherIPData.current.condition.text}, ${weatherIPData.current.temp_c}°C`;
        document.getElementById('weatherByIP').innerText = weatherByIP;

        // 4. Get Weather based on Location
        const weatherLocationResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=your_api_key&q=${locationData.city}`);
        const weatherLocationData = await weatherLocationResponse.json();
        const weatherByLocation = `Weather (by Location): ${weatherLocationData.current.condition.text}, ${weatherLocationData.current.temp_c}°C`;
        document.getElementById('weatherByLocation').innerText = weatherByLocation;

    } catch (error) {
        results.innerHTML = `Error: ${error.message}`;
    }
});
