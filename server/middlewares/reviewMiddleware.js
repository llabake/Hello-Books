import models from '../models';

const { Review } = models;
/**
 * 
 * 
 * @export
 * @class ReviewMiddleware
 */
export default class ReviewMiddleware {

  /**
   * @description Middleware to verify if review exist
   * 
   * @static
   * @param {any} req req request Object
   * @param {any} res res request Object
   * @param {Function} next callback Function
   * @returns {Object} response containing review existence
   * @memberof ReviewMiddleware
   */
  static reviewExist(req, res, next) {
    Review.findById(req.params.reviewId)
      .then((review) => {
        if (!review) {
          return res.status(404).json({
            message: `Review with id: ${req.params.reviewId} not found`
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

