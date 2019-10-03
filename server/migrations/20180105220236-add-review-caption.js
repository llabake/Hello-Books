
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Reviews', 'caption', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Reviews', 'caption');

  }
};
