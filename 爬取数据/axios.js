// const axios = require("axios");
const reqest = require("request"); // node专门用来做爬虫的

const httpUrl = "https://movie.douban.com/";

// 获取电影分类地址
async function getClassUrl() {
    const { response, body } = await reqFn(httpUrl)
    const reg = /<ul class="inner_catalogList">(.*?)<\/ul>/igs
    const result1 = reg.exec(body);
    // console.log(result1[1]);
    // const reg1 = /<li class="clearfix_smile">(.*?)<\/li>/igs
    const reg1 = /<a class=.*?active.*?href="(.*?)">(.*?)<\/a>.*?<a href="(.*?)">(.*?)<\/a>/igs
    let result2, objArr = [];
    while (result2 = reg1.exec(result1[1])) {    // exec需要循环提取相同的数据
        const obj = {
            classname: [result2[2], result2[4]],
            url: [result2[1], result2[3]]
        }
        objArr.push(obj)
    }

    console.log(objArr);
}

// 通过分类获取电影链接
async function getMovie() {

}

function reqFn(url) {
    return new Promise((resolve, reject) => {
        reqest.get(url, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve({ response, body })
            }
        })
    })
}

getClassUrl()