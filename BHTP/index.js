const express = require('express');
const path = require('path');
const rootPath = require('app-root-dir').get();
const es6Renderer = require('express-es6-template-engine');
const app = express();
const patentTrends = require('./backend/googlePatentTrends.js');
const googleTrends = require('./backend/googleTrends.js');
const socialTrends = require('./backend/socialNetworkTrends.js');
  const trendCalculator = require('./backend/computeFunc.js');


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

app.post('/getPatentsResults', function (req,response){
  let data=req.body;
  patentTrends.getNumberOfPatents(data.technologies,"November 2 2017","December 2 2017",(err,res)=>{
    response.send(JSON.stringify(res));
  });
});

app.post('/getResults', function(req, response) {
  let data = req.body;
  googleTrends.getAverage(data.technologies, 'November 1, 2017', 'December 1, 2017', (err, res) => 
  	response.send(JSON.stringify(res));
  });
});

app.post('/getSocialNetworkResults', function(req, response) {
	let data = req.body;
	socialTrends.getNumberOfPosts(data.technologies, 'November 1, 2017', 'December 1, 2017', (err, res) => {
  	response.send(JSON.stringify(res));
	});
});

app.post('/computeFunction', function(req, response) {
	let data = req.body;
	let total = trendCalculator.returnWithCalc(data.googleTrends, data.socialNetworks, data.googlePatents, (err, res) => {
    response.send(JSON.stringify(res));

});

app.listen(8080, function() {
  console.log('the application is running on localhost:8080');
});
