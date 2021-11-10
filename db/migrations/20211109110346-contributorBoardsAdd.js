'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'boards',
            'contributors',
            Sequelize.ARRAY(Sequelize.TEXT)
        );
    },

    down: async (queryInterface) => {
        return queryInterface.removeColumn(
            'boards',
            'contributors'
        );
    }
};

