const express = require("express");
const app = express();
const path = require("path");
const url = require("url");

const mysql = require("./clSqlQuery");

// 设置引擎
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

// 解析post 提交的数据
app.use(express.urlencoded({extended: true}));

// 设置静态文件目录，如果是静态文件，则直接返回静态内容
app.use(express.static(path.join(__dirname, "public")));

// 添加中间件，一般用于处理请求和响应
app.use(function(req, res, next){
  // 在得到响应后，可以执行此方法
  res.countNum = (a, b)=>{
    return a + b;
  }
  console.log("这里定义中间件函数，访问任何页面，此函数都会被调用");
  next();  // 这里必须调用next函数，否则请求走到这里就会终止，不会往下走
})


app.get("/", async (req, res) => {
  // res.render("index.ejs", { title: "陈玲", content: "<h1>写代码</h1>" })
  // const sqlStr = `select id,catagory,bookname,author,publictime from book`;
  // const resData = await mysql(sqlStr);
  // res.json(Array.from(resData));
  // Array.from 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
  // res.json(resData);
  res.render("form.ejs")
})
// /:catagoryid
app.get("/bookcatagory", async (req, res) => {
  const sqlStr = `select id,catagory,bookname,author,publictime from book where catagory = ' 小说文学'`;
  const resData = await mysql(sqlStr);
  const options = {
    bookcatagory: Array.from(resData)
  }
  // res.json(Array.from(resData));
  // 条件输出
  // const options = {
  //   "username": "chenling",
  //   "gender": "女",
  // }
  // res.render("condition.ejs", options)

  // 循环输出
  // const arr = ["1111", "2222", "3333", "4444", "5555"];
  // const options = { arr }
  // res.render("list.ejs", options);

 
})
app.get("/search", (req, res) => {
  // console.log(req.url, "req.url");
  // console.log(path.parse(req.url), "path");
  // console.log(url.parse(req.url).query, "url");
  // const paramsList = url.parse(req.url).query.split("&");
  // const paramsObj = {};
  // paramsList.forEach((paramsItem, index)=>{
  //   const temp = paramsItem.split("=");
  //   paramsObj[temp[0]] = temp[1];
  // })
  // console.log(paramsObj, "paramsObj");
  // express在req上自带提取参数属性
  console.log(req.query);
  res.render("form.ejs")
});


app.post("/search1", (req, res) => {
  // express在req上自带提取参数属性
  console.log(req.body);
  res.send("post提交数据")
});

app.get("/book/:bookid", (req, res) => {

})


module.exports = app;