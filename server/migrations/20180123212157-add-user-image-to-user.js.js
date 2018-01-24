module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'image', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
  },

  down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'image');
  }
};
