var request = require('request');
const _ = require('lodash');

var getNumberOfPatents=(keywords,startTime,endTime, callback) => {

  let patents = [];
  let size = keywords.length - 1;

  keywords.map((value, key) => {

	let url = "https://patents.google.com/xhr/query?url=q="+JSON.stringify(value)+"+&before=priority:20171102"+"&after=priority:20171202";
	request(url, function(err,res,body) {

      let resultData = JSON.parse(body).results.total_num_results;
      patents.push(resultData);

      if(key===size) {
      	console.log(patents);
      	callback(undefined,resultData);
      }
  	})
  })
}

module.exports = {
  getNumberOfPatents
}
