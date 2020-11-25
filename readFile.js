var fs = require("fs");  ///导入文件模块
// node读写文件有同步和异步的接口（其他语言都是同步的）,node默认是异步的

// 同步的方式

// const fd = fs.openSync("./data/hello.txt", "r");
// // console.log(fd);

// const buffer = Buffer.alloc(20);

// const read = fs.readSync(fd, buffer, 0, 20);
// // console.log(read);

// const content = fs.readFileSync("./data/hello.txt", { flag: "r" });
// // console.log(content.toString());
// const content1 = fs.readFileSync("./data/hello.txt", { flag: "r", encoding: "utf-8" });
// console.log(content1);
// toString 和 encoding一样


// 对读取文件进行封装
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { flag: "r", encoding: "utf-8" }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
}

// readFile("./data/hello.txt").then((res) => {
//     // console.log(res)
// });

// async function readList() {
//     const f1 = await readFile("data/hello.txt");
//     console.log(f1.length);
//     const f2 = await readFile(f1 + '.txt');
//     const f3 = await readFile(f2 + '.txt');
//     // const f4 = await readFile(f3.trim() + '.txt');
//     console.log(f3);
// }

// readList()

function writeFile(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, { flag: "a", encoding: "utf-8" }, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })

    })
}

module.exports = { readFile, writeFile }