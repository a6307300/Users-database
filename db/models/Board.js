module.exports = (sequelize, DataTypes) => {

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
            foreignKey: 'boardID',
            onDelete:'cascade',
            hooks:true,
        });
    };

    return Board;
};
