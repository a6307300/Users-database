'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all ([
            queryInterface.addColumn(
                'comments',
                'authorName',
                Sequelize.STRING
            ), 
            queryInterface.addColumn(
                'comments',
                'authorAva',
                Sequelize.STRING
            ),
        ]);
    },

    down: async (queryInterface) => {
        return queryInterface.removeColumn(
            'boards',
            'contributors'
        );
    }
};
