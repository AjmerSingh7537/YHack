const googleTrends = require('google-trends-api');
const _ = require('lodash');

var getAverage = (keyword, startTime, endTime, callback) => {
  let average = [];
  keyword.map((value, key) => {

      let size = keyword.length - 1;

      googleTrends.interestOverTime({
        keyword: JSON.stringify(value),
        startTime: new Date(startTime),
        endTime: new Date(endTime)
      })
      .then(function(results){
        let data = JSON.parse(results);
        let values = [];
        let obj = data.default.timelineData;
        console.log(data);

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          values.push(obj[i].value[0]);
        }
      }

      average.push({
        word: value,
        avg: _.ceil(_.mean(values)),
        vals: values
      });

      if(average.length-1===size)
        callback(undefined, average);
    })
    .catch(function(err){
      console.error('Oh no there was an error', err);
    });
  })
}

module.exports = {
  getAverage
};
