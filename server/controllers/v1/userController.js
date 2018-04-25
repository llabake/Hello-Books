import bcrypt from 'bcrypt';

import InputValidator from '../../helpers/inputValidator';
import models from '../../models';
import { generateToken, trimObject } from '../../helpers/utils';


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
   * 
   * @param {any} req
   * @param {any} res
   * 
   * @memberof UserController
   * @returns {any} User object
   */
  static signUp(req, res) {
    const userDetail = trimObject(req.body)
    const { errors, isValid, } = InputValidator.signUp(userDetail);
    if (!isValid) {
      res.status(400).json({ errors });
    } 
    else {
      const { username, email, password, firstName, lastName } = userDetail;
      User.create({username, email, password, firstName, lastName })
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
          return res.status(500).json({error});
        });
    }
  }
  /**
 *
 *
 * @static
 * 
 * @param {any} req
 * @param {any} res
 * 
 * @returns {any} user object
 * @memberof UserController
 */
  static signIn(req, res) {
    const signInDetail = trimObject(req.body);
    const { errors, isValid } = InputValidator.signIn(signInDetail);
    if (!isValid) {
      return res.status(400).json({ errors });
    } else {
      const { username, password } = signInDetail;
      User.findOne({
        where: { username },
      })
        .then((user, err) => {
          if (err) {
            res.status(500).json({ err });
          } else if (!user) {
            res.status(401).json({
              success: false,
              message: 'Authentication failed. Incorrect credentials.'
            });
          } else if (user) {
            if (bcrypt.compareSync(password.toString(), user.password.toString())) {
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
    * 
    * 
    * @static
    * 
    * @param {Object} req request object
    * @param {Object} res response object
    * 
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
   * 
   * @param {any} req 
   * @param {any} res
   * 
   * @returns {object} message containing validation response
   * @memberof UserController
   */
  static checkUserExist(req, res) {
    const { email, username } = req.query;
    if (!email && !username) {
      return res.status(400).json({
        message: 'Email or Username expected in query'
      })
    }
    User.findOne({
      where: {
        $or: [
          {
            username
          }, {
            email
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
      return res.status(500).json({ error })
    })
  }

  
  /**
   * 
   * 
   * @static
   * 
   * @param {any} req 
   * @param {any} res
   * 
   * @returns {any} response containing updated user profile
   * @memberof UserController
   */
  static editUserProfile(req, res) {
    const profileToBeEdited = trimObject(req.body)
    const { errors, isValid } = InputValidator.editProfile(profileToBeEdited)
    if(!isValid) {
      res.status(400).json({ errors });
    } else {
      User.update(
        profileToBeEdited,
        {
          where: { id: req.user.id },
          returning: true,
        }
      ).then((updatedUsers) => {
        const updatedUser = updatedUsers[1][0];
        res.status(200).json({
          profile: {
            userId: updatedUser.id,
            role: updatedUser.role,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            image: updatedUser.image
          },
          message: 'Your profile has been updated'
        });
      }).catch((error) => {
        return res.status(500).json({ 
          error,
          message: error.message
        })
      })
    }
  }
  
  /**
   * 
   * 
   * @static
   * 
   * @param {any} req 
   * @param {any} res 
   * 
   * @returns {any} response containing user profile
   * @memberof UserController
   */
  static getUserProfile(req, res) {
    User.findOne({
      where: {id: req.user.id},
      attributes: ['id', 'image', 'firstName', 'lastName']
    })
    .then((user) => {
      res.status(200).json({
        message: 'Profile retrieved successfully',
        profile : user
      })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
  }

}
