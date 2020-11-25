const url = require("url");
console.log(url);
const str = "http://www.baidu.com/index.html?id=12";
console.log(url.parse(str));
// url.parse(str)帮助我们解析url地址 

// url.resolve()帮助我们合成url地址
const urlStr1 = "http://www.taobao.com/";
const urlStr2 = "./xinwen/chenling.html";
console.log(url.resolve(urlStr1, urlStr2));