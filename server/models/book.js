
/** Defines the Book database model and association
 * @exports Book
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} Book model
 */
export default(sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publishedYear: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 700],
          msg: 'Minimum of 1 character and Maximum of 700 characters required'
        }
      }
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    readingList: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    borrowCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  Book.associate = (models) => {
    Book.hasMany(models.Review, {
      foreignKey: 'bookId',
      as: 'reviews'
    });
    Book.hasMany(models.Favorite, {
      foreignKey: 'bookId',
    });
    Book.hasMany(models.BorrowBook, {
      foreignKey: 'bookId',
      as: 'book',
    });
  };
  Book.prototype.isAvailable = function isAvailable() {
    return this.quantity >= 1;
  };
  return Book;
};
