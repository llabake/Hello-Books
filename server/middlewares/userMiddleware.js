import models from '../models';

const { User } = models;
/**
 *
 *
 * @export
 * @class BookMiddleware
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
    User.findById(req.params.userId || req.user.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: `User with id: ${req.user.id} not found`
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
