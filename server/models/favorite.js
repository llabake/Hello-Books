/** Defines the Favorite database model and association
 * @exports Favorite
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} Favorite model
 */
module.exports = (sequelize) => {
  const Favorite = sequelize.define('Favorite', {});
  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
      as: 'book'
    });
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Favorite;
};
