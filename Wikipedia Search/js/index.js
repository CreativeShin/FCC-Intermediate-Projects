$(document).ready(function() {
  // $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&search=martin&limit=10&namespace=0&format=json?callback=?', function(data){
  //   console.log(data);
  // });

  //   selectors
  var search = document.querySelector("#search");
  var button = document.querySelector("button");
  var mainContent = document.querySelector("#mainContent");
  var result = document.querySelectorAll(".result");
  var links = [];

  //   Events click and input
  button.addEventListener("click", function() {
    // alert(search.value);
    getData();
  });

  $("#search").on("keydown", function(event) {
    if (event.which === 13) {
      getData();
    }
  });

  //   Functions
  function getData() {
    $.ajax({
      url:
        "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
          search.value +
          "&limit=10&namespace=0&format=json",
      data: { action: "opensearch", format: "json" },
      dataType: "jsonp",
      success: function(data) {
        // console.log(data);
        mainContent.innerHTML = printData(data[2], data[3],data[1]);
        // data[2].forEach(function(searchResult){
        //   console.log(searchResult);
        // });
        // data[3].forEach(function(link) {
        //   links.push(link);
        // });
      }
    });
  }
  
});

function printData(data, links, title) {
  var strContent = "";
  for (i = 0; i < data.length; i++) {
    strContent +=
      "<a class='result animated fadeIn' target='_blank' href='" +
      links[i] +
      "'>" + "<h4 class='title'>" +title[i] + "</h4>"+
      "<div class='content  ui'>" +
      data[i] +
      "</div>" +
      "</a>";
  }
  return strContent;
}