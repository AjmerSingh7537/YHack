var request = require('request');


var getNumberOfPosts = (keyword, startTime, endTime, callback) => {
  let size = keyword.length-1;
  let total = [];
  keyword.map((value,key)=> {
    request("https://api.talkwalker.com/api/v1/search/histogram/published?access_token=demo&q="+value+"&interval=1d&min=1509690000&max=1512229311&pretty=true",
      function(err, res, body) {

        let resultData = JSON.parse(body).result_histogram.data;
        let totalFrequency = 0;
        let allFrequencies = [];

      //
        if(resultData) {
          resultData.map(freqInterval => {
            totalFrequency += Number(freqInterval.v);
            allFrequencies.push(freqInterval.v);
          })
        }
         total.push({
          word: value,
          total: totalFrequency,
          all: allFrequencies
        });
        if(key===size){
          console.log(total);
          callback(undefined, total);
        }

    });
  })
}

module.exports = {
  getNumberOfPosts
};
