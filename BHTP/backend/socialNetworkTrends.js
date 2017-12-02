var request = require('request');

var getNumberOfPosts = (keyword, startTime, endTime, callback) => {
  console.log(keyword);
  request("https://api.talkwalker.com/api/v1/search/histogram/published?access_token=demo&q="+keyword+"&interval=1d&min=1509690000&max=1512229311&pretty=true",
    function(err, res, body) {

      let resultData = JSON.parse(body).result_histogram.data;
      let totalFrequency = 0;
      let allFrequencies = [];

      console.log(resultData);
      if(resultData) {
        resultData.map(freqInterval => {
          totalFrequency += Number(freqInterval.v);
          allFrequencies.push(freqInterval.v);
        })
      }
      callback(undefined, {
        total: totalFrequency,
        all: allFrequencies
      });
    });
}

module.exports = {
  getNumberOfPosts
};
