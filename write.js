// 写入文件
const fs = require("fs");

fs.writeFile("data/testWrite.txt", "今晚吃啥！", {flag: "w", encoding: "utf-8"}, (err)=>{
    if(err){
        console.log("写入失败！");
    }else {
        console.log("写入成功！")
    }
});

