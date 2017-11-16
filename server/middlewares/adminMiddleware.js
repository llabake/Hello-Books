/**
 * Class Definition for checking Admin privileges
 *
 * @export
 * @class AdminMiddleware
 */
export default class AdminMiddleware {
/**
 * @description Middleware to verify user's privilege status
 *
 * @static
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * @returns {Object} response containing the user's privilege status
 *
 * @memberof AdminMiddleware
 */
  static isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Permission denied, only an admin can access this route'
      });
    }
    next();
  }
}

