var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var mUsers = require("../models/users");

module.exports = function(passport) {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        mUsers.findOne({ where: {userName: username} }).then(function(task) {
          if (task != null) {
            return done(null,false,req.flash("message", "Tên Đăng Nhập Đã Được Sử  Dụng"));
          } else {
            const saltRounds = 10;
            var salt = bcrypt.genSaltSync(saltRounds);
            var hash = bcrypt.hashSync(password, salt);
            var newUserMysql = {
              userName: username,
              password: hash
            };
            mUsers.create(newUserMysql).then(function(task) {
              newUserMysql.id = task.id;
              return done(null, newUserMysql, req.flash("message", "Đăng Kí Thành Công"));
            }).catch(function (err) {
              console.log(err);
              return done(null, false, req.flash("message", "Có Lỗi Xảy Ra|Error Code:02"));
            });
          }
        }).catch(function (err) {
          if (err) {
            return done(null,false,req.flash("message", "Có Lỗi Xảy Ra|Error Code:01"));
          }
        });
      }
    )
  );
};
