const clApp = require("./封装http请求");
const app = new clApp();

app.on("/", (req, res) => {
  res.end("<h1>首页</h1><img src='./static/timg.jpg'>");
})

app.on("/music", (req, res) => {
  if (req.pathObj.name == "index") {
    res.end("音乐页面");
  } else {
    res.end("其他音乐页面");
  }
})

app.on("/movie", (req, res) => {
  const movies = [
    {
      name: "1111陈玲",
      value: "1111111111111111111111111111111",
      list: ["aaa", "bbb", "ccc"],
      stars: [
        { name: "陈奕迅", gender: "男" },
        { name: "毛不易", gender: "男" }
      ],
    },
    {
      name: "2222",
      value: "2222222222222222222222222222222",
      list: ["AAA", "BBB", "CCC"],
      stars: [
        { name: "赵丽颖", gender: "女" },
        { name: "孙俪", gender: "女" }
      ],
    }
  ];
  // res.end(movies[req.pathObj.base].name)
  res.render(movies[req.pathObj.base], "./template/test.html");
})

app.run(3000, () => {
  console.log("监听成功");
})