#!/usr/bin/env node

var Lcd = require('lcd'),
    lcd = new Lcd({ rs: 24, e: 25, data: [23, 17, 21, 22], cols: 20, rows: 4 }),
    Forecast = require('forecast'),
    https = require('https'),
    weatherdata,
    forecastTime,
    d = new Date();

// Setup location
var local = [38.907192, -77.036871]; //Put your lat & long in here. http://www.latlong.net/

// Setup the Darksky API
var forecast = new Forecast({
    service: 'darksky',
    key: '', // Get an API key at https://darksky.net/dev/
    units: 'fahrenheit',
    cache: true,
    ttl: {
        minutes: 27,
        seconds: 45
    }
});

// Get the Forecast
var getForecast = function () {
    timeNow = d.getHours();
    if (timeNow >= forecastTime) {
        console.log("Updating forecast...")
        forecast.get(local, function (err, weather) {
            if (err) return console.dir(err);
            weatherdata = weather;
            forecastTime = d.getHours();
        });
    }
    else {
        console.log("No need to update forecast...")
    }
}

// Update the LCD
lcd.on('ready', function () {
    console.log("Updating the LCD...");
    setInterval(function () {
        getForecast();
        
        // Update LCD...
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Temp " + weatherdata.currently.temperature + " F", function (err) {
            if (err) {
                throw err;
            }
            lcd.setCursor(0, 1);
            lcd.print("Weather: " + weatherdata.currently.summary, function (err) {
                if (err) {
                    throw err;
                }
                lcd.setCursor(0, 2);
                lcd.print(new Date().toISOString().substring(11, 19), function (err) {
                    if (err) {
                        throw err;
                    }
                });
            });
        });
    }, 1000);
});

// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', function () {
    lcd.close();
    process.exit();
});
