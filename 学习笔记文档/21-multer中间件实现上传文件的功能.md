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

```
const express = require("express");
const multer = require("multer");
// 初始化上传对象
const upload = muilter({dest: "./upload/"});
const fs = require("fs");

const app = express();
// files为input type="file"的name的值
app.use("/", upload.single("files"), (req, res)=>{ 
	const oldFile = req.file.destination + req.file.filename // 指定旧文件
	const newFile = req.file.destination + req.file.originalname // 指定新文件
	fs.rename(oldFile, newFile, (err)=>{
		if(err){
			res.send("上传失败！");
		}else {
			res.send("上传成功！")
		}
	})
})

```

#### 上传多个文件，通过upload可以设置如下的参数

在HTML中找input type="file"需要加上multiple来实现过滤，multiple不写参数则可以读取所有文件。而在服务端上，我们需要将single()改为array("name", num);的形式来接受多个文件的上传请求，最后对他们全部进行重命名。在这之前我们首先看看multer支持哪些文件上传方式：

```
.single(fieldname)  // 接受一个以fieldname命名的文件。
.array(fieldname, [, maxcount])  // 接受一个以fieldname命名的文件数组，可以配置maxcount的数组对象
.fields(fields)  // 接受指定fields的混合文件，fields是一个拥有name 和 maxcount的数组对象
.none()  // 只接受文本域，如果任何文件上传到这个模式，将发生“LIMIT_UNEXPECTED_FILE"错误
.any()   // 接受一切上传的文件
```

