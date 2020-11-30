const mysql = require("mysql");
const cheerio = require("cheerio");
const request = require("request");
const axios = require("axios");

let page = 1;


async function getPageUrl(num) {
    const httpUrl = "https://sobooks.cc/page/" + num;
    const res = await axios(httpUrl)
    let $ = cheerio.load(res.data);
    // $("#cardslist .card-item .metacat>a").each((i, element)=>{
    //     const href = $(element).attr("href");
    //     console.log(href);
    // })
    $("#cardslist .card-item a:nth-child(2)").each((i, element)=>{
        const href = $(element).attr("href");
        console.log(href);
        // 根据地址访问书籍详情页面
    })
}

getPageUrl(page)

async function getBookInfo(href){
    const result = await axios.get(href);
    const $ = cheerio.load(result.data);
    $(".bookinfo ul>li")
}

