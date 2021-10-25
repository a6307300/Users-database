'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [{
      value: 'admin',
    }], {});
    await queryInterface.bulkInsert('roles', [{
      value: 'user',
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('roles', null, {});
  }
};
