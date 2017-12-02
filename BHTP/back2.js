//const express = require('express');
//const path = require('path');
//const rootPath = require('app-root-dir').get();
//const es6Renderer = require('express-es6-template-engine');
//const app = express();
const _ = require('lodash');
const patenter = "https://patents.google.com/?q=";
var request=(keyword,startTime,endTime)=>{
{
keyword: change(keyword);
starTime: new Date(startTime);
endTime: new Date(endTime,"yyyymmdd");
let b="";
return b+keyword+changeB4(startTime)+changeAf(endTime);
}};


//let realUrl = patenter+request(k,s,d);
//let b= "January 5, 2017";
let c = new Date(b);


var changeB4= (a)=>{
  let s= "+&before=priority:"+(a.getYear()+2000-100);
  if(a.getMonth()<9)
    s+="0"+(a.getMonth()+1);
  else
    s+=(a.getMonth()+1);

  if(a.getDate()<9)
    s+="0"+(a.getDate());
  else
    s+=(a.getDate());

return s;
}

var changeAf= (a)=>{
  let s= "&after=priority:"+(a.getYear()+2000-100);
  if(a.getMonth()<9)
    s+="0"+(a.getMonth()+1);
  else
    s+=(a.getMonth()+1);

  if(a.getDate()<9)
    s+="0"+(a.getDate());
  else
    s+=(a.getDate());

return s;
}


//let p ="This is a poop";
var change=(a)=>{
  return a.replace(/\s/g,"+");
}

//console.log(change(p));
console.log(changeB4(c));
