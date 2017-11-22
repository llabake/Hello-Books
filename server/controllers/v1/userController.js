import bcrypt from 'bcrypt';

import InputValidator from '../../helpers/inputValidator';
import models from '../../models';
import { generateToken } from '../../helpers/utils';


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
          user.update({ active: false });
          const token = generateToken(user);
          res.status(201).json({
            message: `Your Signup was successful ${user.username}`,
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            },
            token,
          });
        })
        .catch((error) => {
          if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'User already exists' });
          }
          return res.status(400).send(error);
        });
    }
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {any} user object
 * @memberof UserController
 */
  static signIn(req, res) {
    const { errors, isValid } = InputValidator.signIn(req.body);
    if (!isValid) {
      res.status(400).json({ errors });
    } else {
      User.findOne({
        where: {
          username: req.body.username
        },
      })
        .then((user, err) => {
          if (err) {
            res.status(500).send(err);
          } else if (!user) {
            res.status(400).json({
              success: false,
              message: 'Authentication failed. Incorrect credentials.'
            });
          } else if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
              user.update({ active: true });
              const token = generateToken(user);
              res.status(200).json({
                message: `Welcome ${user.username}, you're logged in`,
                token,
              });
            } else {
              res.status(401).json({
                message: 'Incorrect credentials, please check username or password'
              });
            }
          }
        });
    }
  }
  /**
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  static signOut(req, res) {
    User.findById(req.user.id)
      .then((user) => {
        user.update({ active: false })
          .then(() =>
            res.status(200)
              .send({
                message: `You have successfully logged out ${user.username}`,
              }));
      });
  }
}
