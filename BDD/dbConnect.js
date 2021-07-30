const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');
// connection a la base de donnée 
const dataBase = mysql.createConnection({
    host:`${process.env.HOST}`,
    user:`${process.env.USER_BDD}`,
    password:`${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`
  });
module.exports = dataBase;