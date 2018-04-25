var express = require("express");
var router = express.Router();

router.get("/generic.html", function(req, res, next) {
    res.render('addopt/generic')
});

module.exports = router;