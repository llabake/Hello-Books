import models from '../../models';
import InputValidator from '../../helpers/inputValidator';

const { Review, Book, User , Favorite } = models;
/**
 *
 *
 * @export
 * @class ReviewController
 */
export default class ReviewController {
/**
 *  Add Review to a book
 *
 * @static
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Error Object or Review content Object
 * @memberof ReviewController
 */
  static addReview(req, res) {
    const { errors, isValid } = InputValidator.addReview(req.body);
    if (!isValid) {
      res.status(400).json({ errors });
    } else {
      Review.create({
        content: req.body.content,
        caption: req.body.caption,
        bookId: req.params.bookId,
        userId: req.user.id
      })
      .then((review) => {
        Book.findOne({
          where: {
            id: req.params.bookId
          },
          // exclude: [{
          //   attributes: ['createdAt', 'updatedAt']
          // }],
          include: [{
            model: Review,
            as: 'reviews',
            attributes: ['id', 'content', 'createdAt', 'updatedAt','caption'],
            include: [{
              model: User,
              as: 'user',
              attributes: ['username', 'id'],
            }],
          },
          {
            model: Favorite,
            as: 'favorited',
            attributes: ['id', 'createdAt'],
            include: [{
              model: User,
              as: 'user',
              attributes: ['username', 'id'],
            }],
          }],
          order: [[{model: Review, as: 'reviews'}, 'updatedAt', 'DESC']],
        })
        .then((book) => {
          if (book.reviews.length === 0) {
            return res.status(200).json({
              message: 'Be the first to post a review',
              review
            })
          }
          return res.status(201).json({
            message: 'Review has been posted',
            book,
            review
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: error.message
          })
        })
      })
      .catch(error => res.status(500).json({
        message: 'error sending your request',
        error
      }));
    }
  }
  /**
 *
 *@description Delete a book review
 * @static
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Object containing either success message or error message
 * @memberof ReviewController
 */
  static deleteReview(req, res) {
    Review.findOne({
      where: {
        id: req.params.reviewId
      }
    })
      .then((review) => {
        if (review) {
          if (review.userId !== req.user.id) {
            res.status(403).json({
              message: 'You did not post this Review, hence can not delete it'
            });
          } else {
            review.destroy()
              .then(() => res.status(200).send({
                message: 'Review deleted successfully'
              }));
          }
        } else {
          return res.status(404).json({
            message: 'Review not found'
          });
        }
      })
      .catch(error => res.status(500).json({
        error,
        message: 'error sending your request'
      }));
  }

  /**
   * @returns {Array} Array of review on a book
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * @memberof ReviewController
   */
  static getAllBookReview(req, res) {
    Review.findAll({
      where: {
        bookId: req.params.bookId
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['username', 'id',],
      }],
      order:[['updatedAt', 'DESC']],
      
    })
    .then((reviews) => {
      if (reviews.length === 0) {
        return res.status(200).json({
          reviews,
          message: 'Be the first to post a review...'
        })
      }
      return res.status(200).json({
        message: 'Reviews retrieved successfully',
        reviews
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'error sending your request',
        error: error.message
      });
    })
  }

  /**
   * @returns {object} updated revie object
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * @memberof ReviewController
   */
  static editBookReview(req, res) {
    Review.update(
      req.body,
      {
        where: { id: req.params.reviewId },
        returning: true,
      }
    ).then((editedReview) => {
      res.status(200).json({
        review: editedReview[1][0],
        message: 'Your review has been updated'
      });
    }).catch((error) => {
      return res.status(500).send(error);
    })
  }
}

