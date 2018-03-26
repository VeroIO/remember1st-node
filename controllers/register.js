var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var mUsers = require("../models/users");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    mUsers.getUserInfoById(id, function(err, rows) {
      done(err, rows[0]);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        mUsers.getUserInfoByUserName(username, function(err, rows) {
          if (err) {
            return done(
              null,
              false,
              req.flash("message", "Có Lỗi Xảy Ra|Error Code:01")
            );
          }
          if (rows.length) {
            console.log("Tài Khoản Đã abc");
            return done(
              null,
              false,
              req.flash("message", "Tên Đăng Nhập Đã Được Sử  Dụng")
            );
          } else {
            const saltRounds = 10;
            var salt = bcrypt.genSaltSync(saltRounds);
            var hash = bcrypt.hashSync(password, salt);
            var newUserMysql = {
              username: username,
              password: hash
            };
            mUsers.addUser(newUserMysql, function(err, rows) {
              if (err) {
                console.log(err);
                return done(
                  null,
                  false,
                  req.flash("message", "Có Lỗi Xảy Ra|Error Code:02")
                );
              } else {
                newUserMysql.id = rows.insertId;
                return done(
                  null,
                  newUserMysql,
                  req.flash("message", "Đăng Kí Thành Công")
                );
              }
            });
          }
        });
      }
    )
  );
};
