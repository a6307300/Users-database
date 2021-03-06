module.exports = (sequelize, DataTypes) => {

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
        taskID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
        },
        userID: {
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

    Comment.associate = (models) => {
        Comment.belongsTo(models.task, { 
            foreignKey: 'taskID',
        });
        Comment.belongsTo(models.user, {
            as: 'author',
            foreignKey: 'userID',
        });
    };

    return Comment;
};
