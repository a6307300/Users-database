const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("baseAPI", "anna", "fusion", {
  dialect: "postgres",
  host: "localhost"
});

module.exports = sequelize;