var sequelize = require("../db.js");
var Sequelize = require("sequelize");
var Categories = sequelize.define(
  "categories",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: Sequelize.STRING,
    name: Sequelize.STRING
  },
  {
    timestamps: false
  }
);
module.exports = Categories;