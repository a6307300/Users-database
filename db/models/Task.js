module.exports = (sequelize, DataTypes) => {

    const Task = sequelize.define('task', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        order: {
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
        columnID: {
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

    Task.associate = (models) => {
        Task.belongsTo(models.column, {
            foreignKey: 'columnID',
        });
        Task.hasMany(models.comment, {
            foreignKey: 'taskID',
            onDelete: 'cascade',
            hooks:true,
        });
    };

    return Task;

};
