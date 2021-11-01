const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeForModels.js');

const Role = sequelize.define('role', {
    value: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: 'user',
        primaryKey: true,
        allowNull: false,
    },
});

Role.associate = (models) => {
    Role.hasMany(models.user, {
        foreignKey: 'roleValue',
    });
};


module.exports = Role;
