const express = require("express");
const app = express();
const request = require('request')
const path = require('path')
const getCoordinates = require('../utils/geoCode')

//setting path to static file serving 
const staticPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')

//letting express know what is static path 
app.use(express.static(staticPath));

// configuring view engine, viewspath in express
app.set('view engine', 'ejs')
app.set('views', viewsPath)

//routing
app.get('', (req, res) => {
    let data = { name: "siddharth", date: "23-nov-2020" }
    res.render('index', { data })
})

app.get('/about', (req, res) => {
    let data = { name: "siddharth", date: "23-nov-2020" }
    res.render('about', { data })
})

app.get('/help', (req, res) => {
    let data = { name: "siddharth", date: "23-nov-2020" }
    res.render('help', { data })
})

// weather api
app.get('/weather', (req, res) => {
    var weather;
    if (!req.query.location) {
        return res.send({
            "error": "please enter the address",
        });
    }
    else {
        var location = req.query.location;
        getCoordinates(location, (message, latlon) => {
            const url = 'http://api.weatherapi.com/v1/current.json?key=8630b45fe2054c5c81130955210501&q=' + latlon;
            request({ url, json: true }, (error, { body }) => {
                if (body.current) {
                    weather = body.current.condition;
                    return res.send({
                        location,
                        weather
                    });
                }
                else {
                    res.send("no place with that name")
                }

            })
        })
    }

})

// 404 page
app.get('*', (req, res) => {
    res.render('404')
})

app.listen(3000, () => {
    console.log("Server is up on port 3000");

})