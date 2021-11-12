const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeForModels.js');

const Column = sequelize.define('column', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    order: {
        type: DataTypes.INTEGER,
    },
    columnName: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    boardID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    },

});

Column.associate = (models) => {
    Column.belongsTo(models.board, {
        foreignKey: 'boardID',
    });
    Column.hasMany(models.task, {
        foreignKey: 'columnID',
        onDelete: 'cascade',
        hooks:true,
    });
};

module.exports = Column;
