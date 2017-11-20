
/** Defines the BorrowBook database model and association
 * @exports BorrowBook
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} BorrowBook model
 */
module.exports = (sequelize, DataTypes) => {
  const BorrowBook = sequelize.define('BorrowBook', {
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expectedReturnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actualReturnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    borrowStatus: {
      type: DataTypes.ENUM,
      values: ['pending', 'accepted'],
      defaultValue: 'pending'
    },
    returnStatus: {
      type: DataTypes.ENUM,
      values: ['', 'pending', 'accepted'],
      defaultValue: ''
    },
  });
  BorrowBook.associate = (models) => {
    BorrowBook.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
      as: 'book'
    });
    BorrowBook.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'users'
    });
  };
  return BorrowBook;
};
