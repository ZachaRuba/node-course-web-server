"use strict";

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append file...')
    }
  });

  next();
});

app.use((req, res, next) => {
    res.render('maintinance.hbs');
    next();
});

//To use middleware, we use the app.use function.
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('year', ()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase()
});

app.get('/', (req, res) =>{
  res.send('<h1>hello world</h1>');
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    //year: new Date().getFullYear(), <-- Don't need this due to helper
    header: 'About Page'
  });
});

app.get('/home', (req, res)=>{
  res.render('home.hbs', {
    welcomeMsg: "Welcome to my page!  \n Have a good time!",
    header: 'Home Page'
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'You shouldn\'t be here'
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
