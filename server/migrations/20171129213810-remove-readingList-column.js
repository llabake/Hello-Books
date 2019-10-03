

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'readingList');

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'readingList', {
      type: Sequelize.STRING,
      defaultValue: ''
    });
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

