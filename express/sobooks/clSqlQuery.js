const mysql = require("mysql");

const options = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "sobooks"
}
const connect = mysql.createConnection(options);
connect.connect();

function sqlQuery(sqlStr, arr) {
    return new Promise((resolve, reject) => {
        connect.query(sqlStr, arr, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = sqlQuery;