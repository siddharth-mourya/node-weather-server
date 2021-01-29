const request = require('request')
var latlon;

const getCoordinates = (location, callback) => {
    const mapboxurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1IjoibW91cnlhc2lkZGhhcnRoOCIsImEiOiJja2pqcWl3NDIxYjViMzBxb3hoYXdpYTR5In0.M5OWIRvGS5TeOZiIhPe-8g";
    request({ url: mapboxurl, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect", undefined)
        }
        else if (body.features.length == 0) {
            callback("unable to connect to get coordinates", undefined)
        }
        else {
            latlon = body.features[0]["center"][0] + ',' + body.features[0]["center"][1];
            callback("success", latlon)
        }
    })
}

module.exports = getCoordinates;