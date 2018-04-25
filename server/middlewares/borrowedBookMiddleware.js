import models from '../models';

const { BorrowBook, Book } = models;
const includeBook = [{
  model: Book,
  as: 'book',
  required: true,
  attribute: ['id', 'title']
}]

/**
 *
 *
 * @class BorrowedBookMiddleware
 */
export default class BorrowedBookMiddleware {
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {Object} response about if book borrow already exist
 * @memberof BorrowedBookMiddleware
 */
  static borrowedBookExist(req, res, next) {
    const userId = req.user.id;
    const { bookId } = req.params;
    BorrowBook.findOne({
      where: {
        userId,
        bookId,
        returnStatus: {
          $or: ['', 'pending'],
        }
      },
      include: includeBook,
    })
      .then((borrowedBook) => {
        if (borrowedBook) {
          if (borrowedBook.borrowStatus === 'pending') {
            return res.status(409).json({
              message: `You have made a request earlier on ${borrowedBook.book.title}, it is pending approval by Administrator`
            });
          } else if (borrowedBook.returnStatus === 'pending') {
            return res.status(409).json({
              message: 'Your request to return this book is pending approval by the Admin, hence you can not borrow this book at the moment'
            });
          } else if (borrowedBook.returnStatus === '') {
            return res.status(409).json({
              message: `You have not attempted to return this ${borrowedBook.book.title}`
            });
          } next();
        }

        next();
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
          error
        });
      });
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {Object} response stating if user as any books due for return
 * @memberof BorrowedBookMiddleware
 */
  static bookReturnOverDueExist(req, res, next) {
    const userId = req.user.id;

    BorrowBook.findOne({
      where: {
        userId,
        expectedReturnDate: {
          $lt: new Date(),
        }

      },
      include: includeBook,
    })
      .then((overDueBook) => {
        if (overDueBook) {
          res.status(400).json({
            message: 'You have to return the book with you before you can make a new request',
            book: overDueBook.book.title
          });
        }
        next();
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
          error
        });
      });
  }
}

