const { log } = console;
const faker = require('faker');

const getUser = (id, callback) => {
  let user = {
    id: id,
    user: 'mike'
  }
  setTimeout(() => {
    callback(user);
  }, 3000);
};

// call function
getUser(31, (userObj) => {
  log(userObj);
});
