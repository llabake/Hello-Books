import models from '../../models';

const { BorrowBook, Book, User } = models;

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
   * @param {any} req
   * @param {any} res
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
              message: `borrow request has been made on ${book.title} and it is being processed`,
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
   * @param {any} req
   * @param {any} res
   * @returns {any} response containing a message
   * @description Return a book
   * @memberof BookController
   */
  static returnBook(req, res) {
    BorrowBook.findOne({
      where: {
        userId: req.user.id,
        bookId: req.params.bookId,
        returnStatus: {
          $and: [''],
        }
      }
    })
      .then((borrowedBook) => {
        if (!borrowedBook) {
          res.status(404).json({
            message: 'borrowedBook match not found'
          });
        } else if (borrowedBook.borrowStatus !== 'accepted') {
          res.status(200).json({
            message: 'This book borrow request has not been accepted'
          });
        } else {
          borrowedBook.update({
            returnStatus: 'pending'
          })
            .then(() => {
              borrowedBook.reload().then((reloadedupdatedborrowedBook) => {
                res.status(200).json({
                  message: 'Book return request is pending approval by Administrator',
                  borrowedBook: reloadedupdatedborrowedBook
                });
              });
            })
            .catch((error) => {
              res.status(500).json({
                message: error.message
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message
        });
      });
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {any} response containing a message
   * @description Admin accept borrow Book
   * @memberof BookController
   */
  static acceptBorrowBook(req, res) {
    const BORROW_DURATION = 14 * 24 * 60 * 60 * 1000;
    Book.findOne({
      where: {
        id: req.params.bookId,
      }
    })
      .then((book) => {
        BorrowBook.findOne({
          where: {
            userId: req.params.userId,
            bookId: req.params.bookId,
            borrowStatus: {
              $and: ['pending'],
            }
          }
        })
          .then((borrowedBook) => {
            if (!borrowedBook) {
              res.status(404).json({
                message: 'borrowedBook match not found'
              });
            } else if (borrowedBook.borrowStatus === 'accepted') {
              res.status(200).json({
                message: 'This book borrow request has been accepted'
              });
            } else if (!book.isAvailable()) {
              res.status(400).json({
                message: `${book.title} presently unavailable for borrow`
              });
            } else {
              borrowedBook.update({
                expectedReturnDate: new Date(Date.now() + BORROW_DURATION),
                borrowDate: new Date(),
                borrowStatus: 'accepted'
              })
                .then(() => {
                  borrowedBook.reload().then((reloadedupdatedborrowedBook) => {
                    book.decrement('quantity');
                    book.increment('borrowCount');
                    res.status(200).json({
                      message: 'successfully accepted borrow request',
                      borrowedBook: reloadedupdatedborrowedBook
                    });
                  });
                })
                .catch((error) => {
                  res.status(500).json({
                    message: error.message
                  });
                });
            }
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message
        });
      });
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {any} response containing a message
   * @description Admin accepts return book
   * @memberof BookController
   */
  static acceptReturnBook(req, res) {
    BorrowBook.findOne({
      where: {
        userId: req.params.userId,
        bookId: req.params.bookId,
        returnStatus: {
          $and: ['pending'],
        }
      }
    })
      .then((borrowedBook) => {
        if (!borrowedBook) {
          res.status(404).json({
            message: 'borrowedBook match not found'
          });
        } else if (borrowedBook.returnStatus === 'accepted') {
          res.status(200).json({
            message: 'This book return request has been accepted'
          });
        } else {
          borrowedBook.update({
            actualReturnDate: new Date(),
            returnStatus: 'accepted'
          })
            .then(() => {
              borrowedBook.reload().then((reloadedupdatedborrowedBook) => {
                Book.findOne({
                  where: {
                    id: req.params.bookId,
                  }
                })
                  .then((book) => {
                    book.increment('quantity');
                    res.status(200).json({
                      message: 'successfully accepted return request',
                      borrowedBook: reloadedupdatedborrowedBook
                    });
                  })
                  .catch((error) => {
                    res.status(500).json({
                      message: error.message
                    });
                  });
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message
        });
      });
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {array} A list of all Borrowed Book
 * @memberof BorrowedBookController
 */
  static getAllBorrowedBook(req, res) {
    const options = {};
    const { borrowStatus, returnStatus } = req.query;
    options.where = {};
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
          message: 'returnStatus can either be accepted, pending'
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
    BorrowBook.findAll(options)
      .then((borrowedBooks) => {
        if (!borrowedBooks.length) {
          let message = 'No borrowed books record found';
          if (returnStatus || borrowStatus) {
            message = 'No book matches your search. Try some other combinations';
          }
          res.status(200).json({
            message,
            borrowedBooks
          });
        }
        res.status(200).json({ message: 'Borrowed books retrieved successfully', borrowedBooks});
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
   * @param {any} req 
   * @param {any} res 
   * @memberof BorrowedBookController
   * @returns {array} a list of user borrowedBook history
   */
  static getUserBorrowedBooks(req, res) {
    const userId = req.user.id;
    BorrowBook.findAll({
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
    })
    .then((borrowedBooks) => {
      if (borrowedBooks.length === 0) {
        return res.status(200).json({
          message: 'Start borrowing books now',
          borrowedBooks
        })
      }
      return res.status(200).json({
        message: 'BorrowedBooks history fetched successfully',
        borrowedBooks
      })
    })
    .catch(error => res.status(400).json({
      message: 'error sending your request',
      error
    }));
  }
}
