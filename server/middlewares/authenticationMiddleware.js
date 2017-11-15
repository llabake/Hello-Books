import jwt from 'jsonwebtoken';

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
}
