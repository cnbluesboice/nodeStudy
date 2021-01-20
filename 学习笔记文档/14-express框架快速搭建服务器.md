## express框架快速搭建服务器

#### 1：安装express

```
npm i express -S

express --version      // 查看版本号，需要管理员权限
```

#### 2：安装express脚手架

+ ##### 方式一

```
npm install express-generator -S
express -h // 查看命令行指令的含义
```

```
Usage: express [options] [dir]

  Options:

        --version        output the version number
    -e, --ejs            add ejs engine support
        --pug            add pug engine support
        --hbs            add handlebars engine support
    -H, --hogan          add hogan.js engine support
    -v, --view <engine>  add view <engine> support (dust|ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
        --no-view        use static html instead of view engine
    -c, --css <engine>   add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git            add .gitignore
    -f, --force          force on non-empty directory  强制在非空目录下创建
    -h, --help           output usage information	   输出使用方法
```

创建一个名为myapp 的Express应用，模板引擎使用ejs

```
express --view=ejs myapp
```

进入myapp，并安装依赖

```
cd myapp
npm install
```

在windows下使用以下 命令启动项目

```
set DEBUG=myapp:* & npm start
```

在mac和linux下使用以下命令开启express项目

```
DEBUG=myapp:* npm start
```

+ 方式二：使用express命令行快速创建项目

```
express myapp -e
```

```
// 项目包含目录
bin: 启动目录，里面包含启动文件www，默认监听3000端口（可以直接执行node www）
node_modules: 模块依赖包
public: 存放静态资源
routes: 路由操作
views: 存放模板文件
app.js: 主入口文件
package.json: 项目描述文件
```

#### 以上为脚手架命令行自动创建项目，试试自己手动创建

```
1：创建描述文件package.json
	npm init
2：安装项目需要依赖的包
	npm install 包名
3：创建app.js入口文件
	const express = require("express");
    const app = express();    // 实例化express
    app.get("/", (req, res)=>{
        res.send("<h1>Hello World! <br/> 我是首页</h1>")
    })
    app.listen(8080, ()=>{
        console.log("服务器启动完成：", "http://127.0.0.1:8080")
    })
```

