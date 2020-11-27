const path = require("path");
const url = require("url");
const pathStr = path.parse("http://192.168.50.17:3000/movie/0");
const urlStr = url.parse("http://192.168.50.17:3000/movie/index.html");
// console.log(pathStr);
// console.log(path.parse(urlStr.pathname));
console.log(url);