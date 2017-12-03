const googleTrends = require('google-trends-api');


var getDataTrend = (keyword, startTime, callback) => {

        let int =0;
        switch (startTime) {
          case 'One Week':
                  int =7;
            break;
            case 'One Month':
                  int =30;
              break;
              case 'Six Months':
                    int =182;
                break;
                case 'One Year':
                    int =365;
                  break;
          default: int =30; break;
        }
      let size = keyword.length - 1;

      googleTrends.interestOverTime({
        keyword: JSON.stringify(keyword),
        startTime: new Date((Date.now() + -(int)*24*3600*1000)),
        endTime: new Date(Date.now())
      })
      .then(function(results){
        let data = JSON.parse(results);
        let values = [];
        let obj = data.default.timelineData;

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          values.push(obj[i]);
        }
      }
        console.log(values);
        callback(undefined, values);
    })
    .catch(function(err){
      console.error('Oh no there was an error', err);

  })
}


module.exports = {
  getDataTrend
};
