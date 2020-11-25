const fs = require("fs");


fs.readdir("./data",{encoding: "utf-8", withFileTypes: false}, (err, files)=>{  // withFileTypes 为true时可以获取到文件的类型，返回对象， 默认为false， 只返回文件名称数组
    if(err){
        console.log(err);
    }else {
        console.log(files);
    }
});

// 文件读取， 文件写入，文件删除， 读取目录，将某个目录下的文件读取之后，全部写入到某个文件中


// 删除文件夹
fs.rmdir("./testDeleteDir", (err)=>{
    console.log("删除成功");
})