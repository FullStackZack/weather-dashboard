// cities array
var cities = [];

function displayCityWeather() {

    // city search input
    var city = $("#find-city").val();
    // API call for current weather data
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=40bb3520956324a1bb57bdbfcf243b0f";

    // ajax call for city name, weather icon, current date, temperature(fahrenheit), humidity, & wind speed responses
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response)
        $("#current-weather").empty();

        var cityView = $("<div class='city'>");

        var name = response.name;

        var h2 = $("<h2>").text(name);

        var icon = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

        var img = $("<img>").attr("src", iconurl);

        var date = moment(response.dt, "X").format(" (MM/DD/YYYY) ")
        h2.append(date, img)

        var temp = response.main.temp;

        var p1 = $("<p>").text("Temperature: " + temp + " °F");

        var humidity = response.main.humidity;

        var p2 = $("<p>").text("Humidity: " + humidity + "%");

        var wind = response.wind.speed;

        var p3 = $("<p>").text("Wind Speed: " + wind + " MPH");

        // api call for uv index *used latitude & longitude*
        var uvQueryUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=40bb3520956324a1bb57bdbfcf243b0f&lat=" + response.coord.lat + "&lon=" + response.coord.lon

        // nested ajax function for uv index response
        $.ajax({
            url: uvQueryUrl,
            method: "GET"
        }).then(function(response) {
         console.log(response)
            var p4 = $("<p>").text("UV Index: " + response.value )
            cityView.append(h2, p1, p2, p3, p4);

            $("#current-weather").append(cityView);
        })    
    })

    // api call for 5 day forecast
    var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=40bb3520956324a1bb57bdbfcf243b0f"

    // ajax function for 5 day forecast
    $.ajax({
        url: fiveDayUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        $("#fiveDay").empty();

        var fiveDay = response.list;
        var row = $("<div class='row'>")
        for (var i = 0; i < fiveDay.length; i++) {
            
            if (fiveDay[i].dt_txt.includes("00:00:00")) {
             var col = $("<div class='col-sm-2'>")
             var card = $("<div class='card'>")
             var cardBody = $("<div class='card-body'>")
             var date = moment(fiveDay[i].dt, "X").format(" M/DD/YYYY ")
             var h5 = $("<h5 class='card-title'>").text(date)
             var icon = fiveDay[i].weather[0].icon;
             var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
     
             var img = $("<img>").attr("src", iconurl)
             var temp = fiveDay[i].main.temp;
             var p1 = $("<p>").text("Temperature: " + temp + " °F");
             var humidity = fiveDay[i].main.humidity;
             var p2 = $("<p>").text("Humidity: " + humidity + "%");

             cardBody.append(h5, img, p1, p2)
             card.append(cardBody)
             col.append(card)
             row.append(col)

            $("#fiveDay").append(row)
            }
              
        }

        $("#five-day-forecast").css("visibility", "visible");

    })
}

// city search buttons are created
function addButtons() {

    $("#city-buttons").empty();

    for (var i = 0; i < cities.length; i++) {

        var cityBtn = $("<button type='button' class='btn btn-secondary'>");

        cityBtn.addClass("city-btn");

        cityBtn.attr("data-city", cities[i]);

        cityBtn.text(cities[i]);

        $("#city-buttons").append(cityBtn);

        localStorage.setItem(cities, JSON.stringify(cities[i]))
    }
}

// onclick function for city search 
$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    var city = $("#find-city").val().trim();

    cities.push(city);

    addButtons();

    displayCityWeather();

});

addButtons();

$(document).on("click", ".city-btn", displayCityWeather);