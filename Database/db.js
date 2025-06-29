// const mysql = require('mysql2');
// const dotenv = require('dotenv');
// dotenv.config();

// const connection = mysql.createConnection(process.env.DATABASE_URL);

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// module.exports = pool.promise();




const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(process.env.DATABASE_URL);

module.exports = connection.promise();
