const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeForModels.js');

const User = sequelize.define('user', {
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
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
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

User.associate = (models) => {
    User.belongsTo(models.role, {
        foreignKey: 'roleValue',
    });
    User.hasMany(models.board, {
        foreignKey: 'owner',
    });
};


module.exports = User;
