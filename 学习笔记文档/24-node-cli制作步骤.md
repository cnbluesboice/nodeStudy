## 使用node制作自己的脚手架

脚手架可以在自己本机的全局使用，也可以只在本项目使用，两种只有细微的区别

以下为在本项目使用时的步骤

1. 在本项目新建文件夹，并创建index.js文件（如果是MAC环境需要在index.js文件的头部加上：#!/usr/bin/env node，意思是让系统自己去找node执行文件），例：cliDir
2. 在cli文件夹下npm init，然后在cli文件夹下的package.json文件中添加如下内容

![image-20201225110604918](C:\Users\87643\AppData\Roaming\Typora\typora-user-images\image-20201225110604918.png)



3.在项目的package.json文件的scripts中添加如下：

![image-20201225110728754](C:\Users\87643\AppData\Roaming\Typora\typora-user-images\image-20201225110728754.png)

4.在当前项目下面安装脚手架

```
npm i -D file:cliDir(脚手架目录)
```

5.安装完成后，可以使用npm命令执行脚手架

```
npm run testcli
```

6.process是一个全局变量，它可以用来获取命令行的参数，如下

![image-20201225112142117](C:\Users\87643\AppData\Roaming\Typora\typora-user-images\image-20201225112142117.png)

如果想要使用比较复杂一点的参数或者命令，可以使用yargs 和 commander.js，自己手写太耗费精力