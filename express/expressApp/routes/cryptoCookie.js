const express = require("express");
const router1 = express.Router();
const secret = require("../public/javascripts/cryptoMD5");
const cookie_parser = require("cookie-parser");

// domain：cookie在什么域名下有效，类型为String, 。默认为网站域名
// expires: cookie过期时间，类型为Date。如果没有设置或者设置为0，那么该cookie只在这个这个session有效，即关闭浏览器后，这个cookie会被浏览器删除。
// httpOnly: 只能被web server访问，类型Boolean。
// maxAge: 实现expires的功能，设置cookie过期的时间，类型为String，指明从现在开始，多少毫秒以后，cookie到期。
// path: cookie在什么路径下有效，默认为'/'，类型为String
// secure：只能被HTTPS使用，类型Boolean，默认为false
// signed: 使用签名，类型Boolean，默认为false。`express会使用req.secret来完成签名，需要cookie-parser配合使用`



router1.get("/", (req, res) => {
    const str = "123456";
    const code = secret.md5Secret(str + secret.MD5_suffix);
    // 将加密后的值作为key，密码明文作为value，存入secret对象中，在进行解密时直接获取加密后的cookie，去secret对象中就可以取到密码明文 
    secret[code] = str;
    res.cookie("login", code, { maxAge: 10000 });
    res.send("这是加密cookie，且有效期为10000" + code);
})

router1.get("/retry", (req, res) => {
    const cookie = secret[req.cookies.login];
    res.send("这是加密cookie，且有效期为10000---" + cookie);
})

module.exports = router1;
