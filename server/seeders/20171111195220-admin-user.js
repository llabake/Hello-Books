

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
      password: 'password',
      role: 'Admin',
      createdAt: '2017-11-11 13:10:24.505+00',
      updatedAt: '2017-11-11 13:10:24.505+00'
    }, {
      username: 'mama',
      firstName: 'Anne',
      lastName: 'Oriola',
      email: 'olamideoriola@gmail.com',
      password: 'yomi',
      role: 'Admin',
      createdAt: '2017-11-11 13:10:24.505+00',
      updatedAt: '2017-11-11 13:10:24.505+00'
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
