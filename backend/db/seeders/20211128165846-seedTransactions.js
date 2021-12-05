'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Transactions', [{
      userId: 1,
      cryptoId: 'BTC',
      price: 1.00,
      quantity: .0920,
      buy: true,
     }], {});

  },

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Transactions', null, {});
  }
};
