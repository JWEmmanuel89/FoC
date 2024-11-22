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
          "x-rapidapi-key": "044e648b19mshfece6f865ead2b3p1a1a7ajsn036a4345378f"
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

    // Fetch weather details
    const responseW = await fetch(
      `https://community-open-weather-map.p.rapidapi.com/find?q=${location.city}&units=imperial`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": "044e648b19mshfece6f865ead2b3p1a1a7ajsn036a4345378f"
        }
      }
    );
    if (!responseW.ok) throw new Error("Failed to fetch weather details");
    const weather = await responseW.json();

    // Update weather details in the DOM
       weather.list[0].weather[0].description;
      console.log(weather.list[0].weather[0].main);
    } else {
      console.warn("No weather data available", weather);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Call the function
loadLocation();
