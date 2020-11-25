// 路径模块用来获取一些路径相关的信息
const path = require("path");
const fs = require("fs");

const html = "https://news.cctv.com/2020/11/17/ARTIoa7RsQxiGO4tZWe6CeaJ201117.shtml";
const route = "http://192.168.50.17:4000/groups";

// 1:extname获取路径后缀名
// 2:resolve拼接路径，会带上系统磁盘绝对路径
// 3:join获取当前执行目录的完整路径

// console.log(path);
console.log(path.extname(html));
// console.log(path.extname(route), 1111);

const pathArr = ["/src", "chenling", "resource"];
// "/src"  如果不加前面的“/”，拼接出来的路径是“C:\Users\87643\Desktop\nodejs学习\路径模块和系统模块\src\chenling\resource”， 如果加了“/”，路径结果为“C:\src\chenling\resource”
const resolvePath = path.resolve(...pathArr);
console.log(resolvePath);

const info = path.join(__dirname, "hello", "world", "hahahahah");
console.log(info);


const pathStr = "http://www.baidu.com/xinwen/index.html";

const pathStrArr = pathStr.split("/");
console.log(pathStrArr);

const filePath = path.join(__dirname, ...pathStrArr.slice(pathStrArr.length - 2, pathStrArr.length));
console.log(filePath);

fs.readFile(filePath, {encoding: "utf-8", flag: "r"}, (err, data)=>{
    if(err){
        console.log(err);
    }else {
        console.log(data);
    }
})

