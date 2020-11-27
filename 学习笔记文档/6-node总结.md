## node总结

#### node用来做什么？

1. node是一门后端语言，能够连接数据库，进行数据的存取；
2. 能够接受和处理网络请求
3. 事件驱动，异步执行（不用等待），提高I/O（input 和 output）的处理数据和效率

#### 事件驱动

node本身提供了事件对象，帮助我们快速选择订阅者模式，或观察者模式或者事件模式

```
// 事件订阅
event.on("事件名称", ()=>{ 事件处理 })

// 事件处理
event.emit("时间名")
```

读写事件

```
// 读取
fs.readFile("path", options, (err, data)=>{}) // 异步
fs.readFileSync("path", options, (err, data)=>{}) // 同步

// 写入
fs.writeFile("path", options, (err)=>{}) // 异步
fs.writeFileSync("path", options, (err)=>{}) // 同步
```

读写的promise封装

```
// 读取
function readFileFn(path){
	return new Promise((resolve, reject)=>{
		fs.readFile(path, '可选配置项', (err, data)=>{
			if(err){
				reject(err);
			}else {
				resolve(data);
			}
		})
	})
}

// 写入
function writeFileFn(path){
	return new Promise((resolve, reject)=>{
		fs.writeFile(path, '可选配置项', (err)=>{
            if(err){
                reject(err);
            }else {
				resolve();
			}
		})
	})
}
```

使用方式，需要在异步函数中进行使用

```
( sync function(){
	const data = await readFileFn(path)
})()
```

#### 网络请求数据

request，axios ：效率高，局限性较大

puppeteer模拟浏览器的操作：局限性较小，效率低

需要重点掌握：页面的分析，数据的存放位置和响应的内容解析

#### 网络响应数据

```
// 创建服务器
const server = http.createServer();
// 监听请求
server.on("request", (req, res)=>{
	// req：请求数据
	// res：响应数据
})

```

#### 路由

根据不同的路径去响应不同的内容

```
// 循环匹配正则路径
for (let key in this.reqEvent) {
    const reg = new RegExp(key, "igs");
    if (reg.test(req.url)) {
        res.setHeader("Content-type", "text/html;charset=utf-8");
        this.reqEvent[key](req, res);
        resStatus = true;
        break;
    }
}
```

#### 模板

一个固定样式和结构的模板，根据响应数据的不同，响应不同的数据（例如：新闻页面）

```
function render(options, path) {
    fs.readFile(path, { encoding: "utf-8" }, async (err, data) => {
        if (err) {
        	console.log(err);
        } else {
            // 匹配明星列表
            const starReg = /\{%for \{\{(.*?)\}\} %\}(.*?)\{%endfor%\}/igs;
            let starResult;
            while (starResult = starReg.exec(data)) {
                const starKey = starResult[1].trim();
                const starArr = options[starKey];
                let starStr = "";
                starArr.forEach((star, index) => {
                	starStr += replaceVar(starResult[2], { item: star });
                })
                // 数组变量替换   
                data = data.replace(starResult[0], starStr);
                // 单个变量替换
                data = replaceVar(data, options);
            }
            // 最终输出渲染出来的html
            this.end(data);
         }
    })
}
```

