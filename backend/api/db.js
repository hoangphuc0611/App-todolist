"use strict";
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_POST || '3306',
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASS || "1111",
  database: process.env.MYSQL_DB || "nodejs_api",
});


module.exports = db;
