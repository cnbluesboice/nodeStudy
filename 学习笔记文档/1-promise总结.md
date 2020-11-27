#### 写法不同

1. ES5写法

   ```
   getAjax(url, (res)=>{})
   ```

   

2. promise写法

   ```
   get(url).then((res)=>{})
   ```

   

3. Async await写法

   ```
   （async => {
   	const res = await get(url);
   })();
   ```

   **这种写法会自动的转换为promise写法，是promise的语法糖，使得代码更加整洁，看起来更加像同步的写法**

 

总结：

+ ES5的写法和promise写法的区别：可以让回调函数划分出去在.then方法中进行操作，避免了回调地狱

+ async写法和promise写法的区别：async是promise的语法糖，这种形式的写法在底层编译之后会自动转化成promise的写法

#### Promise的实现原理

promise需要实现的功能

```javascript
	function fn(resolve, reject){
        setTimeout(() => {
            if(true){
                resolve();
            }else{
                reject();
            }
        });
    }
    const p1 = new ClPromise(fn);
    p1.then((res)=>{
      document.body.style.background = "green";
      console.log("成功", res);
    })
    p1.catch((err)=>{
      document.body.style.background = "pink";
      console.log("失败", err);
    })
```

p1Promise对象发送一个异步请求，必然会有一个未来事件，在未来要执行。这个过程由传入的函数fn执行，函数fn里必然需要由成功执行和失败执行的函数



1. 创建构造类

   ```javascript
   class ClPromise{
   	constructor(fn){
   		// 将成功的函数集成在successList里面
   		this.successList = [];
   		// 将所有的失败的函数集成在failList里面
   		this.failList = [];
   		// pending, fullfilled, rejected
   		this.state = "pending";
   		// 传入的函数对象（异步操作的函数内容）
   		fn(this.resolveFn.bind(this), this.rejected.bind(this));
   	}
       then(successFn, failFn){
           if(typeof successFn == "function"){
               this.successList.push(successFn);
           }
           if(typeof failFn == "function"){
               this.failList.push(failFn);
           }
       }
       catch(failFn){
           if(typeof failFn == "function"){
               this.failList.push(failFn);
           }
       }
       resolveFn(res){
           this.state = "fullfilled";
           // 成功之后调用所有成功的函数
           this.successList.forEach((item)=>{
               // 将成功的事件循环调用
               item(res)
           })
       }
       rejectFn(res){
           this.state = "rejected";
           // 注册到的失败的所有事件进行调用
           this.failList.forEach((item)=>{
               item(res);
           })
           throw Error(res)
       }
   }
   ```

   构造函数的作用

   + 声明成功函数放置的数组对象
   + 声明失败函数放置的数组对象
   + 定义初始化状态
   + 调用传入进行执行的异步内容的函数（在未来有成功的结果时调用传入的成功的函数，失败时调用传入的失败的函数）
   + 循环调用成功和失败的事件函数，并修改当前状态

   

   # 应用

   如何将promise与async和await结合使用

   典型的异步读写回调操作

   ```
   fs.readdir("data", (err, fils) => {
       if (err) {
           console.log(err);
       } else {
           console.log(fils);
           fils.forEach(async (file, i) => {
               const content = await readFile("data/" + file);
               await writeFile("data/input.txt", content + "\n");
           })
       }
   })
   ```

   转换成promise   async和await写法

   ```javascript
   new Promise((resolve, reject)=>{
   	fs.readdir("data", (err, files) => {
           if (err) {
               console.log(err);
               reject();
           } else {
               console.log(fils);
               resolve(files);
           }
   	})
   })
   ```

   封装成promise对象，并return

   ```javascript
   function readFile(path){
   	return new Promise((resolve, reject)=>{
           fs.readdir(path, (err, files) => {
               if (err) {
                   console.log(err);
                   reject();
               } else {
                   console.log(fils);
                   resolve(files);
               }
           })
       })
   }
   ```

   之后可以如下使用

   ```javascript
   readFile(path).then((res)=>{ console.log(res); })
   ```

   async await写法

   ```javascript
   (async () => {
   	const res = await readFile(path);
   })()
   ```

   异步async函数调用之后也是一个promise对象

   ```javascript
   async function test(){
   	const data = await readFile(path);
   	return data;
   }
   const result = test(); 
   // 此时任然获得的是一个promise对象，想要获得数据需要在.then里面获取
   result.then((resData)=>{
   	cosnole.log(resData); // 此时才获取到数据
   });
   ```

   