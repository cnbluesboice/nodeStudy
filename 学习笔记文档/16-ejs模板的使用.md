## ejs模板的使用

#### 定义模板文件，后缀名为  .ejs

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>
```

#### 路由获取到数据之后通过render函数读取模板文件，填充数据，渲染页面

```
app.get("/", async (req, res) => {
  res.render("index.ejs", {title: "陈玲"});
})
```

#### 模板语法

```
1. <% title %>  里面写的是JS语法
2. <%= title %> 直接输出数据，不识别标签，会将标签当成文本字符串输出，渲染在页面上
3. <%- title %> 直接输出数据，识别HTML标签
```

#### 条件渲染页面

```
 // 路由
 app.get("/bookcatagory", async (req, res) => {
  // 条件输出
  const options = {
    "username": "chenling",
    "gender": "女",
  }
  res.render("condition.ejs", options)
 })
 
 // 模板
 <h1>性别：<%=gender%></h1>
 <% if(gender === "男"){ %>
 <h3>编程相关内容</h3>
 <% }else{ %>
 <h3>逛街相关内容</h3>
 <% } %>
```

