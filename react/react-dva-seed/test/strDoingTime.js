/**
 * 比较字符串拼接耗时
 * 
 */

// 1、传统（效率最低：7.144ms）

// var str1 = "";

// console.time("timer");

// for(var i = 0; i < 100000; i++) {
//   str1 += "你好重庆！";
// }

// console.timeEnd("timer");

// 2、数组（6.324ms，添加元素：3.762ms，拼接元素：3.046ms）

// console.time("timer1");

// var str = new Array();

// for(var i = 0; i < 100000; i++) {
//   str.push("你好重庆！");
// }

// console.timeEnd("timer1");
// console.time("timer2");

// var str1 = str.join("");

// console.timeEnd("timer2");

// 3、基于原型链（timer: 9.038ms）

function stringBuffter() {
  this._string = new Array();
}

stringBuffter.prototype.append = function(str) {
  this._string.push(str);
}

stringBuffter.prototype.toString = function() {
  return this._string.join(" ");
}

var str = new stringBuffter();

console.time("timer")

for(var j=0; j<100000; j++) {
  str.append("你好重庆！");
}

var str1 = str.toString();

console.timeEnd("timer")




