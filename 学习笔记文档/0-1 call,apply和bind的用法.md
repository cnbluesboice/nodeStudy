## call,apply和bind的用法

#### 1：call

- call函数接收个参数，第一个参数是一个对象，其他参数是调用call函数的实参；第一个参数对象会改变调用call函数的this指向为自己
- 与apply的唯一区别是call接收的是参数列表，可以传入多个参数，而apply直接收两个参数，第二个参数是参数数组
- 可以使用call实现继承

```
function Person(name, age){
	this.name = name;
	this.age = age;
}
function Teacher(name, age, project){
	Person.call(this, name, age);  // 让Teacher继承Person中的属性或者方法
	this.project = project
}

const teacher = new Teacher("chenling", 26, "english")
```

- 使用call调用匿名函数

  例如：循环给一个对象中添加一个方法

```
const arr = [
	{name: "chenling", age: 26},
	{name: "chenhong", age: 26}
]
for(let i=0; i<arr.length; i++){
  (function(){
		this.handle= () => {     // 此时this就指向call函数的第一个参数，并且可以通过this访问其属性
			console.log(this.age);
		}
		this.handle();
  }).call(arr[i],i)
}
```

- 使用call方法调用函数，并指定上下文的this

```
function print(){
	console.log("my name is" + this.name+ ";", "my age is" + this.age + ";")
}
const obj = {name : "chenling", age: 26};
print.call(obj);
// 可以正常输出信息 此时this指向obj
```

- 使用call调用函数，并不指定第一个参数，函数的this会变为指向全局window

```
const name = "chenling";
const age = 26;
function print(){
	console.log("my name is" + this.name+ ";", "my age is" + this.age + ";")
}
print.call();
// 可以正常输出信息，此时this指向window
```

- call调用函数且不传参数，在严格模式下，this的值会是undefined

```
'use strict'
const name = "chenling";
const age = 26;
function print(){
	console.log("my name is" + this.name+ ";", "my age is" + this.age + ";")
}
print.call();
// 此时输出my name is undefined; my age is undefined;
```

+ 检测数据类型（任何数据类型都可以）

```
Object.prototype.toString.call("").slice(8, -1)   // "string"
Object.prototype.toString.call(true).slice(8, -1) // "Boolean"
```



#### 2：apply

- 接收两个参数，第一个参数为替换被调用函数中的this对象，第二个参数为传入调用函数的参数列表
- 当我们要将一个数组中的数据添加到另一个数组中，可以使用concat方法，但是concat返回的是一个新数组，如果要不修改原数组，可以使用apply方法

```
const arr1 = [1,2,3,4];
const arr2 = [5,6,7,8];
arr1.push.apply(arr1, arr2);
```

- 一些需要写循环遍历数组的需求，可以使用apply借用Math对象的方法来完成；例如：求最大值和最小值

```
const arr = [2, 45, 54, 37, 76, 22, 11];
Math.min.apply(null, arr);
Math.max.apply(null, arr);
```

- 当需要循环一个超长的数组（超过JS的参数限制65536）时，需要将数组切分成小块来处理，如下：

```
function minOfArray(arr){
	const min = Infinity; // 定义一个参数，用来存储最小值
	const square = 100;
	for(let i = 0; i<arr.length; i += square){
		// 先找出0-99的最小值，下一次循环就找100-199的最小值，然后每一次的最小值与上一次的最小值进行比较
		const submin = Math.min.apply(null, arr.slice(i, Math.min(i + square, min)));
		min = Math.min(submin, min);
	}
	return min;
}
minOfArray([2,34,54,654,32,435,56,767,876,34,23,43,5,456,56,32,3])
```

+ 使用apply来链接构造器 

```
Function.prototype.construct = function(args){
	const newObj = Object.create(this.prototype);
	this.apply(newObj, args);
	return newObj;
}

// 使用闭包
Function.prototype.construct = function(args){
	const newConstruct = ()=>{
		this.apply(this, args);
	}
	newConstruct.prototype = this.prototype;
	return new newConstruct();
}
```

#### 3：bind

+ bind()方法创建一个新的函数，在bind被调用时，新函数的this被指定为bind传入的第一个参数，其他参数将作为新函数的参数供新函数使用；
+ 在调用对象中的方法时，可能会丢失原来的对象

```
const name = "chenling"
const obj = {
	name: "陈玲",
	fun: ()=>{
		console.log(this.name);
	}
}
obj.fun();    // 输出 "陈玲"
const aaa = obj.fun;
aaa();       // 输出 "chenling"，因为该方法是在全局作用域中调用的；
const bbb = obj.fun.bind(obj);  // 让bbb方法中的this始终指向obj对象
bbb();       // 输出 "陈玲"
```

+ 使用bind()方法绑定的函数，在绑定时，写在this后面，可以让绑定函数拥有预设值，与ES6中的参数默认值功能相同

```
function test(a, b){
	console.log(a + b);
}
const ccc = test.bind(null, 2, 3)
ccc();
const ddd = test.bind(null, 2)
ddd(5,7);   // 此时得到的结果为 2+5=7，  第二个参数7会被忽略，因为在bind的时候已经指定了test函数的第一个默认参数，在调用的时候5为test函数的第二个默认参数
```

+ bind可以配合setTimeout使用，在setTimeout函数中，this指向window

```
function Test(){
	this.name = "chenling";
}

Test.prototype.declare = function(){
	console.log("my name is" + this.name);
}

Test.prototype.print =function(){
	setTimeout( this.declare.bind(this), 1000);
	// 此时this.declare的this指向Test构造函数，但是在declare函数体中的this指向window，所以加上.bind(this)之后，改变setTimeout函数中的this指向
}
const testObj = new Test();
testObj.print();
```

