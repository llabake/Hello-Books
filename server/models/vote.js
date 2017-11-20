
/** Defines the Vote database model and association
 * @exports Vote
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} Vote model
 */
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    voteType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['upVote', 'downVote']],
      }
    }
  });
  Vote.associate = (models) => {
    Vote.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
      as: 'book'
    });
    Vote.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Vote;
};
