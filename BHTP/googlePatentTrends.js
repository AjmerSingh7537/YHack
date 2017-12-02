
const _ = require('lodash');
const patenter = "https://patents.google.com/xhr/query?url=q=";
var getNumberOfPatents=(keyword,startTime,endTime)=>
{
  let url = patenter+keyword+"+&before=priority:20171102"+"&after=priority:20171202"
  request(url, function(err,res,body)
  {
        let resultData= JSON.parse(body).total_num_results;

        console.log(resultData);
        callback(undefined,resultData);

  })
}

  module.exports =
{
  getNumberOfPatents
}
