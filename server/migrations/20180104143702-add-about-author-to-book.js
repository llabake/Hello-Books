
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'aboutAuthor', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'aboutAuthor');

  }
};
