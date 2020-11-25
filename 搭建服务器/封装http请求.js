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
        const rs = fs.createReadStream(staticPath + pathObj.base);  // 创建静态资源文件读取流，使用管道符放入请求结果res中
        rs.pipe(res);
      }else {
        res.setHeader("Content-type", "text/html;charset=utf-8");
        res.end("<h1>页面找不到404</h1>")
      }
    })
  }

  on(url, fn){
    this.reqEvent[url] = fn;
  }

  run(port, callback){
    this.server.listen(port, callback);
  }

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