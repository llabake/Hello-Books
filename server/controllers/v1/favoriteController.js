// change it back to models/favorite
import Favorite from '../../dummy/models/favorite';
// change it back to models/book
import Book from '../../dummy/models/book';
/**
 *
 *
 * @class FavoriteController
 */
export default class FavoriteController {
/**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {any} response containing a a message
 * @memberof FavoriteController
 */
  static markBookAsFavorite(req, res) {
    try {
      const favorite = new Favorite({
        bookId: parseInt(req.params.bookId, 10),
        userId: parseInt(req.params.userId, 10)
      });
      favorite.create();
      const book = Book.getById(req.params.bookId);
      return res.status(201).json({
        message: `The book: ${book.title} has been added to your favorite list`,
        favorite
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {any} response containing an array of user's favorite books
 * @memberof FavoriteController
 */
  static retrieveUserFavorite(req, res) {
    const userFavorites =
    Favorite.getAllByUserId(parseInt(req.params.userId, 10));
    return res.status(200).json({ userFavorites });
  }
}
