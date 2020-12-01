const fs = require("fs");
const path = require("path")
const url = require("url");

// 读取文件信息
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

// 文件写入
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

// 读取目录
function readDir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, { encoding: "utf-8", withFileTypes: false }, (err, files) => {  // withFileTypes 为true时可以获取到文件的类型，返回对象， 默认为false， 只返回文件名称数组
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    })

}

// 删除目录
function deleteDir(path) {
    return new Promise((resolve, reject) => {
        fs.rmdir(path, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

// 文件重命名
function rename(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

module.exports = { readDir, readFile, writeFile, rename, deleteDir }