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