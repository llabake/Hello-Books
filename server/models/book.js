
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
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title is required'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'author is required'
        }
      }
    },
    publishedYear: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'publishedYear is required'
        }
      }
      
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'isbn is required'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'quantity is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 700],
          msg: 'Minimum of 1 character and Maximum of 700 characters required'
        },
        notEmpty: {
          args: true,
          msg: 'description is required'
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
    borrowCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    aboutAuthor: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          args: true,
          msg: 'aboutAuthor is required'
        }
      }
    }
  });
  Book.associate = (models) => {
    Book.hasMany(models.Review, {
      foreignKey: 'bookId',
      as: 'reviews'
    });
    Book.hasMany(models.Favorite, {
      foreignKey: 'bookId',
      as: 'favorited'
    });
    Book.hasMany(models.BorrowBook, {
      foreignKey: 'bookId',
      as: 'book',
    });
    Book.hasMany(models.Vote, {
      foreignKey: 'bookId',
    });
  };
  Book.prototype.isAvailable = function isAvailable() {
    return this.quantity >= 1;
  };
  return Book;
};
