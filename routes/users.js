var express = require("express");
var router = express.Router();
var mUsers = require("../models/users");

router.get("/alluser", function(req, res, next) {
  mUsers.getAllUsers(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;