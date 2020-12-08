const express = require("express");
const router1 = express.Router();

router1.get("/", (req, res) => {
  res.cookie("isLogin", "true", { maxAge: 10000, httpOnly: true })
  res.send("this is mall index")
})

router1.get("/list", (req, res) => {
  if (req.cookies.isLogin === "true") {
    res.send("this is mall list" + "cookie success")
  } else {
    res.send("this is mall list" + "cookie fail")
  }

})

module.exports = router1;