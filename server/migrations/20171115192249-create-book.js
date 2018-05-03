

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
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    downVotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    borrowCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
