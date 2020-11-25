const fs = require("fs");

// 创建写入流
const ws = fs.createWriteStream("streamFile.jpg", {flags: "w", encoding: "utf-8"});

// ws.write("hello1", ()=>{
//     console.log("第一次写入");
// })
// ws.write("hello2", ()=>{
//     console.log("第2次写入");
// })
// ws.write("hello3", ()=>{
//     console.log("第3次写入");
// })
// ws.write("hello4", ()=>{
//     console.log("第4次写入");
// })
// ws.write("hello5", ()=>{
//     console.log("第5次写入");
// })

// ws.on("data", ()=>{
//     console.log("文件写入！");
// })

// ws.close()

// 创建读取流
const rs = fs.createReadStream("timg.jpg");
rs.on("data", (chunk) => {
    console.log("单批数据流读取！");
    console.log(chunk);
    // ws.write(chunk, ()=>{
    //     console.log("写入");
    // });
})

rs.on("close", () => {
    rs.close();
    ws.end()
})

rs.pipe(ws);   // 管道pipe，将读取流rs插入到写入流ws中，可以实现ws.write， ws.open等等相同的效果

// promise需要实现的功能
const p1 = new Promise(fn);
p1.then((res)=>{
    document.body.style.background = "green";
    console.log("成功", res);
})

p1.catch((err)=>{
    document.body.style.background = "pink";
    console.log("失败", err);
})