let mysql = require("mysql");
let options = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "userBase",
}

// 创建与数据库的连接对象
const connect = mysql.createConnection(options);

// 真正建立连接
connect.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("连接成功");
    }
});

// 执行数据库语句
// 执行查询语句
// const selectSql = "select * from student";
// connect.query(selectSql, (err, result, fileds)=>{
//     if(err){
//         console.log(err, "查询错误");
//     }else{
//         console.log(result, "result");
//         console.log(fileds, "fileds");
//     }
// });

// 删除表
// const deleteSql = "drop table user";
// connect.query(deleteSql, (err, result)=>{
//     if(err){
//         console.log(err);
//     }else {
//         console.log(result);
//     }
// })

// 删除数据库
// const deleteBaseSql = "drop database userBase";
// connect.query(deleteBaseSql, (err, result)=>{
//     if(err){
//         console.log(err);
//     }else {
//         console.log(result);
//     }
// })

// 创建数据库
// const createDataBase = "create database userBase";
// connect.query(createDataBase, (err, result)=>{
//     if(err){
//         console.log(err);
//     }else {
//         console.log(result);
//     }
// })

// 往表里面插入数据
// const insertData = "insert into user (username,password) values ('chenhong','5555555')";
// connect.query(insertData, (err, result)=>{
//     if(err){
//         console.log(err);
//     }else {
//         console.log(result);
//     }
// })

// const insertData1 = "insert into user (username,password,mail) values ('eason','7777','876430653@qq.com')";
// connect.query(insertData1, (err, result)=>{
//     if(err){
//         console.log(err);
//     }else {
//         console.log(result);
//     }
// })

const insertData1 = "insert into user (username,password,mail) values (?,?,?)";
connect.query(insertData1, ["毛不易","9999","999@333.com"], (err, result)=>{
    if(err){
        console.log(err);
    }else {
        console.log(result);
    }
})