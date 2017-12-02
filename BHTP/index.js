const express = require('express');
const path = require('path');
const rootPath = require('app-root-dir').get();
const es6Renderer = require('express-es6-template-engine');
const app = express();

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

app.listen(8080, function() {
  console.log('the application is running on localhost:8080');
});
