var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../config"); 

superSecret=config.secret;

router.route("/user").get(verifyGetToken, function(req, res) {
    jwt.verify(req.token, superSecret, function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
        console.log(decoded.user);
        res.send(decoded.user);
      }
    });
  }).post(verifyPostToken, function(req, res) {
    jwt.verify(req.token, superSecret, function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
        console.log(decoded.user);
        res.send(decoded.user);
      }
    });
  }).put(function(req, res) {
    res.send("Got a PUT request at /user");
  }).delete(function(req, res) {
    res.send("Got a DELETE request at /user");
  });
router.route("/hihi").get(verifyGetToken, function(req, res) {
    jwt.verify(req.token, superSecret, function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
        console.log(decoded.user);
        res.send('hellcatvn');
      }
    });
  }).post(verifyPostToken, function(req, res) {
    jwt.verify(req.token, superSecret, function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
        console.log(decoded.user);
        res.send(decoded.user);
      }
    });
  }).put(function(req, res) {
    res.send("Got a PUT request at /user");
  }).delete(function(req, res) {
    res.send("Got a DELETE request at /user");
  });
//Middleware for Post and Get Method
function verifyPostToken(req,res,next) {

  const bearerHeader = req.headers['authorization'];
  
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  }else{
    //Forbidden
    res.sendStatus(403);
  }
}
function verifyGetToken(req, res, next) {
  const token = req.query.access_token;
  if(typeof token !== 'undefined'){
    req.token = token;
    next();    
  }else{
    res.sendStatus(403);
  }
}



module.exports = router;