## 使用node制作自己的脚手架

脚手架可以在自己本机的全局使用，也可以只在本项目使用，两种只有细微的区别

以下为在本项目使用时的步骤

1. 在本项目新建文件夹，并创建index.js文件（如果是MAC环境需要在index.js文件的头部加上：#!/usr/bin/env node，意思是让系统自己去找node执行文件），例：创建文件夹cliDir

2. 在cli文件夹下npm init，然后在cli文件夹下的package.json文件中添加如下内容：

   ```
   {
     "name": "cli-test",
     "version": "1.0.0",
     "description": "test node cli",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "bin": {
       "hello-cli": "index.js"    // 添加此处内容
     },
     "keywords": [
       "node",
       "cli"
     ],
     "author": "chenling",
     "license": "ISC"
   }
   
   ```



3.在项目的package.json文件的scripts中添加如下：

```
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "testcli": "hello-cli"    // 添加此处命令行
  },
```

4.在当前项目下面安装脚手架

```
npm i -D file:cliDir(脚手架目录)
```

5.安装完成后，可以使用npm命令执行脚手架

```
npm run testcli
```

6.process是一个全局变量，它可以用来获取命令行的参数，如下：

```
输入命令：npm run testcli 111 2222 333
打印的内容为：
[
"D:\\node\\node.exe",
"c:\\Users\\87643\\Desktop\\clidemo\\node_modules\\cli-test\\index.js",
"111",
"2222",
"333"
]
```



如果想要使用比较复杂一点的参数或者命令，可以使用yargs 和 commander.js，自己手写太耗费精力