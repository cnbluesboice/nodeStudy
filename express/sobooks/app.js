const express = require("express");
const app = express();

const mysql = require("./clSqlQuery");


app.get("/", async (req, res) => {
  res.render("index.ejs", { title: "陈玲", content: "<h1>写代码</h1>" })
  // const sqlStr = `select id,catagory,bookname,author,publictime from book`;
  // const resData = await mysql(sqlStr);
  // res.json(Array.from(resData));
  // Array.from 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
  // res.json(resData);
})
// /:catagoryid
app.get("/bookcatagory", async (req, res) => {
  // const sqlStr = `select id,catagory,bookname,author,publictime from book where catagory = ' 小说文学'`;
  // const resData = await mysql(sqlStr);
  // res.json(Array.from(resData));
  // 条件输出
  // const options = {
  //   "username": "chenling",
  //   "gender": "女",
  // }
  // res.render("condition.ejs", options)

  // 循环输出
  const arr = ["1111", "2222", "3333", "4444", "5555"];
  const options = { arr }
  res.render("list.ejs", options);
})

app.get("/book/:bookid", (req, res) => {

})


module.exports = app;