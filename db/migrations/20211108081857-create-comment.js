'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            order: {
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            comment: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            taskID: {
                type: Sequelize.INTEGER,
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
            userID: {
                type: Sequelize.INTEGER,
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
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('comments');
    }
};