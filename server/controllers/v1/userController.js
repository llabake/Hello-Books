// import User from '../../models/user';
import InputValidator from '../../helpers/inputValidator';
import models from '../../models/index';
import generateToken from '../../helpers/generateToken';

const { User } = models;

/**
 *
 *
 * @class UserController
 */
export default class UserController {
  /**
   * @description Signs up a new user
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof UserController
   * @returns {any} User object
   */
  static signUp(req, res) {
    const { errors, isValid } = InputValidator.signUp(req.body);
    if (!isValid) {
      res.status(400).json({ errors });
    } else {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
        .then((user) => {
          const token = generateToken.generateToken(user);
          res.status(201).json({
            message: 'Your Signup was successful',
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            },
            token
          });
        })
        .catch((error) => {
          if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'User already exists' });
          }
          return res.status(400).send(error);
        });
    }
  }
}
