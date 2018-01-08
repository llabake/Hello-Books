
module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn('Reviews', 'caption', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
  },

  down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Reviews', 'caption');

  }
};
