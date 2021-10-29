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
      type: Sequelize.INTEGER
    },
    id: {
      type: Sequelize.NUMBER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
},
    static associate(models) {
      // define association here
    }
  };
  Board.init({
    id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};