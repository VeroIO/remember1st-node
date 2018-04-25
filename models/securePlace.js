var sequelize = require("../db.js");
var Sequelize = require("sequelize");
var securePlace = sequelize.define(
  "securePlaces",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    belongToUser: Sequelize.STRING,
    mainType: Sequelize.STRING,
    userName: Sequelize.STRING,
    password: Sequelize.STRING,
    title: Sequelize.STRING,
    website: Sequelize.STRING,
    topSecret: Sequelize.INTEGER
  },
  {
    timestamps: false
  }
);

module.exports = securePlace;