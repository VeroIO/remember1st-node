var db = require("../db.js");

var users = {
  getAllUsers: function(callback) {
    return db.query("Select * from users", callback);
  },
  getUserInfoByUserName: function(username, callback) {
    return db.query("select * from users where userName=?", [username], callback);
  },
  getUserInfoById: function(id, callback) {
    return db.query("select * from users where id=?", [id], callback);
  },
  addUser: function(user, callback) {
    return db.query(
      "Insert into users(userName,password,fstLogin,active,role) values(?,?,?,?,?)",
      [user.username, user.password, "0" , "1" ,"user" ],
      callback
    );
  },
  deleteSV: function(id, callback) {
    return db.query("delete from sinhvien where Id=?", [id], callback);
  },
  updateUserInfo: function(user, callback) {
    return db.query("update users set fullName=?,fstLogin=?,secretKey=? where userName=?", [user.fullName, "1",user.secretKey, user.userName], callback);
  }
};
module.exports = users;