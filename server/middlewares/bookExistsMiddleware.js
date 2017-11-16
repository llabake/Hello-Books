// import { dummyData } from '../dummy/helpers/modelHelpers';


// const bookExists = (req, res, next) => {
//   const { bookId } = req.params;
//   if (Object.prototype.hasOwnProperty.call(dummyData.books, bookId)) {
//     next();
//   } else {
//     return res.status(404).json({
//       message: 'Book not found. Please check the id'
//     });
//   }
// };

// export default bookExists;

import models from '../models';

const { Book } = models;
/**
 *
 *
 * @export
 * @class BookExist
 */
export default class BookExists {
  /**
   * @description Middleware to verify if book exist
   *
   * @static
   * @param {Object} req request Object
   * @param {Object} res response Object
   * @param {Function} next callback Function
   * @returns {Object} response containing book existence
   * @memberof BookExist
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

