const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeForModels.js');

const Comment = sequelize.define('comment', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    order: {
        type: DataTypes.INTEGER,
    },
    comment: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    task: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: {
                tableName: 'tasks',
                // schema: 'schema',
            },
            key: 'id'
        },
    },
    author: {
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
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    },

});

Comment.associate = (models) => {
    Comment.belongsTo(models.task, { 
        foreignKey: 'task',
    });
    Comment.belongsTo(models.user, {
        foreignKey: 'author',
    });
};

module.exports = Comment;
