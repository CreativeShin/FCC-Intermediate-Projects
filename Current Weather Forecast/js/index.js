$(document).ready(function() {
  // jQuery.ajaxPrefilter(function(options) {
  //   if (options.crossDomain && jQuery.support.cors) {
  //     options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
  //   }
  // });
  // /////////////////////////////////////////////////

  // API
  var temperature = document.querySelector(".temperature");
  var location = document.querySelector(".location");
  var degree = document.querySelector(".degree");

  navigator.geolocation.getCurrentPosition(function(position) {
    var url =
      "https://api.darksky.net/forecast/dd66473f502c9dda199b67fbf024837b/" +
      position.coords.latitude +
      "," +
      position.coords.longitude  + '?callback=?';
    // console.log(url);
    $.getJSON(url, function(data) {
      console.log(data.currently);
      temperature.textContent = data.currently.temperature;
      location.textContent = data.timezone;
      var skyIcon = data.currently.icon.toUpperCase();
      skyIcon = skyIcon.replace(/-/g, "_");
      console.log(skyIcon);
      var skycons = new Skycons({ color: "white" });
      skycons.add("icon1", Skycons[skyIcon]);
      skycons.play();
      //       click event

      degree.addEventListener("click", function() {
        if (this.textContent === "F") {
          var roundedTemp = (Number(data.currently.temperature) - 32) * 5 / 9;
          roundedTemp = roundedTemp.toFixed(2);
          temperature.textContent = roundedTemp;

          this.textContent = "C";
        } else {
          temperature.textContent = data.currently.temperature;
          this.textContent = "F";
        }
      });
    });
  });
});