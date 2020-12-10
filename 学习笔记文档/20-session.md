## session

#### 1：关于session

session是一种记录用户访问的机制，与cookie保存在客户端不同，session是保存在服务端的，当客户端访问服务器时，服务端会生成一个session对象，以key和value的形式保存，同时服务器会将key传给客户端的cookie，当用户第二次访问时，将cookie中的key携带给服务端，服务器会把value值返回给客户端

#### 2：设置session

安装

```
npm i express-session -save
```

引入session模块

```
const session = require("express-session");
```

设置session

```
session(options)
```

使用代码如下

```
const express = require("express");
const session = require("express-session");
const app = express();

// 配置中间件
app.use(session({
	secret: "login keyboard cat",
	resave: false,
	saveUninitialized: true,
	cookie: ("name", "value", {maxAge: 5*6*1000, secure: false})
}))

app.use("/login", (req, res)=>{
	// 设置session
	req.session.userinfo = "张三"
	res.send("登录成功");
})

app.use("/", (req, res)=>{
	// 获取session
	if(req.session.userinfo){
		res.send("hello" + req.session.userinfo + "welcome");
	}
})
```

#### session的常见用法

```
// 设置session
req.session.username="张三";

// 获取session
req.session.username

//重新设置cookie的过期时间
req.session.cookie.maxAge = 1000;

// 销毁session
req.session.destroy((err)=>{})
```

#### 可以通过销毁session的方式来退出登录

