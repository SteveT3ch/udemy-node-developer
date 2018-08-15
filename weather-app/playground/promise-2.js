const { log } = console;
const request = require('request');

const geocodeAddress = (address) => {
  return new Promise((resolve, reject) =>{

    const encodedAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      //log(JSON.stringify(body, undefined, 2));
      if (error) {
        reject('Unable to connect to google service');
      }else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find address');
      } else if (!error && body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('19146')
  .then((location) => {
      log(location);
  }, (err) => {
    log(err);
  });
