# WeatherLCD-RPi
Raspberry Pi LCD Weather Display built with [Node.js](https://nodejs.org/en/).

## Getting Started

1. Install Node.js on your Raspberry Pi - [Instructions](https://github.com/nprail/WeatherLCD-RPi/wiki/Install-Node.js)
2. Clone the repository.
3. Go to http://www.latlong.net/ and search your location. Put the results in the `local` variable. (`index.js`)
4. Get yourself a Darksky API key ([here](https://darksky.net/dev/)) and put it into the `forecast` variable. (`index.js`)
5. Set the GPIO pin numbers and the LCD size in the `lcd` variable. 
6. Run `npm install`
7. Run `npm start`

That's all! The weather data should apear on your LCD! 

## Built with...
* [fivdi/lcd](https://github.com/fivdi/lcd)
* [forecast](https://www.npmjs.com/package/forecast)
