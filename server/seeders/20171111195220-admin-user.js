
const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
  // Add default admin users
    queryInterface.bulkInsert('Users', [{
      username: process.env.SEED_ADMIN1_USERNAME,
      firstName: process.env.SEED_ADMIN1_FIRSTNAME,
      lastName: process.env.SEED_ADMIN1_LASTNAME,
      email: process.env.SEED_ADMIN1_EMAIL,
      password: bcrypt.hashSync(process.env.SEED_ADMIN1_PASSWORD, 10),
      role: 'admin',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: process.env.SEED_ADMIN2_USERNAME,
      firstName: process.env.SEED_ADMIN2_FIRSTNAME,
      lastName: process.env.SEED_ADMIN2_LASTNAME,
      email: process.env.SEED_ADMIN2_EMAIL,
      password: bcrypt.hashSync(process.env.SEED_ADMIN2_PASSWORD, 10),
      role: 'admin',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('Users', null, {})
};
