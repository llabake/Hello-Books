'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('Users', ['email'], {
        type: 'unique',
        name: 'email_unique',
      }),
      queryInterface.addConstraint('Users', ['username'], {
        type: 'unique',
        name: 'username_unique',
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('Users', 'email_unique'),
      queryInterface.removeConstraint('Users', 'username_unique'),
    ]);
  },
};
