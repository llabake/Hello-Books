/**
 * Class Definition for checking Admin privileges
 *
 * @export
 * @class AdminRoute
 */
export default class AdminRoute {
/**
 * @description Middleware to verify the supplied token
 *
 * @static
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * @returns {Object} response containing the user's privilege status
 *
 * @memberof AdminRoute
 */
  static isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Permission denied, only an administrator can access this route'
      });
    }
    next();
  }
}

