'use strict';

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.removeColumn(
            'users',
            'dateOfBirth'
        );
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'users',
            'dateOfBirth',
            Sequelize.DATEONLY
        );
    }
};
