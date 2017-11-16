import jwt from 'jsonwebtoken';
import models from '../models';

const { User } = models;

const secret = 'mySecret';

/**
 * Class Definition for the Authentication Object using JWT
 *
 * @export
 * @class Authentication
 */
export default class Authentication {
/**
 * @description Middleware to verify the supplied token
 *
 * @static
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * @returns {Object} response containing user's access status
 *
 * @memberof Authentication
 */
  static authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!(token)) {
      return res.status(401).json({
        error: 'Missing token.Expects token in header with key as Authorization'
      });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.message === 'jwt expired') {
          res.status(401).json({
            error: 'Access token has expired. You are required to login again'
          });
        } else {
          res.status(401).json({
            error: 'Authentication failed. Invalid access token'
          });
        }
      }
      req.user = decoded.user;
      next();
    });
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {Object} response containing user's access status
   * @memberof Authentication
   */
  static isActive(req, res, next) {
    User.findById(req.user.id)
      .then((user) => {
        if (!user.active) {
          return res.status(403).send({
            message: `You are logged out ${user.username}, please log back in`
          });
        }
        next();
      });
  }
}
