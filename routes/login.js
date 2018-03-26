var express = require("express");
var router = express.Router();
var passport = require("passport");
require("../controllers/login.js")(passport);
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
      console.log("hello" + req.body.remember);
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000*60*60*3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect("/");
    }
  )
  .put(function(req, res) {
    res.send("Got a PUT request at /user");
  })
  .delete(function(req, res) {
    res.send("Got a DELETE request at /user");
  });

module.exports = router;
