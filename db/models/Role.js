module.exports = (sequelize, DataTypes) => {

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

    return Role;
};