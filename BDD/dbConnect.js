const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');
// connection a la base de donnée

const dataBase = mysql.createConnection({
    host:`${process.env.MODE == "PROD" ? process.env.DB_HOST : process.env.DB_HOST_LOCAL}`,
    user:`${process.env.MODE == "PROD" ? process.env.DB_USER : process.env.DB_USER_LOCAL}`,
    password:`${process.env.MODE == "PROD" ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_LOCAL}`,
    database: `${process.env.MODE == "PROD" ? process.env.DB_NAME : process.env.DB_NAME_LOCAL}`
  });
module.exports = dataBase;