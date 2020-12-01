## node连接MySQL

#### 1：npm安装mysql

```
npm i mysql -S
```

#### 2：创建JS文件，引入MySql

```
const mysql = require("mysql");
```

#### 3：创建MySql连接参数

```
const options = {
    host: "localhost",  // 连接地址，localhost表示本机
     port: "3306",		// 端口号可选，默认是3306
    user: "root",		// 数据库用户名
    password: "123456",	// 数据库密码
    database: "testmysql", // 数据库名称
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
```

#### 4：数据库查询

```
 // 执行查询语句
const selectSql = "select * from student";
connect.query(selectSql, (err, result, fileds)=>{
    if(err){
        console.log(err, "查询错误");
    }else{
        console.log(result, "result");
        console.log(fileds, "fileds");
    }
});

```

#### 5：删除表

```
// 删除表
const deleteSql = "drop table user";
connect.query(deleteSql, (err, result)=>{
    if(err){
        console.log(err);
    }else {
        console.log(result);
    }
})
```

#### 6：删除库

```
// 删除数据库
const deleteBaseSql = "drop database userBase";
connect.query(deleteBaseSql, (err, result)=>{
    if(err){
        console.log(err);
    }else {
        console.log(result);
    }
})
```

#### 7：创建库

```
// 创建数据库
const createDataBase = "create database userBase";
connect.query(createDataBase, (err, result)=>{
    if(err){
        console.log(err);
    }else {
        console.log(result);
    }
})
```

#### 8：插入数据

```
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
```

