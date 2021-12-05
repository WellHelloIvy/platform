'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('WatchlistCryptos', [{
       watchlistId: 1,
       cryptoId: 'BTC'
     }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('WatchlistCryptos', null, {});
  }
};
