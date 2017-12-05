var request = require('request');
var moment = require('moment');

var getNumberOfPosts = (keyword, startTime, endTime, callback) => {
  let size = keyword.length-1;
  let total = [];
  keyword.map((value,key)=> {
    var dateNow = moment();
    var dateOneMonthAgo = moment().subtract(1, 'm');

    console.log(dateNow);
    console.log(dateOneMonthAgo);

    request("https://api.talkwalker.com/api/v1/search/histogram/published?access_token=demo&q="+value+"&interval=1d&pretty=true&min="+dateOneMonthAgo+"&max="+dateNow,
      function(err, res, body) {

        let resultData = JSON.parse(body).result_histogram;
        let totalFrequency = 0;
        let allFrequencies = [];

        if(resultData) {
          resultData.data.map(freqInterval => {
            totalFrequency += Number(freqInterval.v);
            allFrequencies.push(freqInterval.v);
          })
        }
         total.push({
          word: value,
          total: totalFrequency,
          all: allFrequencies
        });
        if(total.length-1===size)
          (callback(undefined, total));
    })
  })
}


module.exports = {
  getNumberOfPosts
};
