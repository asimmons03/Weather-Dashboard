// Get user's current geocoordinates for local weather

function getLocation() {
    var x = document.getElementById("recent-search");
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
   lat = position.coords.latitude;
   lon =  position.coords.longitude;
   console.log(lat);
   console.log(lon);

    var APIkey = "c56072178f0bb989c8acc4cc46b2c0ec"
    var uvWeatherURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIkey;
    var localWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=c56072178f0bb989c8acc4cc46b2c0ec";
   
   // Local forecast for the user's location
   function localWeather(){
       $.ajax({
           url: localWeatherURL,
           method: "GET"
         }).then(function(localResponse) {
           console.log(localResponse);

           // Get values for main local weather
           var localCity = localResponse.city.name;
           var localDate = localResponse.list[0].dt_txt;
           var localIcon = "https://openweathermap.org/img/w/" + localResponse.list[0].weather[0].icon + ".png";
           var localTemp = localResponse.list[0].main.temp;
           var localHumid = localResponse.list[0].main.humidity;
           var localWind = localResponse.list[0].wind.speed;
           $("#local-area").prepend(localCity);
           $("#local-date").prepend(localDate);
           $("#local-icon").attr("src", localIcon);
           $("#local-temp").prepend(localTemp);
           $("#local-humid").prepend(localHumid);
           $("#local-wind").prepend(localWind);

          // Gather values for 5 day forecast 
          // 1st Block
          var localFiveDateOne = localResponse.list[1].dt_txt;
          var localFiveIconOne = "https://openweathermap.org/img/w/" + localResponse.list[1].weather[0].icon + ".png";
          var localFiveTempOne = localResponse.list[1].main.temp;
          var localFiveHumidOne = localResponse.list[1].main.humidity;
          $("#local-five-date-one").prepend(localFiveDateOne);
          $("#local-five-icon-one").attr("src", localFiveIconOne);
          $("#local-five-temp-one").prepend(localFiveTempOne); 
          $("#local-five-humid-one").prepend(localFiveHumidOne);

          // 2nd Block
          var localFiveDateTwo = localResponse.list[6].dt_txt;
          var localFiveIconTwo = "https://openweathermap.org/img/w/" + localResponse.list[6].weather[0].icon + ".png";
          var localFiveTempTwo = localResponse.list[6].main.temp;
          var localFiveHumidTwo = localResponse.list[6].main.humidity;
          $("#local-five-date-two").prepend(localFiveDateTwo);
          $("#local-five-icon-two").attr("src", localFiveIconTwo);
          $("#local-five-temp-two").prepend(localFiveTempTwo); 
          $("#local-five-humid-two").prepend(localFiveHumidTwo);

          // 3rd Block
          var localFiveDateThree = localResponse.list[14].dt_txt;
          var localFiveIconThree = "https://openweathermap.org/img/w/" + localResponse.list[14].weather[0].icon + ".png";
          var localFiveTempThree = localResponse.list[14].main.temp;
          var localFiveHumidThree = localResponse.list[14].main.humidity;
          $("#local-five-date-three").prepend(localFiveDateThree);
          $("#local-five-icon-three").attr("src", localFiveIconThree);
          $("#local-five-temp-three").prepend(localFiveTempThree); 
          $("#local-five-humid-three").prepend(localFiveHumidThree);

          // 4th Block
          var localFiveDateFour = localResponse.list[22].dt_txt;
          var localFiveIconFour = "https://openweathermap.org/img/w/" + localResponse.list[22].weather[0].icon + ".png";
          var localFiveTempFour = localResponse.list[22].main.temp;
          var localFiveHumidFour = localResponse.list[22].main.humidity;
          $("#local-five-date-four").prepend(localFiveDateFour);
          $("#local-five-icon-four").attr("src", localFiveIconFour);
          $("#local-five-temp-four").prepend(localFiveTempFour); 
          $("#local-five-humid-four").prepend(localFiveHumidFour);

          // Block 5
          var localFiveDateFive = localResponse.list[30].dt_txt;
          var localFiveIconFive = "https://openweathermap.org/img/w/" + localResponse.list[30].weather[0].icon + ".png";
          var localFiveTempFive = localResponse.list[30].main.temp;
          var localFiveHumidFive = localResponse.list[30].main.humidity;
          $("#local-five-date-five").prepend(localFiveDateFive);
          $("#local-five-icon-five").attr("src", localFiveIconFive);
          $("#local-five-temp-five").prepend(localFiveTempFive); 
          $("#local-five-humid-five").prepend(localFiveHumidFive);
       });
   }
   // UV displayed
   function localUv(){
    $.ajax({
      url: uvWeatherURL,
      method: "GET"
      }).then(function(localUV) {
        console.log(localUV);
        var localUvItem = localUV.value;
        $("#local-uv").prepend(localUvItem);
      });
   }

   localUv();

   localWeather();
  }
  getLocation();



var retrieveHistory = localStorage.getItem("Search Result");
// This determines if retriveHistory already exists
if (retrieveHistory) {
  cities = retrieveHistory.split(",");
  renderButtons();
}

// Clear Search History 
  $("#clear-history").click(function() {
    localStorage.clear();
    cities = [];
    $("button.city-name").remove();
  });


// Function for displaying recent searches
function renderButtons() {

  // Deletes the old cities before searching up new ones
  $("#recent-search").empty();

  // Looping through the array of cities
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds class of movie-btn
    a.addClass("city-name");
    // Adds a data-attribute
    a.attr("data-name", cities[i]);
    // Providing the button text
    a.text(cities[i]);

    var history = localStorage.getItem("Search Result") || 0;
    localStorage.setItem("Search Result", cities);

    // Adding the button to the buttons-view div
    $("#recent-search").append(a);
  }
}

// This function handles events where a button is clicked
$("#search-button").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var city = $("#search-field").val().trim();
  var savedCity = $("#search-field").val().trim();


  // Pushes city to the array
  cities.push(city);

  // Renders to the city array
  renderButtons();
});



// Calling the function to display the initial buttons
renderButtons();