async function loadLocation() {
  try {
    // Fetch IP address
    const myIpAddress = await fetch("https://api.ipify.org?format=json");
    if (!myIpAddress.ok) throw new Error("Failed to fetch IP address");
    const ipAddress = await myIpAddress.json();
    console.log("My IP Address is: ", ipAddress.ip);

    // Fetch location details
    const response = await fetch(
      `https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip=${ipAddress.ip}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
          "x-rapidapi-key": "YOUR_RAPIDAPI_KEY"
        }
      }
    );
    if (!response.ok) throw new Error("Failed to fetch location details");
    const location = await response.json();

    // Update location details in the DOM
    if (location.city && location.country && location.isp) {
      document.getElementById("city").innerHTML = location.city;
      document.getElementById("country").innerHTML = location.country;
      document.getElementById("isp").innerHTML = location.isp;
    } else {
      console.warn("Incomplete location details", location);
    }

    console.log(location);

    // Fetch weather details using WeatherAPI
    const weatherAPIKey = "YOUR_WEATHERAPI_KEY"; // Get from https://www.weatherapi.com/
    const responseW = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${location.city}`
    );
    if (!responseW.ok) throw new Error("Failed to fetch weather details");
    const weather = await responseW.json();

    // Update weather details in the DOM
    if (weather && weather.current) {
      document.getElementById("weather").innerHTML =
        weather.current.condition.text;
      console.log(weather.current.condition.text);
    } else {
      console.warn("No weather data available", weather);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Call the function
loadLocation();
