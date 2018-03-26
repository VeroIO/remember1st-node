var express = require('express');
var bodyparser = require('body-parser');
var connection = require("./db");
var app = require("./app");

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


var server = app.listen(3000, function() {
  console.log('HellCat your server is on port ' + server.address().port);
});