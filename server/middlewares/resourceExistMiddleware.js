import { checkResourceExist } from "../helpers/utils";
/**
 * 
 * 
 * @export
 * @class ResourceExist
 */
export default class ResourceExistMiddleware {
  /**
   * 
   * 
   * @static
   * 
   * @param {Object} req 
   * @param {Object} res 
   * @param {Integer} next 
   * 
   * @returns {Object} next route function
   * @memberof ResourceExist
   */
  static userExist(req, res, next) {
    const userId = req.params.userId || req.user.id;
    return checkResourceExist('User', userId, res, next)
  }

    /**
   * @description Middleware to verify if book exist
   *
   * @static
   * 
   * @param {Object} req request Object
   * @param {Object} res response Object
   * @param {Function} next callback Function
   * 
   * @returns {Object} response containing book existence
   * @memberof ResourceExist
   */
  static bookExist(req, res, next) {
    return checkResourceExist('Book', req.params.bookId, res, next)
  }

  /**
   * 
   * 
   * @static
   * 
   * @param {any} req 
   * @param {any} res 
   * @param {any} next 
   * 
   * @returns {Object} next route function
   * @memberof ResourceExist
   */
  static reviewExist(req, res, next) {
    return checkResourceExist('Review', req.params.reviewId, res, next)
  }
}