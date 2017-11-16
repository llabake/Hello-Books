import models from '../models';

const { Book } = models;
/**
 *
 *
 * @export
 * @class BookMiddleware
 */
export default class BookMiddleware {
  /**
   * @description Middleware to verify if book exist
   *
   * @static
   * @param {Object} req request Object
   * @param {Object} res response Object
   * @param {Function} next callback Function
   * @returns {Object} response containing book existence
   * @memberof BookMiddleware
   */
  static bookExist(req, res, next) {
    Book.findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            message: `Book with id: ${req.params.bookId} not found`
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

