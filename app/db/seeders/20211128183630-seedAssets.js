'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Assets', [{
      userId:1,
      cryptoId:'BTC',
      quantity:.9020
      }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Assets', null, {});
  }
};
