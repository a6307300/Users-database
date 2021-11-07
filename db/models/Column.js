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
    board: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: {
                tableName: 'boards',
                // schema: 'schema',
            },
            key: 'id'
        },
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
        foreignKey: 'board',
    });
    Column.hasMany(models.task, {
        foreignKey: 'column',
        onDelete: 'cascade',
        hooks:true,
    });
};

module.exports = Column;
