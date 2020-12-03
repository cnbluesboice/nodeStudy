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

- 使用call方法调用函数，并制定上下文的this

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

