const googleTrends = require('google-trends-api');


var getDataTrend = (keyword, startTime, callback) => {
      keyword.map((value, key) => {


      //new Date(Date.now() + -30*24*3600*1000).toDateString()

      let size = keyword.length - 1;

      googleTrends.interestOverTime({
        keyword: JSON.stringify(value),
        startTime: new Date((Date.now() + -(startTime*7)*24*3600*1000)),
        endTime: new Date((Date.now()).toDateString())
      })
      .then(function(results){
        let data = JSON.parse(results);
        let values = [];
        let obj = data.default.timelineData;

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          values.push(obj[i].value[0]);
        }
      }

      if(values.length-1===size)
        callback(undefined, values);
    })
    .catch(function(err){
      console.error('Oh no there was an error', err);
    });
  })
}


module.exports = {
  getDataTrend
};
