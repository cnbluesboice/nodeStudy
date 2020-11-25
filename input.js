// 1：导入readline包(node命令行输入和输出)
// 2：实例化接口对象

const readLine = require("readline");

// 创建readline接口实例
const interface = readLine.createInterface({
    input: process.stdin,    // 输入   process进程的意思
    output: process.stdout,  // 输出
});

// 设置interface 提问事件
interface.question("今晚吃啥", (answer) => {
    console.log("答复" + answer);
    // 最终写完关闭进程
    interface.close();
});

interface.on("close", ()=>{
    process.exit(0);
});

