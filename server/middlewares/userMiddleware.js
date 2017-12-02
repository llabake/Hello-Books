import models from '../models';

const { User } = models;
/**
 *
 *
 * @export
 * @class UserMiddleware
 */
export default class UserMiddleware {
  /**
   * @description Middleware to verify if user exist
   *
   * @static
   * @param {Object} req request Object
   * @param {Object} res response Object
   * @param {Function} next callback Function
   * @returns {Object} response containing user existence
   * @memberof UserMiddleware
   */
  static userExist(req, res, next) {
    const userId = req.params.userId || req.user.id;
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: `User with id: ${userId} not found`
          });
        }
        next();
      })
      .catch(error => res.status(500).json({
        message: 'Error sending your request',
        error
      }));
  }
}
