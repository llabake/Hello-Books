
export default(sequelize, DataTypes) => {
  const RequestBook = sequelize.define('RequestBook', {
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
  }, {});
  RequestBook.associate = (models) => {
    RequestBook.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    // associations can be defined here
  };
  return RequestBook;
};