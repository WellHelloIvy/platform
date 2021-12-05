'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Watchlists', [{
      userId: 1,
      name: 'Watchlist'
     }], {});

  },

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Watchlists', null, {});
  }
};
