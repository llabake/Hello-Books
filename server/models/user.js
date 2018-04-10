import bcrypt from 'bcrypt';

/** Defines the User database model and association
 * @exports User
 * @param  {object} sequelize - sequelize
 * @param  {object} DataTypes - sequelize Datatypes
 * @return {object} User model
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'username is required'
        },
        len: {
          args: [[3, 25]],
          msg: 'Minimum of 3 character and Maximum of 25 characters required'
        },
        isAlphanumeric: {
          args: true,
          msg: 'username can only contain alphabets and numbers'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'firstname is required'
        },
        len: {
          args: [[3, 25]],
          msg: 'Minimum of 3 character and Maximum of 25 characters required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'lastname is required'
        },
        len: {
          args: [[3, 25]],
          msg: 'Minimum of 3 character and Maximum of 25 characters required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'email is required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email supplied. Please supply a valid email'
        }
      }
    },
    role: {
      type: DataTypes.ENUM,
      values: ['normal', 'admin'],
      defaultValue: 'normal'
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password is required'
        },
        len: {
          args: [[3, 25]],
          msg: 'Minimum of 3 character and Maximum of 25 characters required'
        }
      }
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        user.password = bcrypt.hashSync(user.password.toString(), salt);
      },
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'user'
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
    });
    User.hasMany(models.BorrowBook, {
      foreignKey: 'userId',
      as: 'users'
    });
    User.hasMany(models.Vote, {
      foreignKey: 'userId',
    });
    User.hasMany(models.RequestBook, {
      foreignKey: 'userId',
    });
  };
  return User;
};
