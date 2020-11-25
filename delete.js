const fs = require("fs");

fs.unlink("data/input.txt", ()=>{
    console.log("成功删除！");
})