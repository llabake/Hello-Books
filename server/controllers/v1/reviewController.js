// change it back to models/review
// import Review from '../../dummy/models/review';
import models from '../../models';
// change it back to models/book
// import Book from '../../dummy/models/book';
// change it back to models/borrowedBook
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
            content: review.content
          });
        })
        .catch(error => res.status(500).json({
          message: 'error sending your request',
          error
        }));
    }
  }
}

