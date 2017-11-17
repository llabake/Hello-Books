

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    publishedYear: {
      type: Sequelize.STRING
    },
    isbn: {
      type: Sequelize.STRING,
      unique: true
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
    readingList: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.TEXT
    },
    upVotes: {
      type: Sequelize.INTEGER
    },
    downVotes: {
      type: Sequelize.INTEGER
    },
    borrowCount: {
      type: Sequelize.INTEGER
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
  down: queryInterface => queryInterface.dropTable('Books')
};
