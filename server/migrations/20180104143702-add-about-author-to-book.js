
module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn('Books', 'aboutAuthor', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
  },

  down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Books', 'aboutAuthor');

  }
};
