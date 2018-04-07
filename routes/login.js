var express = require("express");
var router = express.Router();
var passport = require("passport");
require("../controllers/login.js")(passport);
var jwt = require("jsonwebtoken");
var config = require("../config");

superSecret = config.secret;
//Group Routing
router
  .route("/")
  .get(function(req, res) {
    res.render("login", { message: req.flash("loginMessage") });
  })
  .post(
    passport.authenticate("local-login", {
      failureRedirect: "/login",
      failureFlash: true
    }),
    function(req, res) {
      jwt.sign({ user: req.user }, superSecret, { expiresIn: "1h" }, function(err,token) {
        //Set Token To Session 
        //req.session.token=token;
        //Set Token To Cookie
        
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 2;
        res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 24 * 2 });
      } else {
        //req.session.cookie.expires = false;
        req.session.cookie.maxAge = 1000 * 60 * 30;
        res.cookie("jwt", token, { maxAge: 1000 * 60 * 30 });
      }        
        res.redirect("/");
      });      
    }
  )
  .put(function(req, res) {
    res.send("Got a PUT request at /user");
  })
  .delete(function(req, res) {
    res.send("Got a DELETE request at /user");
  });

module.exports = router;
