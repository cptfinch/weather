//state store
//logic state, triggered from view events
var inCelciusState; //set on document load but also can change, ie triggered by a click event
var weatherDescription; //set on document load
var temperatureInKelvin; // set on document load
var latitude;
var longitude;

//view state (or view configuration)
var temperatureDisplayArea; 
var weatherDescriptionDisplayArea;

//secondary state 
var temperatureInCelcius;
var temperatureInFarenheit;

//state to be viewed
var temperatureInCelciusWithUnit ;
var temperatureInFarenheitWithUnit ;

//state getters and setters (a setter allows other components to be notified when it is changing state)
function setTemperatureInKelvin(params) {
  temperatureInKelvin = params.toFixed(1);
  console.log('blah3');
  notifyTempChange();
}

function notifyTempChange() {
  temperatureInCelcius = temperatureInCelciusCalc(); //secondary state updated
  console.log(temperatureInCelcius);
  temperatureInFarenheit = temperatureInFarenheitCalc(); //secondary state updated
  temperatureInCelciusWithUnit = `${temperatureInCelcius}C`;
  temperatureInFarenheitWithUnit = `${temperatureInFarenheit}F`;
  console.log(temperatureInFarenheit);
  showWeatherTemp(); //view the secondary state
}
//setting up state
function initializingState() {
  inCelciusState = true;
  getLocation();
  //getWeather();
  temperatureDisplayArea = document.getElementById('weather-temp-div');
  weatherDescriptionDisplayArea = document.getElementById('weather-div');
}

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
    });  
  } else {
    console.log('no geolocation in navigator object');
  }
}

function getWeather(lat,long) {
  // lat = 54.8297750 long = -1.4564970
  var requestUrl= `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=fc55b6a55018f9461b19089fb9a3dc68`;
  // var requestUrl= "http://api.openweathermap.org/data/2.5/forecast?id=2648772&appid=fc55b6a55018f9461b19089fb9a3dc68";
  var request = new XMLHttpRequest();
  request.open('get', requestUrl);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    var weather = request.response;
    setWeatherDescription( weather['list'][0]['weather'][0]['description']) ;
    setTemperatureInKelvin(weather['list'][0]['main']['temp']);
  }
}

function setWeatherDescription(params) {
  weatherDescription=params;
  console.log('blah2');
  notifyWeatherDescriptionChange();  
}
function notifyWeatherDescriptionChange() {
  showWeatherDesc(); 
}
//sub-state
function temperatureInCelciusCalc() {
  
  console.log((temperatureInKelvin-273).toFixed(1));
  return ((temperatureInKelvin-273).toFixed(1));
}
function temperatureInFarenheitCalc() {
  return ((9.0/5.0) *(temperatureInKelvin - 273) + 32).toFixed(1);
}
//events
// document.querySelector('#get-weather-button').addEventListener('click',getWeather);
document.querySelector('#weather-temp-div').addEventListener('click',toggleBetweenCandF);
window.onload = initializingState;

//change state
function toggleBetweenCandF() {
  inCelciusState = !inCelciusState;
  notifyUnitStateChange();
}
function notifyUnitStateChange() {
  showWeatherTemp();
}
//view
function showWeatherDesc() {
  weatherDescriptionDisplayArea.innerHTML = weatherDescription;
}
function showWeatherTemp() { 
  // if (inCelciusState){
  //   temperatureDisplayArea.innerHTML = 'yoo1';
  // } else{
  //   temperatureDisplayArea.innerHTML = 'yoo2';
  // }
  console.log(temperatureInCelciusWithUnit);
  temperatureDisplayArea.innerHTML = inCelciusState ? temperatureInCelciusWithUnit : temperatureInFarenheitWithUnit;
}
