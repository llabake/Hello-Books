import models from '../../models';
import { formatPagination, paginateBookResult } from '../../helpers/utils';

const { BorrowBook, Book, User } = models;

const fetchBook = async (bookModel, bookId) => {
  let book =  Book.findOne({ where: { id: bookId } })
  return book;
}
const findReturnRequest = async (BorrowBookModel, userId, bookId, returnStatus) => {
  let borrowedBook = BorrowBook.findOne({
    where: {
      userId,
      bookId,
      returnStatus
    }
  })
  return borrowedBook;
}

const findPendingBorrowRequest = async (BorrowBookModel, userId, bookId, borrowStatus) => {
  let borrowedBook = BorrowBook.findOne({
    where: {
      userId,
      bookId,
      borrowStatus
    }
  })
  return borrowedBook;
}

const findPendingReturnRequest = async (BorrowBookModel, userId, bookId, returnStatus) => {
  let borrowedBook = BorrowBook.findOne({
    where: {
      userId,
      bookId,
      returnStatus
    }
  })
  return borrowedBook;
}
/**
 *
 *
 * @export
 * @class BorrowedBookController
 */
export default class BorrowedBookController {
  /**
   *
   *
   * @static
   * 
   * @param {any} req
   * @param {any} res
   * 
   * @returns {any} response containing a message
   * @description Borrow a book
   * @memberof BookController
   */
  static borrowBook(req, res) {
    const userId = req.user.id;
    const { bookId } = req.params;
    Book.findOne({
      where: {
        id: bookId,
      },
      include: [{
        model: BorrowBook,
        as: 'book',
      }],
    })
      .then((book) => {
        if (!book.isAvailable()) {
          res.status(400).json({
            message: `${book.title} presently unavailable for borrow`
          });
        }
        BorrowBook.create({
          userId,
          bookId,
        })
          .then((createdBorrowedBook) => {
            book.reload().then((reloadedBook) => {
              res.status(201).json({
              message: `Borrow request has been made on ${book.title} and it is being processed`,
              borrowedBook: createdBorrowedBook,
              book: reloadedBook
            });
            })
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  }
  /**
   *
   *
   * @static
   * 
   * @param {any} req
   * @param {any} res
   * 
   * @returns {any} response containing a message
   * @description Return a book
   * @memberof BookController
   */
  static async returnBook(req, res) {
    let borrowedBook
    try {
      borrowedBook = findReturnRequest(BorrowBook, req.user.id, req.params.bookId, { $and: ['']} )
      if (!borrowedBook) {
        return res.status(404).json({
          message: 'borrowedBook match not found'
        });
      } else if (borrowedBook.borrowStatus !== 'accepted') {
        res.status(200).json({
          message: 'This book borrow request has not been accepted'
        });
      } else {
        borrowedBook = await borrowedBook.update({ returnStatus: 'pending' })
        const reloadedupdatedborrowedBook = await borrowedBook.reload();
        return res.status(200).json({
          message: 'Book return request is pending approval by Administrator',
          borrowedBook: reloadedupdatedborrowedBook
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
  /**
   *
   *
   * @static
   * 
   * @param {any} req
   * @param {any} res
   * 
   * @returns {any} response containing a message
   * @description Admin accept borrow Book
   * @memberof BookController
   */
  static async acceptBorrowBook(req, res) {
    const BORROW_DURATION = 14 * 24 * 60 * 60 * 1000;
    let book;
    let borrowedBook;
    try {
      book = await fetchBook(Book, req.params.bookId)
      if(book) {
        borrowedBook = await findPendingBorrowRequest(BorrowBook,
          req.params.userId, req.params.bookId, {$and: ['pending']} )     
        if (!borrowedBook) {
          return res.status(404).json({
            message: 'borrowedBook match not found',
          });
        } else if (borrowedBook.borrowStatus === 'accepted') {
          return res.status(200).json({
            message: 'This book borrow request has been accepted'
          });
        } else if (!book.isAvailable()) {
          return res.status(400).json({
            message: `${book.title} presently unavailable for borrow`
          });
        } else {
        borrowedBook = await borrowedBook.update({
          expectedReturnDate: new Date(Date.now() + BORROW_DURATION),
          borrowDate: new Date(),
          borrowStatus: 'accepted'})
        }
        const reloadedupdatedborrowedBook = await borrowedBook.reload();
        book = await book.decrement('quantity');
        book = await book.increment('borrowCount');
        return res.status(200).json({
          message: 'Successfully accepted borrow request',
          borrowedBook: reloadedupdatedborrowedBook
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  /**
   *
   *
   * @static
   * 
   * @param {any} req
   * @param {any} res
   * 
   * @returns {any} response containing a message
   * @description Admin accepts return book
   * @memberof BookController
   */
  static async acceptReturnBook(req, res) {
    let borrowedBook;
    let book;
    try {
      borrowedBook = await findPendingReturnRequest(BorrowBook,
        req.params.userId, req.params.bookId, {$and: ['pending']} )
        if(!borrowedBook) {
          res.status(404).json({
            message: 'borrowedBook match not found'
          });
        } else if (borrowedBook.returnStatus === 'accepted') {
          res.status(200).json({
            message: 'This book return request has been accepted'
          });
        } else {
          borrowedBook = await borrowedBook.update({
            actualReturnDate: new Date(),
            returnStatus: 'accepted' })
          const reloadedupdatedborrowedBook = await borrowedBook.reload();
          book = await fetchBook(Book, req.params.bookId)
          if(book) {
            book = await book.increment('quantity');
            return res.status(200).json({
              message: 'successfully accepted return request',
              borrowedBook: reloadedupdatedborrowedBook
            });
          }
        }
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
  /**
 *
 *
 * @static
 * 
 * @param {any} req
 * @param {any} res
 * 
 * @returns {array} A list of all Borrowed Book
 * @memberof BorrowedBookController
 */
  static getAllBorrowedBook(req, res) {
    const { limit, page, offset } = formatPagination(req)
    const options = {};
    options.limit = limit;
    options.offset = offset;
    const { borrowStatus, returnStatus } = req.query;
    options.where = {};
    if (!borrowStatus && !returnStatus) {
      return res.status(400).json({
        message: 'borrowStatus or returnStatus expected in query'
      })
    }
    if (borrowStatus) {
      if (borrowStatus === 'accepted' || borrowStatus === 'pending') {
        options.where.borrowStatus = borrowStatus;
      } else {
        return res.status(400).json({
          message: 'borrowStatus can either be accepted or pending'
        });
      }
    }
    if (returnStatus) {
      if (returnStatus === 'accepted' || returnStatus === 'pending') {
        options.where.returnStatus = returnStatus;
      } else {
        return res.status(400).json({
          message: 'returnStatus can either be accepted or pending'
        });
      }
    }
    options.attributes = { exclude: ['createdAt', 'updatedAt'] };
    options.include = [
      {
        model: User,
        as: 'user',
        attributes: ['username', 'id'],
      },
      {
        model: Book,
        as: 'book',
        attributes: ['id', 'title', 'author', 'quantity', 'borrowCount']
      }
    ];
    BorrowBook.findAndCountAll(options)
      .then((result) => {
        if (!result.length) {
          return paginateBookResult({ req, res, result, limit, page })
        }
        return paginateBookResult({ req, res, result, limit, page })
      })
      .catch(error => res.status(400).json({
        message: 'error sending your request',
        error
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
   * @memberof BorrowedBookController
   * @returns {array} a list of user borrowedBook history
   */
  static getUserBorrowedBooks(req, res) {
    const userId = req.user.id;
    const { limit, page, offset } = formatPagination(req)
    BorrowBook.findAndCountAll({
      where: {
        userId,
        borrowStatus: {
          $or: ['pending', 'accepted']
        }
      },
      include: [{
        model: Book,
        as: 'book',
        attribute: ['id', 'title', 'author']
      }],
      order: [['updatedAt', 'DESC']],
      limit,
      offset
    })
    .then((result) => {
      if (!result.length) {
        return paginateBookResult({ req, res, result, limit, page })
      }
      return paginateBookResult({ req, res, result, limit, page })
    })
    .catch(error => res.status(400).json({
      message: 'error sending your request',
      error
    }));
  }
}
