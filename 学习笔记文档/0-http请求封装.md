#### http请求封装

不封装的写法

```javascript
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
```

封装：

- 构造函数能实例化app对象
- app.on()可以添加路由
- app.run()让服务器运行起来

代码如下

```javascript
const http = require("http");
const path = require("path");
const fs = require("fs");
class ClApp{
  constructor(){
    this.server = http.createServer();
    this.reqEvent = {};
    this.staticPath = "./static/";   // 静态文件的地址在创建实例的时候可以修改
    this.server.on("request", (req, res)=>{
      const pathObj = path.parse(req.url);
      console.log(pathObj, "pathObj");
      // in操作符用于判断对象中是否含有某个属性
      if(pathObj.dir in this.reqEvent){
        req.pathObj = pathObj;   // 将解析出来的地址对象，存入请求req对象，在请求可以做判断使用
        this.reqEvent[pathObj.dir](req, res);   // 调用reqEvent中pathObj.dir路由地址对应的函数
      }else if(pathObj.dir === "/static"){
        // 设置静态文件资源请求头getContentType
        res.setHeader("Content-type", this.getContentType(pathObj.ext));
        const rs = fs.createReadStream(staticPath + pathObj.base); // 创建静态资源文件读取流使用管道符放入请求结果res中
        rs.pipe(res);
      }else {
        res.setHeader("Content-type", "text/html;charset=utf-8");
        res.end("<h1>页面找不到404</h1>")
      }
    })
  }

  on(url, fn){
    this.reqEvent[url] = fn; // 实例化时监听的页面路由和传入的回调函数存入请求事件对象中，在构造函数中监听request请求时调用
  }

  run(port, callback){
    this.server.listen(port, callback); // 监听端口
  }
	
  // 静态资源文件请求头封装
  getContentType(extName){
    switch(extName){
      case ".jpg":
        return "image/jpeg";
      case ".html":
          return "text/html;charset=utf-8";
      case ".json":
          return "text/json;charset=utf-8";
      case ".gif":
          return "image/gif";
      case ".css":
          return "text/css";
      default: break;
    }
  }
}

module.exports = ClApp;
```

