
const func = async () => {

	document.getElementById("info").style.display = 'none';
	document.getElementById("error").style.display = 'none';
	
	const add = document.getElementById("address").value;
	const encodedAddress = encodeURIComponent(add);
	const info = await geoCodeGenerator(encodedAddress).
	then((data)=>weatherInfo(data.lat,data.long,data.completeAdd)).catch((err)=>console.log(err));
 	
 	const tempEl = document.getElementById("temp");
 	const humidEl = document.getElementById("humidity");
 	const uvEl = document.getElementById("uv");
 	const windSpeedEl = document.getElementById("windSpeed");
 	const summaryEl = document.getElementById("summary");
 	const placeEl = document.getElementById("place");
 	const visibilityEl = document.getElementById("visibility");

 	if(typeof info==='string'){
 		setTimeout(()=>{
 			const errorEl = document.getElementById("error");
 			errorEl.innerHTML = `${info}`;
 			errorEl.style.display = 'block';	
 		},1800)
 	}
 	else{
 		document.getElementById("info").style.display = 'block';
		setTimeout(()=>{
			placeEl.innerHTML = `Location : ${info.add}`;
			tempEl.innerHTML = `Temperature : ${info.tempC} C / ${info.tempF} F`;
		 	humidEl.innerHTML = `Humidity : ${info.humidity}`;
		 	uvEl.innerHTML = `UV-Index : ${info.uvIndex}`;
		 	windSpeedEl.innerHTML = `Wind-Speed : ${info.windSpeed}`;
		 	visibilityEl.innerHTML = `Visibility : ${info.visibility}`
		 	summaryEl.innerHTML = `Summary : ${info.summary}`;
		},1800)
	}		
}	

