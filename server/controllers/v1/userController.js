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
            const uniqueErrors = [];
            error.errors.forEach((uniqueError) => {
              uniqueErrors.push({
                path: uniqueError.path,
                message: `${uniqueError.path.charAt(0).toUpperCase() 
                  + uniqueError.path.slice(1)} already exist`
              })

            })
            return res.status(409).json({ errors: uniqueErrors });
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
            res.status(401).json({
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
                success: false,
                message: 'Authentication failed. Incorrect credentials.'
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
              .json({
                message: `You have successfully logged out ${user.username}`,
              })
            );
      });
  }
  
  /**
   * 
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * @returns {object} message containing validation response
   * @memberof UserController
   */
  static checkUserExist(req, res) {
    const { email, username } = req.query;
    if (!email && !username) {
      return res.status(400).json({
        message: 'email or username expected in query'
      })
    }
    User.findOne({
      where: {
        $or: [
          {
            username: username
          }, {
            email: email
          }
        ]
      }
    }).then((user) => {
      if (!user) {
        let message = username ? 'Username is valid' : 'Email is valid';
        return res.status(200).json({
          message
        })
      }
      if (user.username === username || user.email === email) {
        let message = username ? 'Username already taken' : 'Email already taken';
        return res.status(400).json({
          message
        })
      }
    })
    .catch((error) => {
      return res.status(400).json({ error })
    })
  }

  
  /**
   * 
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * @returns {any} response containing updated user profile
   * @memberof UserController
   */
  static uploadUserImage(req, res) {
    User.update(
      req.body,
      {
        where: { id: req.params.userId },
      }
    ).then((updatedUserProfile) => {
      res.status(200).json({
        user: updatedUserProfile[1][0],
        message: 'Your profile image has been updated'
      });
    }).catch((error) => {
      return res.status(500).json({error})
    })
  }

}
