

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    bookId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      unique: 'userid_bookid_unique',
      references: {
        model: 'Books',
        key: 'id',
        as: 'bookId',
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      unique: 'userid_bookid_unique',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    uniqueKeys: {
      userid_bookid_unique: {
        fields: ['userId', 'bookId']
      }
    }
  }),
  down: queryInterface => queryInterface.dropTable('Reviews')
};
