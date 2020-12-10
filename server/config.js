const mysql = require('mysql');
const config = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});
module.exports = config;
