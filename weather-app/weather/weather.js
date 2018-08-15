const { log } = console;
const request = require('request');

const getWeather = (API_KEY, latitude, longitude, callback) => {
  request({
    url:`https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forcast.io service');
    }else if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }else {
      callback('weather is unavaliable');
    }
  });
}

module.exports.getWeather = getWeather;
