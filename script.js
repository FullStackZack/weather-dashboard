$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    var city = $("#find-city").val();

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=40bb3520956324a1bb57bdbfcf243b0f";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#current-weather").text(JSON.stringify(response));

    });

})