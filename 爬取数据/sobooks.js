const puppeteer = require("puppeteer");
const fs = require("fs");
const url = require("url");
const axios = require("axios");
const httpUrl = "https://sobooks.cc/";
const { readFile, writeFile } = require("../readFile");
(async function () {
    const debugOptions = {
        headless: false,
        slowMo: 250,
        defaultViewport: {
            width: 1400,
            height: 800
        }
    }
    const options = { headless: true }
    const broswer = await puppeteer.launch(debugOptions)
    // 目标，sobooks网站所有电子书的链接和书名
    // 进入网站获取整个网站的列表页数

    function lcWait(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("成功执行延时函数" + time);
            }, time);
        })
    }

    async function getAllPageNum() {
        // 新建页面
        const newPage = await broswer.newPage()
        // 进入页面地址
        await newPage.goto(httpUrl);
        // 设置选择器，获取总页数
        const pageNum = await newPage.$eval(".pagination li:last-child span", (element) => {
            return element.innerHTML.substring(1, element.innerHTML.length - 2).trim();
        })
        newPage.close() // 打开一个新页面之后关闭页面，避免占用内存空间
        return pageNum;
    }
    const pageNUm = await getAllPageNum(0);
    // console.log(pageNUm)

    async function pageList(num) {
        const pageListUrl = "https://sobooks.cc/page/" + num;
        const page = await broswer.newPage();
        // 访问列表页地址
        await page.goto(pageListUrl);
        const pageArr = await page.$$eval("#cardslist .card-item h3 a", (elements) => {
            const pageListArr = [];
            elements.forEach((element) => {
                const obj = {
                    href: element.getAttribute("href"),
                    title: element.getAttribute("title"),
                };
                pageListArr.push(obj);
            });
            // console.log(pageListArr, 1111111);  // 在$$eval函数里面的输出是在浏览器中才能看到，node 终端无法看到
            return pageListArr;
        })
        page.close();
        pageArr.forEach(async (pageObj, i) => {
            await lcWait(6000 * i);
            getPageInfo(pageObj);
        });
    }

    async function getPageInfo(pageObj) {
        const pageInfo = await broswer.newPage();
        // // 截取谷歌广告页面请求
        // await pageInfo.setRequestInterception(true);
        // // 监听请求事件，并对请求进行拦截
        // pageInfo.on("request", interceptedRequest => {
        //     let urlObj = url.parse(interceptedRequest.url())
        //     if (urlObj.hostname == "googleads.g.doubleclick.net")
        //         // 如果是谷歌的广告请求就放弃当次请求，广告响应太慢
        //         interceptedRequest.abort();
        //     else
        //         interceptedRequest.continue();
        // })
        await pageInfo.goto(pageObj.href);
        const inputEle = await pageInfo.$(".e-secret form input:nth-child(1)");
        inputEle.focus();
        pageInfo.keyboard.type("881122");
        await lcWait(2000)
        const inputBtn = await pageInfo.$(".e-secret form input:nth-child(2)");
        await inputBtn.click();
        // 当页面元素为ajax请求回来的数据时，需要使用waitForSelector等待一下才能获取到
        await pageInfo.waitForSelector(".e-secret b a:nth-child(1)");
        const aEle = await pageInfo.$(".e-secret b a:nth-child(1)");
        let urlStr = await aEle.getProperty("href");
        // console.log(url, 'url');
        // console.log(url._remoteObject, 'url.getProperty("href")');
        urlStr = urlStr._remoteObject.value;
        const aUrl = await urlStr.split("?url=")[1];
        const content = `{"title": "${pageObj.title}", "href": "${aUrl}"}\n`;
        fs.writeFile("book.txt", content, { flag: "a" }, () => {
            console.log("书籍信息已经写入");
            pageInfo.close();
        });
        console.log(aUrl, 'aUrl');
    }
    // pageList(2);

    // 读取book.txt文件，下载
    async function getDownloadUrl() {
        let urlList = await readFile("book.txt");
        const reg = /(\{.*?\})/igs;
        let templateUrl;
        let bookArr = [];
        while (templateUrl = reg.exec(urlList)) {
            // 获取匹配结果
            let jsonStr = templateUrl[1];
            // console.log(jsonStr, typeof jsonStr, "jsonStr");
            // 将字符串解析成对象
            const jsonObj = JSON.parse(jsonStr);
            // 获取链接属性
            // const bookHref = jsonObj.href;
            bookArr.push(jsonObj);
        }
        return bookArr;
    }

    const bookArr = await getDownloadUrl();
    let index = 0;
    async function downloadBook() {
        // 根据索引值下载
        if (index === bookArr.length) {
            return "完成下载";
        }
        // 一本一本的下载
        let bookObj = bookArr[index]
        index++;
        // 打开新页面下载书籍
        const bookPage = await broswer.newPage();
        await bookPage.goto(bookObj.href);
        await bookPage.waitForSelector("#table_files tbody .odd:nth-child(1) a", { visible: true });
        const elemA = await bookPage.$eval("#table_files tbody .odd:nth-child(1) a", (element) => {
            return element.getAttribute("href");
        });
        // elemA.click();
        // console.log(elemA.getProperty("href"), 'elemA.getProperty("href")');
        // const elemAHref = await elemA.getProperty("href")._remoteObject.value;
        // bookPage.close();
        bookLinkPage(elemA, bookObj.title);

    }

    // 可以使用goto去页面点击下载，也可以截获地址
    async function bookLinkPage(linkUrl, title) {
        const page = await broswer.newPage();
        console.log(title, "https://306t.com" + linkUrl, "linkUrl");
        await page.setRequestInterception(true);
        // 监听请求事件，并对请求进行拦截
        page.on("request", interceptedRequest => {
            // console.log(interceptedRequest.url(), 'interceptedRequest.url()');
            let urlObj = url.parse(interceptedRequest.url())
            if (urlObj.hostname) {   // ch1-cucc-aa.tv002.com每个下载地址的hostname不一样， == "ch1-cucc-aa.tv002.com"
                console.log("拦截到地址" + urlObj.href);
                // 如果是谷歌的广告请求就放弃当次请求，广告响应太慢
                interceptedRequest.abort();
                const ws = fs.createWriteStream("./book/" + title + ".azw3");
                axios.get(urlObj.href, { responseType: "stream" }).then((res) => {
                    res.data.pipe(ws);
                    ws.on("close", () => {
                        console.log("下载已完成", title);
                        downloadBook()  // 递归调用下载
                        // page.close();
                    })
                });
            } else {
                interceptedRequest.continue();
            }
        })
        // https://306t.com/file/tempdir-VzcAM1dtD2cHMVcwVWJXMwUqVGEFMgs4CGEEZVQ5VWELbFdoUn0IYQUxUzQBNlw8DjxRYgU1W20AYw  .content .card-deck:nth-child(2) .card:nth-child(1) button
        await page.goto("https://306t.com" + linkUrl);
        await page.waitForSelector(".btn.btn-outline-secondary.fs--1", { visible: true });
        const downloadBtn = await page.$(".btn.btn-outline-secondary.fs--1");
        downloadBtn.click();
    }

    await getDownloadUrl();
    await downloadBook();
})()


// 获取列表页的所有链接

// 进入每个电子书的详情页，获取下载电子书的网盘地址和提取码


// 将获取的电子书保存在book.txt文档里