import models from '../../models';
import InputValidator from '../../helpers/inputValidator';

const { Review } = models;
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
        bookId: req.params.bookId,
        userId: req.user.id
      })
        .then((review) => {
          res.status(201).json({
            message: 'Review has been posted',
            review
          });
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
}

