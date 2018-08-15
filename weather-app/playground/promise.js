
const { log } = console;

// const somePromise = new Promise( (resolve, reject) => {
//   setTimeout(() => {
//     // you can only do one reject or resolve not both
//     //resolve('It worked');
//     reject('unable to fullfill promise');
//   }, 3000);
// });
//
// somePromise.then((message) => {
//   log('Success:', message);
// }, (errorMessage) => {
//   log('Error:', errorMessage);
// });

const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      }else {
        reject('Must be numbers');
      }
    }, 1500);
  });
}

asyncAdd(4,4)
  .then((res) => {
    log('Success:', res);
  }, (err) => {
    log('Error:', err);
  });
