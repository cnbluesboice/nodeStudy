## express路由

路由的模式种类

1：字符串路由模式

```
app.get("/", (req, res)=>{
    res.send("<h1>Hello World! <br/> 我是首页</h1>")
})
```

2：类正则的字符串模式

```
app.get("/ab?cd", (req, res)=>{
    res.send("这是abcd或者acd")
})
可/acd和/abcd访问
```

3：正则表达式模式

```
app.get(/\/a\d{10,}/, (req, res)=>{
    res.send("正则路径")
})
可匹配/a123456,  a后面10个数字以上
```

4：动态路由

```
// 动态路由
app.get("/news/:catagory/:newsid", (req, res, next) => {
    req.sethost = "127.0.0.1"
    // res.send("新闻ID页面:\n" + JSON.stringify(req.params));
    next();
}, (req, res) => {
    res.send("第二次发送数据" + req.sethost);
})

注意：1：每个路由中只能send一次，多次会报错
	 2：next()函数调用后可以执行下一个回调函数，功能来自于ES6的Generators函数生成器
```

