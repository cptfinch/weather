function getWeather() {
//  var requestURL = "https://cors.io/?https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&key";
var requestURL= "http://api.openweathermap.org/data/2.5/forecast?id=2648772&APPID=fc55b6a55018f9461b19089fb9a3dc68";
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    var weather = request.response;
    showWeather(weather['list'][0]['weather'][0]['description']);
  }
}
function showWeather(weather) {
  const weatherDiv = document.getElementById('weather-div');
  weatherDiv.innerHTML = weather;
}
document.querySelector('#get-weather-button').addEventListener('click',getWeather);
