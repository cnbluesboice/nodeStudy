## multer中间件实现上传文件的功能

#### 安装

```
npm i multer -S
```

#### 引入

```
const multer = require("multer");
```

#### 实例化

```
const upload = multer( {dest: "存储的路径", limits:{fileSize: 限制文件大小, files: 限制上传的数量}} );
```

#### 实现功能代码

![image-20201209173841258](C:\Users\87643\AppData\Roaming\Typora\typora-user-images\image-20201209173841258.png)

#### 上传多个文件，通过upload可以设置如下的参数

![image-20201209173752587](C:\Users\87643\AppData\Roaming\Typora\typora-user-images\image-20201209173752587.png)

