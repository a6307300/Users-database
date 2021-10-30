'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
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
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleValue: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        references: {
          model: {
            tableName: 'roles',
            // schema: 'schema',
          },
          key: 'id'
        },
      },
    });
    },
  down: async (queryInterface, Sequelize) => {
       await queryInterface.dropTable('users');
 
  }
};
