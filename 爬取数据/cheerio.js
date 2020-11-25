const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const httpUrl = "http://www.bbsnet.com/doutu";
axios.get(httpUrl).then((res) => {
    // console.log(res.data);
    const $ = cheerio.load(res.data);
    $("ul>li a").each((i, element) => {
        const aurl = $(element).attr("href");
        console.log(aurl);
        axios.get(aurl).then((res)=>{
            
        })
    })
})