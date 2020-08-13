$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    var city = $("#find-city").val();

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={47413c02a6c4649e32aaf9c1d6864bf6}";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#current-weather").text(JSON.stringify(response));

        console.log(response);
    });

})