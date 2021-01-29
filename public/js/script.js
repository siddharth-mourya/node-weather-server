console.log("client side js");

function getLocation(loaction) {
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(loaction) + ".json?access_token=pk.eyJ1IjoibW91cnlhc2lkZGhhcnRoOCIsImEiOiJja2pqcWl3NDIxYjViMzBxb3hoYXdpYTR5In0.M5OWIRvGS5TeOZiIhPe-8g")
        .then((res) => {
            return (res.json());
        }).then((data) => {
            console.log(data);

            if (data.features.length == 0) {
                console.log("bad location");
            }
            else {
                latlon = data.features[0]["center"][0] + ',' + data.features[0]["center"][1];
                console.log(latlon);
                getWeather("success", latlon)
            }

        });
}


function getWeather(message, latlon) {
    console.log("in getweather", latlon);
    fetch(`http://api.weatherapi.com/v1/current.json?key=8630b45fe2054c5c81130955210501&q=${latlon}`).
        then((res) => {
            return res.json();
        }).then((data) => {
            if (data.current) {
                weather = data.current.condition;
                console.log(weather);
                placeInPage("success", weather)
            }
            else {
                console.log("NO loaction found with name")
                placeInPage("error", undefined)
            }
        })
}

function placeInPage(message, weather) {
    if (message == "success")
        document.getElementById("weather-data").innerHTML = weather.text;
    else
        document.getElementById("weather-data").innerHTML = "No location found with that name";

}

const form = document.getElementById("myform");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = document.getElementById("location_input");
    let weather = getLocation(location);

})