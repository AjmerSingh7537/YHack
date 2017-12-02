const googleTrends = require('google-trends-api');
const _ = require('lodash');

var getAverage = (keyword, startTime, endTime, callback) => {
  googleTrends.interestOverTime({
    keyword: keyword,
    startTime: new Date(startTime),
    endTime: new Date(endTime)
  })
  .then(function(results){
    let data = JSON.parse(results);
    let values = [];
    let obj = data.default.timelineData;

    for (var index in obj) {
      if (obj.hasOwnProperty(index)) {
        values.push(obj[index].value[0]);
      }
    }
    let average = {
      avg: _.ceil(_.mean(values)),
      vals: values
    };
    callback(undefined, average);
  })
  .catch(function(err){
    console.error('Oh no there was an error', err);
  });
}

module.exports = {
  getAverage
};
