
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    queryInterface.bulkInsert('Users', [{
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@demo.com',
      password: bcrypt.hashSync('password', 10),
      role: 'Admin',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'mama',
      firstName: 'Anne',
      lastName: 'Oriola',
      email: 'olamideoriola@gmail.com',
      password: bcrypt.hashSync('yomi', 10),
      role: 'Admin',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    queryInterface.bulkDelete('Users', null, {})

};
