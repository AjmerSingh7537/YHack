const request = require('request');

const _ = require('lodash');
const patenter = "https://patents.google.com/xhr/query?url=q=";
var getNumberOfPatents=(keyword,startTime,endTime, callback)=>
{
  let url = patenter+keyword+"+&before=priority:20171102"+"&after=priority:20171202"
  request(url, function(err,res,body)
  {
        let resultData= JSON.parse(body).results.total_num_results;

        console.log(JSON.parse(body).results.total_num_results);
        callback(undefined,resultData);

  })
}

  module.exports =
{
  getNumberOfPatents
}
