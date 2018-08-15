const { log } = console;
const yargs = require('yargs');
const dotenv = require('dotenv');
const axios = require('axios');

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

  const encodedAddress = encodeURIComponent(argv.address);
  const geocodeUrl =
  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find address');
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`
    log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  })
  .then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    log(`it's ${temperature} but feel like ${apparentTemperature}`);
  })
  .catch((e) => {
    if (e.code === 'ENOTFOUND') {
      log('Connection error');
    }else {
      log(e.message);
    }
  })


/*
url:`https://api.darksky.net/forecast/f5832191868f5ae6ab59883bdfee3bba/37.8267,-122.4233`
"latitude": 40.7602619,
  "longitude": -73.9932872
*/
