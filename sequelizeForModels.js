const { Sequelize } = require('sequelize');

  const env = process.env.NODE_ENV || "development";
const config = require("./db/config/config.json")[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
module.exports = sequelize;

// const sequelize = new Sequelize("baseAPI", "anna", "fusion", {
//   dialect: "postgres",
//   host: "localhost"
// });