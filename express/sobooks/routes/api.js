// 定义前端ajax请求接口
const express = require("express");
const api = express.Router();
const mysql = require("../clSqlQuery");

api.get("/book/:catagoryid", (req, res)=>{
  const sqlStr = `select id,catagory,bookname,author,publictime from book where catagory = ' 小说文学'`;
  const resData = await mysql(sqlStr);
  const options = {
    bookcatagory: Array.from(resData)
  }
  res.append("Access-Control-Allow-Origin", "*")
  res.append("Access-Control-Allow-Content-Type", "*")
  res.json(Array.from(options));
})

module.exports = api;