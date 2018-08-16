const { log } = console;
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  let now = new Date().toString();
  let serverLog = `${now}: ${req.method} ${req.url}`;
  log(serverLog);
/*  fs.appendFile('server.log', serverLog + '\n', (err)=> {
    if (err) {
      log('Unable to log to server');
    };
  }); */
  next();
})

// app.use((req, res, next) =>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to the Home Page'

    })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
      status: 'Fail',
      statusCode: 404
  });
});

app.listen(port, () => {
  log(`Listening on port ${port}`);
});
