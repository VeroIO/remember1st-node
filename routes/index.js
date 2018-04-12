var express = require("express");
var router = express.Router();
var Users = require("../routes/users");
var Login = require("../routes/login");
var Register = require("../routes/register");
var cIndex = require("../controllers/index")
var Api = require("./api");
var Notes = require("../controllers/admin/notesmanagement");

router.use("/users", Users);
router.use("/login",Login);
router.use("/signup",Register);
router.use("/api",Api);
router.use("/notesmanagement.html",Notes);

router.get("/", isLoggedIn, function(req,res) {
  console.log(req.isAuthenticated());
  var user=req.user;
  res.render("index",{user});
});
router.post("/", function(req,res) {
  cIndex.indexPOST(req,res);
})

router.get("/test", function(req, res) {

});

router.get("/logout", function(req, res) {
  console.log(req.logout());
  req.logout();
  res.redirect("/");
});

// Some error that unknow safety first
router.get("/login.html/", function(req, res) {
  res.redirect("/login");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next()
  };
  res.redirect("/login");
}
module.exports = router;