const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("baseAPI", "anna", "fusion", {
  dialect: "postgres",
  host: "localhost"
});

const user = sequelize.define ("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  module.exports = user;




// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("baseAPI", "anna", "fusion", {
//   dialect: "postgres",
//   host: "localhost"
// });

// const User = sequelize.define("user", {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     fullName: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     dateOfBirth: {
//       type: Sequelize.DATEONLY,
//       allowNull: false,
//     },
//   });

//   module.exports = User;