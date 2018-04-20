import models from '../../models';

const { Book, Favorite, Review, User } = models;
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
 * 
 * @param {any} req
 * @param {any} res
 * 
 * @returns {any} response containing a a message
 * @description Adds a books to users favorite list
 * 
 * @memberof FavoriteController
 */
  static markBookAsFavorite(req, res) {
    Favorite.findOrCreate({
      where: {
        bookId: req.params.bookId,
        userId: req.user.id
      },
    })
      .spread((favorite, created) => {
        Book.findOne({
          where: {
            id: req.params.bookId
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [{
            model: Review,
            as: 'reviews',
            attributes: ['id', 'content', 'createdAt', 'caption','updatedAt'],
            include: [{
              model: User,
              as: 'user',
              attributes: ['username', 'id'],
            }],
          }, {
            model: Favorite,
            as: 'favorited',
            attributes: ['id', 'createdAt'],
            include: [{
              model: User,
              as: 'user',
              attributes: ['username', 'id'],
            }],
          }],
        }).then((book) => {
          if (created) {
            return res.status(201).json({
              message: `${book.title} has been added to your favorite list`,
              favorite,
              book
            });
          }
          return res.status(409).json({
            message: `${book.title} already on your favorite list`
          });
        });
      })
      .catch(error => res.status(500).json({
        error: error.message,
        message: 'An error occurred while adding to your Favorite list'
      }));
  }
  /**
 *
 *
 * @static
 * 
 * @param {any} req
 * @param {any} res
 * 
 * @returns {any} response containing an array of user's favorite books
 * @memberof FavoriteController
 */
  static retrieveUserFavorite(req, res) {
    Favorite.findAll({
      where: {
        userId: req.user.id
      },
      include: [{
        model: Book,
        attributes: ['id', 'title', 'description', 'upVotes', 'downVotes', 'image'],
        as: 'book',
        include: [{
          model: Review,
          as: 'reviews'
        }, {
          model: Favorite,
          as: 'favorited',
        }]
      }],
    })
      .then((favorites) => {
        if (favorites.length === 0) {
          return res.status(200).json({
            favorites,
            message: 'There are no Books on your Favorite List'
          });
        }
        return res.status(200).json({
          message: 'Favorite Book(s) retrieved successfully',
          favorites
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'error sending your request', error: error.message });
      });
  }
  /**
   *
   *
   * @static
   * 
   * @param {any} req
   * @param {any} res
   * @returns {Object} success message
   * 
   * @memberof FavoriteController
   */
  static deleteBookFromFavorite(req, res) {
    Favorite.findOne({
      where: {
        userId: req.user.id,
        bookId: req.params.bookId
      },
      include: [{
        model: Book,
        attributes: ['id', 'title'],
        as: 'book'
      }],
    })
      .then((favorite) => {
        favorite.destroy()
          .then(() => res.status(200).json({
            message: `${favorite.book.title} has been removed from your favorite list`,
            book: favorite.book
          }));
      })
      .catch(error => res.status(500).json({
        error,
        message: 'An error occurred while removing this book from your favorite list'
      }));
  }
}

