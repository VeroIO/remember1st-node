var mUsers = require("../models/users");
var request = require('request');

exports.indexPOST = function (req, res) {
    var  user ={
        userName:req.body.username,
        fullName:req.body.fullName
    }
    // mUsers.updateUserInfo()
    console.log(user);
};
