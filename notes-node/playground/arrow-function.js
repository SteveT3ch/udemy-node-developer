const { log } = console;

// basic arrow function
const square = x => x * x;
log(square(4));

// method with arrow function
const user = {
  name: 'ironman',
  realName: 'Tony Stark',
  logName(){
    log(`${this.name} real name is ${this.realName}`);
  }
};

user.logName();
