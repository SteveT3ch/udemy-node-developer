const { log } = console;
const yargs = require('yargs');
const dotenv = require('dotenv');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const request = require('request');

dotenv.config();

const API_KEY = process.env.API_KEY;

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

if (argv.address === ''){
  log('Need to enter an address');
}else(
  geocode.geocodeAddress(argv.address, (errorMsg, results) => {
    if (errorMsg) {
      log(errorMsg);
    }else {
      log(JSON.stringify(results, undefined, 2));
      weather.getWeather(API_KEY, results.latitude, results.longitude, (errorMsg, weatherResults) => {
        if (errorMsg) {
          log(errorMsg);
        }else {
          log(JSON.stringify(weatherResults, undefined, 2));
        }
      });
    }
  })
);



/*
url:`https://api.darksky.net/forecast/f5832191868f5ae6ab59883bdfee3bba/37.8267,-122.4233`
"latitude": 40.7602619,
  "longitude": -73.9932872
*/
