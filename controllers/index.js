var mUsers = require("../models/users");
var request = require('request');

exports.indexPOST = function (req, res) {
    var  user ={
        userName:req.body.username,
        fullName:req.body.fullName,
        secretKey:req.body.secretKey,
    }
    mUsers.updateUserInfo(user);
    console.log(user);
    res.redirect("/");
};
