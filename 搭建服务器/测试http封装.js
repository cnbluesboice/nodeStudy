const clApp = require("./封装http请求");
const app = new clApp();

app.on("/", (req, res)=>{
  res.setHeader("Content-type", "text/html;charset=utf-8");
  res.end("<h1>首页</h1><img src='./static/timg.jpg'>");
})

app.on("/music", (req, res)=>{
  res.setHeader("Content-type", "text/html;charset=utf-8");
  if(req.pathObj.base == "index"){
    res.end("音乐页面");
  }else {
    res.end("其他音乐页面");
  }
})

app.run(3000, ()=>{
  console.log("监听成功");
})