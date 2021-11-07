'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'users',
            'avatar',
            Sequelize.STRING
        );
    },

    down: async (queryInterface) => {
        return queryInterface.removeColumn(
            'users',
            'avatar'
        );
    }
};
