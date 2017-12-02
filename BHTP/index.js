const express = require('express');
const path = require('path');
const rootPath = require('app-root-dir').get();
const es6Renderer = require('express-es6-template-engine');
const app = express();
const trends = require('./backend/backend.js');

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: false,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', es6Renderer);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'html');

app.get('/', function(req, res) {
 res.render('home');
});

app.get('/getResults', function(req, res) {
  //let data = req.body;
  trends.getAverage('machine learning', 'November 1, 2017', 'December 1, 2017', (err, res) => {
    console.log('from index: ' + res);
  });
  res.render('home');
});

app.listen(8080, function() {
  console.log('the application is running');
});
