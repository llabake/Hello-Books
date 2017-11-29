

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('BorrowBooks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Books',
        key: 'id',
        as: 'bookId',
      }
    },
    borrowDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    expectedReturnDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    actualReturnDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    borrowStatus: {
      type: Sequelize.ENUM,
      values: ['pending', 'accepted'],
      defaultValue: 'pending'
    },
    returnStatus: {
      type: Sequelize.ENUM,
      values: ['', 'pending', 'accepted'],
      defaultValue: ''
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('BorrowBooks')
};
