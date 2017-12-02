var request = require('request');

var getNumberOfPosts = (keywords, startTime, endTime, callback) => {
  request("https://api.talkwalker.com/api/v1/search/histogram/published?access_token=demo&q="+keywords+"&interval=1w&min=1512121055&max=1512221055&pretty=true",
    function(err, res, body) {
      let resultData = JSON.parse(body).result_histogram.data;
      let totalFrequency = 0;
      console.log(resultData);
      if(resultData) {
        resultData.map(freqInterval => {
          totalFrequency += Number(freqInterval.v);
        })
      }
      callback(undefined, totalFrequency);
    });
}

module.exports = {
  getNumberOfPosts
};
