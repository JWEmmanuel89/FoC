async function loadLocation() {
  const myIpAddress = await fetch("https://api.ipify.org?format=json");
  
  const ipAddress = await myIpAddress.json();
  console.log("my IP Address is: ", ipAddress);
  const response = await fetch("https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip="+ipAddress.ip, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
		"x-rapidapi-key": "044e648b19mshfece6f865ead2b3p1a1a7ajsn036a4345378f"
	}
});
  const location = await response.json();

 document.getElementById("city").innerHTML = location.city;
 document.getElementById("country").innerHTML = location.country;  
 document.getElementById("isp").innerHTML = location.isp;  

  console.log(location); 


  const responseW = await fetch("https://community-open-weather-map.p.rapidapi.com/find?q="+location.city+"&units=imperial", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "044e648b19mshfece6f865ead2b3p1a1a7ajsn036a4345378f"
	}
});

  const weather = await responseW.json();

 document.getElementById("weather").innerHTML = weather.list[0].weather[0].description;
 

  console.log(weather.list[0].weather[0].main); 

}




loadLocation();
