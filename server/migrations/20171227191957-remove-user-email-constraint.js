'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'email_unique',
    });
    await queryInterface.addConstraint('Users', ['username'], {
      type: 'unique',
      name: 'username_unique',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Users', 'email_unique');
    await queryInterface.removeConstraint('Users', 'username_unique');
  },
};
