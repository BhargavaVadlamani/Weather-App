function getWeatherDetails() {
    var location = document.getElementById('location');
    var temperature = document.getElementById('temperature');
    var button = document.getElementById('btn');
    var weather = document.getElementById('weather');
    var image = document.getElementById('image');
    var dWeather = document.getElementById('detailedWeather');
    var lat,lon;
    var request
    var xhr = new XMLHttpRequest();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            request = 'https://fcc-weather-api.glitch.me/api/current?lat='+lat+'&'+'lon='+lon;
            console.log(request);
            
// initiate http request to get weather data          
            
            xhr.open('GET',request,true);
            xhr.send();
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    console.log(response);
                    
// populate various details from the response                    
                    
                    location.innerHTML = 'Location - ' + response.name;
                    temperature.innerHTML = response.main.temp + 'C';
                    button.innerHTML = 'Temperature';
                    weather.innerHTML = 'Weather - ' + response.weather[0].main;
                    dWeather.innerHTML = 'Detailed Weather - ' + response.weather[0].description;
                    image.src = response.weather[0].icon;
                } else {
                    if (xhr.status === 404) {
                        console.log('File not found!');
                    }
                }
                
            };
        })
    } else {
        console.log('There is no geolocation facility.')
    }
}

function tempToggle() {
    var temperature = document.getElementById('temperature').innerHTML;
    var temp;
    var arr = temperature.split('');
    for (var i=0; i<arr.length; i++) {
        if (arr[i] === 'C') {
            temp = temperature.slice(0,i);
            document.getElementById('temperature').innerHTML = ((temp * 9/5) + 32).toFixed(2) + "F";
            break;
        }
        if (arr[i] === 'F') {
            temp = temperature.slice(0,i);
            document.getElementById('temperature').innerHTML = ((temp - 32) * 5/9).toFixed(2) + 'C';
            break;
        }
    }
}

getWeatherDetails();