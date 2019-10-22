
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Books', 'aboutAuthor', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Books', 'aboutAuthor');

  }
};
