const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeForModels.js');

const Board = sequelize.define('board', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    boardName: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: {
                tableName: 'users',
                // schema: 'schema',
            },
            key: 'id'
        },
    },
    contributors: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
    },
});

Board.associate = (models) => {
    Board.belongsTo(models.user, {
        foreignKey: 'owner',
    });
    Board.hasMany(models.column, {
        foreignKey: 'board',
        onDelete:'cascade',
        hooks:true,
    });
};

module.exports = Board;
