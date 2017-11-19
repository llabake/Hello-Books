import models from '../../models';

const { Book, Favorite, } = models;
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
 * @description Adds a books to users favorite list
 * @memberof FavoriteController
 */
  static markBookAsFavorite(req, res) {
    Favorite.create({
      where: {
        bookId: req.params.bookId,
        userId: req.params.userId
      }
    })
      .then(favorite => res.status(201).json({
        message: 'Added successfully',
        favorite
      }))
      .catch(error => res.status(500).json({
        error
      }));
    // Favorite.findOrCreate({
    //   where: {
    //     bookId: req.params.bookId,
    //     userId: req.params.userId
    //   },
    //   // include: [{
    //   //   model: Book,
    //   //   attributes: ['title', 'id'],
    //   // }],
    // })
    //   .spread((favorite, created) => {
    //     if (created) {
    //       return res.status(201).json({
    //         success: true,
    //         msg: `Book with id: ${req.params.bookId} added to favorites!`,
    //         message: `${Book.title} has been added to your favorite list`,
    //         favorite
    //       });
    //     }
    //     favorite.destroy();
    //     return res.status(200).json({
    //       success: false,
    //       msg: `Book with id: ${req.params.bookId} already added`,
    //       message: `${Book.title} has been favorited before +
    //       and has now been unfavorited`
    //     });
    //   })
    //   .catch(error => res.status(500).json({
    //     success: false,
    //     error,
    //     message: `An error occurred while adding ${Book.title} +
    //     to your Favorite list`
    //   }));
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
    Favorite.findAll({
      where: {
        id: req.params.bookId
      },
      attributes: [
        'createdAt', 'bookId', 'userId',
      ],
      include: [{
        model: Book,
        attributes: ['id', 'title'],
      }],
    })
      .then((favorites) => {
        if (favorites.length === 0) {
          return res.status(200).json({
            message: 'There are no Books on your Favorite List'
          });
        }
        return res.status(200).json({
          message: 'Favorite Book(s) retrieved successfully',
          favorites
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'error sending your request', error });
      });
  }
}
