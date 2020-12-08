## 请求 cookie设置

1. 用户在登录成功之后需要携带成功状态来请求其他的API，在API在收到请求的时候会判断是否有携带登录cookie

2. 登录可以设置有效时间，可以设置成只有http请求才携带cookie

   ```
   router1.get("/", (req, res) => {
     res.cookie("isLogin", "true", { maxAge: 10000, httpOnly: true })
     res.send("this is mall index")
   })
   
   router1.get("/list", (req, res) => {
     if (req.cookies.isLogin === "true") {
       res.send("this is mall list" + "cookie success")
     } else {
       res.send("this is mall list" + "cookie fail")
     }
   
   })
   ```

   

3. cookie设置了之后，可以在请求头req中访问到req.cookies.cookie字段名

