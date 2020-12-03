const express = require("express");
// 实例化express
const app = express();

// 1：字符串路由模式
app.get("/", (req, res) => {
    res.send("<h1>Hello World! <br/> 我是首页</h1>")
})

// 2：类字符串的正则模式
app.get("/ab?cd", (req, res) => {
    res.send("这是abcd或者acd")
})

// 3：正则表达式路径，匹配/a123456,  a后面10个数字以上
app.get(/\/a\d{10,}/, (req, res) => {
    res.send("正则路径")
})

// 动态路由
app.get("/news/:catagory/:newsid", (req, res, next) => {
    req.sethost = "127.0.0.1"
    // res.send("新闻ID页面:\n" + JSON.stringify(req.params));
    next();
}, (req, res) => {
    res.send("第二次发送数据" + req.sethost);
})
app.listen(8080, () => {
    console.log("服务器启动完成：", "http://127.0.0.1:8080")
})