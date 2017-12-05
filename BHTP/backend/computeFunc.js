const patentTrends = require('./googlePatentTrends.js');
const googleTrends = require('./googleTrends.js');
const socialTrends = require('./socialNetworkTrends.js');
const _ = require('lodash');

var returnWithCalc = (trendObjects,socialObjects,patentObjects, callback) =>
{
  let calculationsObject = [];

  trendObjects.map((valueTrend, key) => {
    let currentWord = valueTrend.word;
    socialObjects.map((valueSocial, key) => {
        if(valueSocial.word === currentWord) {
          patentObjects.map((valuePatent, key) => {
            if(valuePatent.word === currentWord) {
              var trendCalculation = calculateTrend(valueTrend.avg, valueSocial.total, valuePatent.patents);
              var trendDegree = theDegree(trendCalculation);
              calculationsObject.push({
                word: currentWord,
                trend: valueTrend.avg,
                social: valueSocial.total,
                patent: valuePatent.patents,
                trendCalculation: trendCalculation,
                trendDegree: trendDegree
              });
            }
          })
        }
    })
  });
  console.log(calculationsObject);
  callback(undefined, calculationsObject);
}



var calculateTrend = (trendAverage, socialNum, patentNum) => {
  let total = 0;


  if(trendAverage>75)
  {
    total+=_.ceil((trendAverage*.55));
    total+=socialPart(socialNum);
  }
  else
  {
    total+=_.ceil((trendAverage*.30));
    total+=socialPart(socialNum);
    total+=patentPart(patentNum);
  }
  return total;
}

var theDegree = (funcTotal) => {
  let total= funcTotal

  if(total>=85)
    return 4;
  else if(total>=75)
    return 3;
  else if(total>=65)
    return 2;
  else if(total>=45)
    return 1;
  else
    return 0;
}

var patentPart = (patentNum) => {
  if(patentNum>= 5000)
    return 25;
  else if (patentNum>= 1000)
    return 20;
  else if(patentNum>= 500)
    return 15;
  else if(patentNum>= 100)
    return 10;
  else if(patentNum>= 50)
    return 5;
  else
    return 0;
}


var socialPart = (socialNum) => {
  if(socialNum>= 300000)
    return 45;
  else if (socialNum>= 100000)
    return 40;
  else if(socialNum>= 50000)
    return 35;
  else if(socialNum>= 10000)
    return 30;
  else if(socialNum>= 1000)
    return 25;
  else
    return 0;
}

module.exports = {
  returnWithCalc,
  theDegree
};
