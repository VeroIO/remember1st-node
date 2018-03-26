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
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        mUsers.getUserInfoByUserName(username, function(err, rows) {
          if (err){
              return done(err);
          }
          if (!rows.length) {
            return done(null, false, req.flash("loginMessage", "Không Tìm Thấy Tài Khoản."));
          }
          if (!bcrypt.compareSync(password, rows[0].password)) {
            return done(null, false, req.flash("loginMessage", "Sai Mật Khẩu."));
          } else {
            return done(null, rows[0]);
          }
        });
      }
    )
  );
};