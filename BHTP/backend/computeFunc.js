const patentTrends = require('./googlePatentTrends.js');
const googleTrends = require('./googleTrends.js');
const socialTrends = require('./socialNetworkTrends.js');
const _ = require('lodash');

var theFunction = (trendAverage, socialNum, patentNum) => {
  total=0;

  if(trendAverage>75)
  {
    total+=_.ceil((trendAverage*.75));
    total+=socialPart(socialNum);
  }
  else
  {
    total+=_.ceil((trendAverage*.5));
    total+=socialPart(socialNum);
    total+=patentPart(patentNum);
  }
  return total;
}

var theDegree = (funcTotal) => {
  let total= funcTotal

  if(total>=90)
    return 4;
  else if(total>=80)
    return 3;
  else if(total>=70)
    return 2;
  else if(total>=50)
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
    return 25;
  else if (socialNum>= 100000)
    return 20;
  else if(socialNum>= 50000)
    return 15;
  else if(socialNum>= 10000)
    return 10;
  else if(socialNum>= 1000)
    return 5;
  else
    return 0;


}
