const { DataTypes } = require('sequelize');
const sequelize = require("../sequelizeForModels.js")
const user = require("./User.js")

const role = sequelize.define ("role", {
    value: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue:"user",
      primaryKey: true,
      allowNull: false,
  },
});




  module.exports = role;
