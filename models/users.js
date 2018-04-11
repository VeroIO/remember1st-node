var sequelize = require("../db.js");
var Sequelize = require("sequelize");
var Users = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: Sequelize.STRING,
    password: Sequelize.STRING,
    fullName: Sequelize.STRING,
    fstLogin: Sequelize.STRING,
    active: Sequelize.INTEGER,
    role: Sequelize.STRING,
    secretKey: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

module.exports = Users;