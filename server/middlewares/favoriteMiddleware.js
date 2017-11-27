import models from '../models';

const { Favorite } = models;
/**
 *
 *
 * @export
 * @class FavoriteMiddleware
 */
export default class FavoriteMiddleware {
  /**
   * @description Middleware to verify if book favorite instance exist
   * @static
   * @param {Object} req request Object
   * @param {Object} res response Object
   * @param {Function} next callback Function
   * @returns {Object} response containing book existence
   * @memberof FavoriteMiddleware
   */
  static favoriteExist(req, res, next) {
    Favorite.findOne({
      where: {
        bookId: req.params.bookId,
        userId: req.user.id
      }
    })
      .then((favorite) => {
        if (!favorite) {
          return res.status(404).json({
            message: `Book with id:${req.params.bookId} is not on your Favorite List`
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
