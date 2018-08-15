const { log } = console;

// obj to json
const obj = {
  name: 'Steve'
};

const stringObj = JSON.stringify(obj);
log(typeof stringObj);
log(stringObj);

const personString = `{
  "name": "Toney",
  "age": 25
}`;

// json to obj
const person = JSON.parse(personString);
log(typeof person);
log(person);
