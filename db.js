var mysql = require("mysql");
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "long",
  database: "remember"
});
module.exports = connection;