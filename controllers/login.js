var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var mUsers = require("../models/users");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    mUsers.findOne({ where: { id: id } }).then(function(task) {
      done(null,task);
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
        mUsers.findOne({ where: {userName: username} }).then(function(task) {
          if (task == null) {
            return done(null, false, req.flash("loginMessage", "Không Tìm Thấy Tài Khoản."));
          }else if (!bcrypt.compareSync(password, task.password)) {
            return done(null, false, req.flash("loginMessage", "Sai Mật Khẩu."));
          }else{
            return done(null, task);
          }
        }).catch(function (err) {
          return done(err);
        });
      }
    )
  );
};