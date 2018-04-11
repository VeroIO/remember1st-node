var Sequelize = require("sequelize");
var Categories = sequelize.define("Categories", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: Sequelize.STRING,
  name: Sequelize.STRING
});