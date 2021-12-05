'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@user.com',
      hashedPassword: bcrypt.hashSync('abc123', 10),
      cashBalance: 10.00,
      },
      {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      hashedPassword: bcrypt.hashSync('abc123', 10),
      cashBalance: 10.00,
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
