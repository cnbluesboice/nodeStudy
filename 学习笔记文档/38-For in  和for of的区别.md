## for in  和for of的区别

#### for in ：以任意顺序遍历对象上的可枚举属性（包含原型链上的属性），symbol除外

```
Object.prototype.objFun = () => {};
Array.prototype.arrFun = () => {};
const obj = {
	name: "1111",
	age: "2222"
}
const arr = [1, 2, 3];
for(const key in obj){
	console.log(key); // output: name, age, objFun
}
for(const key in arr){
	console.log(key); // output: 0, 1, 2, arrFun
}
for(const key in arr){
	if(arr.hasOwnProperty(key)){ // 此时判断是否为对象自身的属性，排除原型链上的属性
		console.log(key); // output: 0, 1, 2
	}
}
```



#### for of :在可迭代对象（包括Map, Set,  Array, String, arguments, TypedArray）上创建一个迭代循环，为每个迭代值执行语句

```
Object.prototype.objFun = () => {};
Array.prototype.arrFun = () => {};
const obj = {
	name: "1111",
	age: "2222"
}
const arr = [1, 2, 3];
for(const value of obj){
	console.log(value); // output: "1111", "2222"
}
for(const value of arr){
	console.log(value); // output: 1, 2, 3
}
for of只会迭代对象本身的属性值，不会迭代原型上的属性
```

