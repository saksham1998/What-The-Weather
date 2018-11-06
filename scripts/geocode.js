const geoCodeGenerator = async (address)=>{
  const response = await fetch(`//api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&fuzzyMatch=false&access_token=pk.eyJ1Ijoic2Frc2hhbTE0IiwiYSI6ImNqbzJpMWl5aTBtbTEzcHF5Zm5zMGVlYmMifQ.RdCECSyypfcCIKonuqemJQ`);

  		if(response.status===200){
  			const body = await response.json();
  			if(body.features.length===0){
  				return obj = {lat:undefined,long:undefined}
  			}else{
  			var obj = { lat : body.features[0].geometry.coordinates[1],
              			long : body.features[0].geometry.coordinates[0],
              			completeAdd  : body.features[0].place_name 
              		}	
            return obj;  		
  		}}
  		else{
  			throw new Error(`Unable to fetch the location`)
  		}
}

const weatherInfo = async (lat,long,completeAdd)=>{
		let proxyUrl = `https://cors-anywhere.herokuapp.com/`;
		let url = `https://api.darksky.net/forecast/d62aa50b260a92398af29808a6f5e88a/${lat},${long}`;
		const response = await fetch(proxyUrl+url);

		if(lat===undefined||long===undefined){
				return `Unable To fetch weather information's for given area.......`
			}

		else if(response.status===200){
			const body = await response.json();
				var temp = body.currently.temperature;
		        var celsius = ((temp-32)*5/9).toFixed(2);
		        var obj = {
		        	add: completeAdd,
		        	tempF:temp,
		        	tempC:celsius,
		        	humidity: body.currently.humidity,
		        	uvIndex: body.currently.uvIndex,
		        	windSpeed: body.currently.windSpeed,
		        	summary: body.currently.summary,
		        	visibility: body.currently.visibility
		        }
		        return obj			
			}
}