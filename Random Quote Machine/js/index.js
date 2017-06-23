$(document).ready(function() {
  $.ajaxSetup({ cache: false });

  var button = document.querySelector("button");
  var div = document.querySelector("#quote");
  var small = document.querySelector("small");
  var tweet = document.querySelector(".twitter-share-button");

  button.addEventListener("click", function() {
    $.getJSON(
      "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
      function(a) {
        div.innerHTML = a[0].content;
        small.textContent = "- " + a[0].title;
        tweet.setAttribute(
          "href",
          "https://twitter.com/intent/tweet?text=" + div.textContent
        );
      }
    );
  });
});