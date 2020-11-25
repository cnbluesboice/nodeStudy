// 1：数组不能进行二进制的操作
// 2：JS数组不像JAVA等后端语言效率高
// 3：为了提升JS数组对二进制数据的存储，buffer内存空间开辟出固定大小的内存
// 不写专门用于存储的框架，一般使用不到

// 例如：将字符串转成buffer对象， 又将buffer转成字符串
const str = "hello";
const buf = Buffer.from(str);
console.log(buf);

console.log(buf.toString());

// alloc创建一个空的buffer缓存区

const buf2 = Buffer.alloc(10);
console.log(buf2);


const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);