const fs = require("fs");
const { readFile, writeFile } = require("./readFile");

fs.readdir("data", (err, fils) => {
    if (err) {
        console.log(err);
    } else {
        console.log(fils);
        fils.forEach(async (file, i) => {
            const content = await readFile("data/" + file);
            await writeFile("data/input.txt", content + "\n");
        })
    }
})