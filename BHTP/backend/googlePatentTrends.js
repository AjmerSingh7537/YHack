const request = require('request');
const moment = require("moment");

var getNumberOfPatents=(keywords,startTime,endTime, callback) => {

  let patents = [];
  let size = keywords.length-1;
  keywords.map((value, key) => {

  var now = moment(new Date());
  var nowFormatted = now.format("YYYYMMDD");
  var monthAgoFormatted = now.add(-1, 'M').format("YYYYMMDD");

	let url = "https://patents.google.com/xhr/query?url=q="+value+"+&before=priority:"+monthAgoFormatted+"&after=priority:"+nowFormatted;
	request(url, function(err,res,body) {
      let resultData = JSON.parse(body).results.total_num_results;
      patents.push({
        word: value,
        patents: resultData
      });

      if(patents.length-1===size) {
      	(callback(undefined,patents));
      }
  	})
  })
}

module.exports = {
  getNumberOfPatents
}
