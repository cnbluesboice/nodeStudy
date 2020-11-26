const http = require("http");
const path = require("path");
const fs = require("fs");
class ClApp {
  constructor() {
    this.server = http.createServer();
    this.reqEvent = {};
    this.staticPath = "./static/";   // 静态文件的地址在创建实例的时候可以修改
    this.server.on("request", (req, res) => {
      const pathObj = path.parse(req.url);
      console.log(pathObj, "pathObj");
      // in操作符用于判断对象中是否含有某个属性
      if (pathObj.dir in this.reqEvent) {
        res.setHeader("Content-type", "text/html;charset=utf-8");
        req.pathObj = pathObj;   // 将解析出来的地址对象，存入请求req对象，在请求可以做判断使用
        res.render = render;     // 根据数据渲染页面的render函数
        this.reqEvent[pathObj.dir](req, res);   // 调用reqEvent中pathObj.dir路由地址对应的函数
      } else if (pathObj.dir === "/static") {
        // 设置静态文件资源请求头getContentType
        res.setHeader("Content-type", this.getContentType(pathObj.ext));
        const rs = fs.createReadStream(this.staticPath + pathObj.base);  // 创建静态资源文件读取流，使用管道符放入请求结果res中
        rs.pipe(res);
      } else {
        res.setHeader("Content-type", "text/html;charset=utf-8");
        res.end("<h1>页面找不到404</h1>")
      }
    })
  }

  on(url, fn) {
    this.reqEvent[url] = fn;
  }

  run(port, callback) {
    this.server.listen(port, callback);
  }

  getContentType(extName) {
    switch (extName) {
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

function render(options, path) {
  fs.readFile(path, { encoding: "utf-8" }, async (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // 匹配明星列表
      const starReg = /\{%for \{\{(.*?)\}\} %\}(.*?)\{%endfor%\}/igs;
      let starResult;
      while (starResult = starReg.exec(data)) {
        const starKey = starResult[1].trim();
        const starArr = options[starKey];
        let starStr = "";
        starArr.forEach((star, index) => {
          starStr += replaceVar(starResult[2], { item: star });
        })
        data = data.replace(starResult[0], starStr);
        data = replaceVar(data, options);
      }
      // 匹配循环的变量并替换循环的内容
      const listReg = /\{%for \{(.*?)\} %\}(.*?)\{%endfor%\}/igs;
      let listResult;
      while (listResult = listReg.exec(data)) {
        // console.log(listResult, 'listResult');
        const key = listResult[1].trim();
        // 通过key值获取数组内容
        const valueArr = options[key];
        let listStr = "";
        valueArr.forEach((value, index) => {
          // 替换每一项内容里面的变量
          listStr += replaceVar(listResult[2], { item: value });
        });
        data = await data.replace(listResult[0], listStr);  // 这里先渲染列表，后渲染前面的数据，不然列表会呗数据覆盖，显示undefined
        data = await replaceVar(data, options);
      }
      this.end(data);
    }
  })
}

// 替换变量函数封装
function replaceVar(data, options) {
  const reg = /\{\{(.*?)\}\}/igs;
  let result;
  while (result = reg.exec(data)) { // 正则需要循环匹配
    let strKey = result[1].trim();
    // console.log(strKey, 'strKey');
    // console.log(options, 'options');
    const keyValue = eval("options."+strKey);
    data = data.replace(result[0], keyValue);
  }
  return data;
}

module.exports = ClApp;