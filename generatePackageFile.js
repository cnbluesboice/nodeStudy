const fs = require("fs");
const readline = require("readline");


function writeFile(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, { encoding: "utf-8", flag: "w" }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

// 创建readline接口实例
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// tiwen

function r1Question(title) {
    return new Promise((resolve, reject) => {
        r1.question(title, (answer) => {
            resolve(answer);
        })
    })
}

async function creatPackage() {
    const name = await r1Question("包的名字？");
    const description = await r1Question("包的描述?");
    const author = await r1Question("包的作者？");
    const license = await r1Question("包的licence？");

    const content = `{
        "name": "${name}",
        "version": "1.0.0",
        "description": "${description}",
        "main": "index.js",
        "scripts": {
          "test": "npm test"
        },
        "keywords": [
          "node"
        ],
        "author": "${author}",
        "license": "${license}",
        "dependencies": {
          "jquery": "^3.5.1"
        }
      }`;
      writeFile("package.json", content);
      // 当写完之后,关闭进程
      r1.close();
}

// 监听close，结束进程
r1.on("close", ()=>{
    process.exit(0)
})

creatPackage();
