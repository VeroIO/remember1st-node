var express = require("express");
var router = express.Router();
var passport = require("passport");
require("../controllers/register.js")(passport);
//Group Routing
router
  .route("/")
  .get(function(req, res) {
    res.render("register", { message: req.flash("message") });
  })
  .post(
    passport.authenticate("local-signup", {
      successRedirect: "/login",
      failureRedirect: "/signup",
      failureFlash: true
    })
  );
module.exports = router;