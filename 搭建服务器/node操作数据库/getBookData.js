const mysql = require("mysql");
const cheerio = require("cheerio");
const axios = require("axios");

const options = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "sobooks",
}
const connect = mysql.createConnection(options);
connect.connect();

async function getPageUrl(num) {
    const httpUrl = "https://sobooks.cc/page/" + num;
    const res = await axios.get(httpUrl)
    let $ = cheerio.load(res.data);
    $("#cardslist .card-item a:nth-child(2)").each((i, element) => {
        const href = $(element).attr("href");
        console.log(href);
        getBookInfo(href)
    })
}

async function getBookInfo(href) {
    // 根据地址访问书籍详情页面
    const res = await axios.get(href)
    const $1 = cheerio.load(res.data);
    const bookName = $1(".bookpic>img").attr("title");
    console.log(bookName)
    let author = $1(".bookinfo li:nth-child(2)").text();
    console.log(author);
    author = author.substring(3, author.length);
    let publicTime = $1(".bookinfo li:nth-child(5)").text();
    publicTime = publicTime.substring(3, publicTime.length);
    const catagory = $1("#mute-category>a").text();
    // const bookBrief = $1("#mute-category>a").innerText
    // 数据写入数据库
    const insertSql = `insert into book (bookname,catagory,author,publictime) values ("${bookName}","${catagory}","${author}","${publicTime}")`;
    // const insertSql = `insert into book (bookname,catagory,author,publictime) values (111,222,333,20-20-20)`;
    connect.query(insertSql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
}


const totalNum = 30;
for (let i = 2; i <= totalNum; i++) {
    let page = 2;
    getPageUrl(page)
}