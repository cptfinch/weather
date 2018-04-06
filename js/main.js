function getWeather() {
  var requestUrl= "http://api.openweathermap.org/data/2.5/forecast?id=2648772&appid=fc55b6a55018f9461b19089fb9a3dc68";
  var request = new XMLHttpRequest();
  request.open('get', requestUrl);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    var weather = request.response;
    showWeatherDesc(weather['list'][0]['weather'][0]['description']);
    showWeatherTemp(weather['list'][0]['main']['temp']);
  }
}
function showWeatherDesc(weather) {
  const weatherDiv = document.getElementById('weather-div');
  weatherDiv.innerHTML = weather;
}
function showWeatherTemp(tempInKelvin) { 
  const weatherTempDiv= document.getElementById('weather-temp-div');
  if (inCelciusState){
    temperature = tempInKelvin-273;
  } else {
    temperature = (9.0/5.0) *(tempInKelvin - 273) + 32;
  }
  temperature=temperature.toFixed(1);
  var unit = 'C';
  if (inCelciusState) {
    unit='C';
  } else {
    unit = 'F'
  }
  weatherTempDiv.innerHTML = `${temperature} ${unit}`;
}

document.querySelector('#get-weather-button').addEventListener('click',getWeather);

//deal with toggling between c and f in the display of the temperature. 
inCelciusState=true;
temperature = 0

function showChangeInUnits() {
  var newTemperature = 0;
  weatherTempDiv= document.querySelector('#weather-temp-div');
  if (inCelciusState) {
    newTemperature = (9.0/5.0)*temperature + 32; 
    newTemperature = newTemperature.toFixed(1);
    newTemperature = `${newTemperature}F`;
    weatherTempDiv.innerHTML = newTemperature;
  } else {
      newTemperature = (5.0/9.0)*temperature - 32; 
      newTemperature = newTemperature.toFixed(1);
      newTemperature = `${newTemperature}C`;
      weatherTempDiv.innerHTML = newTemperature;
  }
}

function toggleBetweenCandF() {
  inCelciusState = !inCelciusState;
  showChangeInUnits();
  console.log('blahhhh');
}
document.querySelector('#weather-temp-div').addEventListener('click',toggleBetweenCandF);