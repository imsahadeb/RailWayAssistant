// const responseData = require('./constraints/responses');
// let m=responseData.InvalidPNR;
// var rn = require('random-number');
// var options = {
//   min:  0,
//   max:m.length-1
// , integer: true
// }
// x=rn(options) 
// console.log(x)

// console.log(m[x])

str = ' saha deb ba';

str = str.trim();
x= str.replace(/ /g,'%20');
console.log(x);