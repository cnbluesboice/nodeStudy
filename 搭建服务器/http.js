const http = require("http");  // 为内置模块，不需要安装
// 创建server服务器对象
const server = http.createServer();
// 监听当前服务器对象的请求
server.on("request", (req, res)=>{
    console.log(req.url);
    console.log(req.headers);
    res.setHeader("Content-type", "text/html;charset=UTF-8")
    if(req.url === "/"){
        // 当服务器被请求时，会触发请求事件，并传入请求对象和响应对象
        res.end("首页");
    }else if(req.url === "/music") {
        res.end("音乐");
    }else if(req.url === "/movie"){
        res.end("电影");
    }else {
        res.end("404");
    }
   
});

// 服务器监听的端口号, 可以访问    http://192.168.50.17:3000/    网址
server.listen(3000, function(){
    console.log("监听端口号, 服务器启动成功！");
})