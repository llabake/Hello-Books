

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    voteType: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return Vote;
};
