### 从零开始搭建react脚手架,以及自动生成组件

#### 1--创建文件夹,并生成package.json文件

找一个地方创建一个目录,使用VSCode打开文件夹,终端执行如下命令生成package.json文件,一路回车

```
npm init
```



#### 2--创建项目目录结构

1. 在根目录下创建src目录

2. 根目录下创建public目录,并在public目录下创建index.html文件,作为项目的入口文件,index.html的内容如下:

   ```
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>react-cli</title>
   </head>
   <body>
       <div id="root"></div>
   </body>
   </html>
   ```

   

3. 在src目录下创建index.js文件,内容如下

   ```
   import React, { Component } from "react";
   import ReactDOM from "react-dom";
   import App from "./app";
   
   class IndexView extends Component {
       render() {
           return <App />
       }
   }
   
   ReactDOM.render(<IndexView />, document.getElementById("root"))
   ```

   

4. 在src目录下创建App根组件,以及根组件的样式文件:app.less

5. 在src目录下创建view文件夹,用来存放视图组件代码

6. 在src目录下创建component文件夹,用来存放封装的公共组件

7. 在src目录下创建businessComponent文件夹,用来存放封装的公共业务组件

8. 在src目录下创建config文件夹,用来存放webpack的配置文件,以及生成组件CLI的配置文件

![image-20210108181345129](C:\Users\87643\AppData\Roaming\Typora\typora-user-images\image-20210108181345129.png)

#### 3--配置webpack

+ 下载如下包配置webpack

```
npm install --D webpack webpack-dev-server webpack-cli
npm install -D html-webpack-plugin
npm install -D webpack-merge
```

在项目中引入react框架，需要下载如下包

```
npm install -S react react-dom
```

+ 安装配置Babel，解析JS代码

```
npm install -D @babel/core @babel/preset-env @babel/preset-react 
npm install -D @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs2

@babel/core babelbabel的核心库
@babel/preset-env 把es6,es7语法转换成es5。bebel7以上的版本只用这一个预设包就可以实现语法的转换，已经废弃了preset-stage-0，preset-stage-1，preset-stage-2等这些包。但是这个包还不能转换es6，es7的一些新特性比如Array.includes()，这就需要我们使用@babel/plugin-transform-runtime了
@babel/preset-react 把react语法转换为es5
@babel/plugin-transform-runtime 支持一些es6，es7的新语法
```

+ 安装完上面的babel之后，需要配置.babelrc文件，代码如下

```
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "targets": {
                    "browsers": [
                        "> 1%",
                        "last 2 versions",
                        "not ie <= 8"
                    ]
                }
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": 2, // polyfill 需要使用@babel/runtime-corejs2
                "useBuildIns": "usage" //按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
            }
        ]
    ]
}
```

+ 安装编译文件的loader

```
npm install -D babel-loader
npm install -D style-loader css-loader
npm install -D url-loader file-loader
npm install -D less less-loader
```



+ 在config文件夹下面生成webpack.base.config.js文件，配置生产环境和开发环境的基础配置

```
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const utils = require("./utils");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index"
    },
    output: {
        path: utils.resolve("../dist"),
        filename: "js/[name].[hash].js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"], // 解析扩展（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
        alias: {
            "@": path.join(__dirname, "..", "src") // 在项目中使用@符号代替src路径，导入文件路径更方便
        }
    },
    // 模块
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader?modules" }  // 添加?modules 开启css模块化
                ],
            },
            {
                test: /\.less/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader?modules" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "static/img/[name].[hash:7].[ext]"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "static/fonts/[name].[hash:7].[ext]"
                }
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            filename: utils.resolve("./../dist/index.html"),
            template: "public/index.html",
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ],
}
```

+ 开发环境，在config目录下创建webpack.dev.config.js文件，代码如下

```
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = webpackMerge.merge(baseWebpackConfig, {
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            filename: utils.resolve("./../dist/index.html"), // html模板的生成路径
            template: "public/index.html", //html模板
            inject: true, // true：默认值，script标签位于html文件的 body 底部
        })
    ],
    // 开发环境本地启动的服务配置
    devServer: {
        historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
        hot: true,
        contentBase: false, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        compress: true, // 一切服务都启用gzip 压缩：
        port: "8081", // 指定段靠谱
        publicPath: "/", // 访问资源加前缀
        proxy: {
            // 接口请求代理
        },
    }
})
```

+ 生产环境，在config文件夹下创建webpack.prod.config.js，代码如下：

```
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = webpackMerge.merge(baseWebpackConfig, {
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            filename: utils.resolve("./../dist/index.html"), // html模板的生成路径
            template: "public/index.html", //html模板
            inject: true, // true：默认值，script标签位于html文件的 body 底部
            hash: true, // 在打包的资源插入html会加上hash
            minify: {
                removeComments: true,               //去注释
                collapseWhitespace: true,           //压缩空格
                removeAttributeQuotes: true         //去除属性引用
            }
        })
    ],
    // 开发线上环境启动的服务配置
    devServer: {

    }
})
```



#### 4--配置命令行自动生成组件

1. 在config目录下创建autoCli文件夹，并在当前文件夹下执行 npm init，创建package.json文件，在package.json文件中做如下配置

   ![image-20210111095014597](C:\Users\87643\AppData\Roaming\Typora\typora-user-images\image-20210111095014597.png)

2. 在autoCli文件夹下面创建bin文件夹，在bin文件夹下面创建index.js文件，index文件的代码如下

   ```
   const program = require("commander");
   program.version(require("../package.json").version);
   program.command("refresh Component")
       .description("refresh component")
       .action(require("../lib/refresh")(process.argv[2], process.argv[3]));
   
   
   /**
    * program.parse(process.argv);
    * process.argv 属性会返回一个数组，
    * 其中包含当 Node.js 进程被启动时传入的命令行参数。
    * 第一个元素是 process.execPath。 如果需要访问 argv[0] 的原始值，则参见 process.argv0。
    * 第二个元素是正被执行的 JavaScript 文件的路径。 其余的元素是任何额外的命令行参数。
    */
   ```

   

3. 在autoCli文件夹下面创建lib文件夹，并在lib文件夹下创建refresh.js文件，代码如下：

   ```
   const fs = require("fs");
   // const handlebars = require("handlebars"); // 一种模板语言的包
   const chalk = require("chalk");
   const { promisify } = require("util");
   const figlet = promisify(require("figlet"));
   // const clear = require("clear");
   
   
   const log = content => console.log(chalk.green(content))
   
   module.exports = async (dir, fileName) => {
   
       // clear();  // 清屏
       const logData = await figlet("build component");
       log(logData);
   
       await fs.mkdir(`./src/${dir}`, async (err) => {
           if (err) {
               return console.log(chalk.red(err));
           }
           log("文件夹创建成功");
           // 调用函数生成组件文件夹和对应文件(JS 和 less)
           await compile(`./src/${dir}/${fileName}.js`, `./src/template/index.js.hbs`);
           await compile(`./src/${dir}/${fileName}.less`, `./src/template/index.less.hbs`);
       })
   
   
       // 编译函数
       async function compile(filePathParams, templatePathParams) {
           // 判断模板文件是否存在
           if (fs.existsSync(templatePathParams)) {
               // 读取模板的数据
               const content = fs.readFileSync(templatePathParams).toString();
               // 同步将模板数据写入文件
               await fs.writeFileSync(filePathParams, content);
               log(`组件成功创建,路径如下-------${filePathParams}`);
           }
       }
   }
   ```

   

4. 以上都配置好后，在项目根目录下的package.json 文件中做如下配置:

   ![image-20210111095135333](C:\Users\87643\AppData\Roaming\Typora\typora-user-images\image-20210111095135333.png)

   

5. 执行命令，在本项目中安装此脚手架，通过命令生成组件

   ```
   npm i -D file:config/autoCli(脚手架目录)
   ```

   

6. 在项目本目录下开启终端，输入如下命令行自动生成组件：

   ```
   npm run buildDir -d=component/test3333 -f=index 
   // 其中-d表示组件文件夹路径（component需要手动创建，test3333是存放组件代码的文件夹），-f表示组件代码的JS 和样式代码文件名
   ```

