
    fetchdata()
    const cities = [
        { name: 'New York', lat: 40.7128, lng: -74.0060 },
        { name: 'London', lat: 51.5074, lng: -0.1278 },
        { name: 'Paris', lat: 48.8566, lng: 2.3522 },
        { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
        { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
        { name: 'Rome', lat: 41.9028, lng: 12.4964 },
        { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
        { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
        { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
        { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
      ];

      async function fetchdata(lat,lng){
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
        const data = await response.json();
        return data;
        }

       console.log(cities)

      
      function selectRandomCity(cities) {
        const randomIndex = Math.floor(Math.random() * cities.length);
        return cities[randomIndex];
      }
    //  console.log(selectRandomCity(cities));
    async function fetchcities(){
      const city = selectRandomCity(cities)
           let data2 = await fetchdata(city.lat,city.lng)
          console.log("City : "+city.name +"  temperature: "+ data2.current_weather.temperature);
    }
    fetchcities()