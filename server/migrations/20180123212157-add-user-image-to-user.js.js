module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'image', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'image');
  }
};
