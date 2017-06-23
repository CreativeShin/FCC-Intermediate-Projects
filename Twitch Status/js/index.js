$(document).ready(function() {
  //   jQuery.ajaxPrefilter(function(options) {
  //     if (options.crossDomain && jQuery.support.cors) {
  //       options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
  //     }
  //   });

  //---------------------
  //Declarations and DOM
  //---------------------
  var online = [];
  var offline = [];
  var contentDiv = document.querySelector("#content");
  var onlineDiv = document.querySelector("#onlineDiv");
  var offlineDiv = document.querySelector("#offlineDiv");
  //==================
  //TWITCH API CALL
  // ==================
  var users = [
    "freecodecamp",
    "esl_sc2",
    "gale_adelade",
    "oasisonoverwatch",
    "imaqtpie",
    "brunofin"
  ];
  users.forEach(function(user) {
    twitchCall(user);
  });
  //  >>>>> Loop through online and offline and display their channel status, first online then offline <<<<<
  //   button event listeners

  $("#onlineBtn").on("click", function() {
    loadContent(online);
  });

  $("#offlineBtn").on("click", function() {
    loadContent(offline);
  });

  $("#allBtn").on("click", function() {
    loadContent(online, true);
    loadContent(offline, true);
  });

  loadDefault();

  //==============
  //  FUNCTIONS
  //===============

  function twitchCall(user) {
    $.getJSON(
      "https://wind-bow.gomix.me/twitch-api/users/" + user + "?callback=?",
      function(data) {
        //Add name and display_name to the HTML
        console.log(data.name);
        $.getJSON(
          "https://wind-bow.gomix.me/twitch-api/streams/" +
            data.name +
            "?callback=?",
          function(newData) {
              if(!data.error){
            if (newData.stream) {
              // console.log(newData.stream.channel.status);
              //             push the data inside an array for each user
            
              online.push({
                streamContent: newData.stream.channel.status,
                name: data.name,
                logo: data.logo,
                display_name: data.display_name
              });
            } else {
              // console.log("offline");
              offline.push({
                name: data.name,
                logo: data.logo,
                display_name: data.display_name
              });
            }}else{
              offline.push({
                name: data.message,
                logo: 'https://farm1.staticflickr.com/105/311128680_3ff5eef27f.jpg'
              })
            }
            loadDefault();
          }
        );
      }
    );
  }

  function loadContent(state, all) {
    var contentString = "",
      status;
    state.forEach(function(user) {
      var streamContent;

      if (!user.streamContent) {
        status = "Offline";
        streamContent = "Not streaming right now.";
      } else {
        streamContent = user.streamContent;
        status = "Online";
      }
      contentString +=
        "<a target='_blank' href='https://www.twitch.tv/" +
        user.name +
        "'" +
        "class='animated fadeIn " +
        status +
        "Div'>" +
        "<div class='row'> <div class='col-sm-3'>" +
        "<img src ='" +
        user.logo +
        "'>" +
        "</div>" +
        "<div class = 'col-sm-9'>" +
        "<h2 class='displayName'>" +
        user.display_name +
        "</h2> <h4 class='name'>" +
        user.name +
        "</h4> <p class='streamContent'>" +
        streamContent +
        "</p>" +
        "</div> </div>" +
        "</a>";
    });

    if (all) {
      if (status === "Online") {
        onlineDiv.innerHTML = contentString;
      } else {
        offlineDiv.innerHTML = contentString;
      }
    } else {
      if (status === "Online") {
        onlineDiv.innerHTML = contentString;
        offlineDiv.innerHTML = "";
      } else {
        offlineDiv.innerHTML = contentString;
        onlineDiv.innerHTML = "";
      }
    }
  }
  function loadDefault() {
    loadContent(online, true);
    loadContent(offline, true);
  }
});