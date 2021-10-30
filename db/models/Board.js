const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelizeForModels.js");

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    boardName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users',
          // schema: 'schema',
        },
        key: 'id'
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  };
},
Board.associate = (models) => {
  Board.belongsTo(models.user, {
    foreignKey: 'owner',
  });
  };
  Board.init({
    id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
