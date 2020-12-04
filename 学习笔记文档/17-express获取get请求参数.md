## express获取get请求参数

在提交表单的时候，我们需要定义表单提交的方式为get或者post，对应的提交方法会有不同的解析接收参数的方式

1. get

   ```
   // 定义模板结构 /search 对应的后台路由，接受表单提交的参数
   <form action="/search" method="GET">
       <input type="text" name="searchKey">
       <input type="text" name="name">
       <button type="submit">搜索</button>
   </form>
   
   // 路由接收参数
   app.get("/search", (req, res) => {
     // express在req上自带提取参数属性
     console.log(req.query);
     res.render("form.ejs");
   });
   ```

   

2. post

   ```
   // 定义模板结构 /search1 对应的后台路由，接受表单提交的参数
   <form action="/search1" method="POST">
       <input type="text" name="username">
       <input type="text" name="password">
       <button type="submit">搜索</button>
   </form>
   
   // 路由接收参数
   app.post("/search1", (req, res) => {
     // express在req上自带提取参数属性
     console.log(req.body);
     res.send("post提交数据")
   });
   ```

   注意：要解析post传过来的参数，需要使用中间件注册解析body的方法

   ```
   // 解析post 提交的数据
   app.use(express.urlencoded({extended: true}));
   ```

   