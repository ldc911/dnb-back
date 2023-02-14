require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");

const migrate = async () => {
  const { MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE } =
    process.env;
  const connection = await mysql.createConnection({
    host: MYSQLHOST,
    port: MYSQLPORT,
    user: MYSQLUSER,
    password: MYSQLPASSWORD,
    database: MYSQLDATABASE,
    multipleStatements: true,
  });

  await connection.query(`drop database if exists ${MYSQLDATABASE}`);
  await connection.query(`create database ${MYSQLDATABASE}`);
  await connection.query(`use ${MYSQLDATABASE}`);

  const sql = fs.readFileSync("./backend/database.sql", "utf8");

  await connection.query(sql);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
