module.exports = (sequelize, DataTypes) => {


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
        },
    });

    User.associate = (models) => {
        User.belongsTo(models.role, {
            foreignKey: 'roleValue',
        });
        User.hasMany(models.board, {
            foreignKey: 'owner',
            onDelete: 'CASCADE',
        });
        User.hasMany(models.comment, { 
            as: 'author1',
            foreignKey: 'userID',
            onDelete: 'CASCADE',
        });
    };

    return User;
};