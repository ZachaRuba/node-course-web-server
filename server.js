"use strict";

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
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

//To use middleware, we use the app.use function.
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('year', ()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase()
});

app.get('/', (req, res) =>{
  res.render('home.hbs', {
    welcomeMsg: "Welcome to my page!  \n Have a good time!",
    header: 'Home Page'
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    //year: new Date().getFullYear(), <-- Don't need this due to helper
    header: 'About Page'
  });
});

app.get('/projects', (req, res)=>{
  res.render('projects.hbs', {
    welcomeMsg: "This is my Projects page! You can find all the things I create here.",
    header: 'Projects'
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'You shouldn\'t be here'
  });
});

app.listen(port, () => console.log(`server is up on port ${port}`));
