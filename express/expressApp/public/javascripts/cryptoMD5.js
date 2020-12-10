const crypto = require("crypto");

module.exports = {
    MD5_suffix: "s5kjdhsjkfheiou89_kjoasi78",
    md5Secret: (str)=>{
        const hash = crypto.createHash("md5");
        hash.update(str);
        return hash.digest("hex");
    }
}