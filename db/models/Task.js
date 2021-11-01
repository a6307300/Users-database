const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeForModels.js');

const Task = sequelize.define('task', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    taskName: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    range: {
        allowNull: true,
        defaultValue: 1,
        type: DataTypes.INTEGER,
    },
    column: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'columns',
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

Task.associate = (models) => {
    Task.belongsTo(models.column, {
        foreignKey: 'column',
    });
};

module.exports = Task;
