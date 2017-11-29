import models from '../../models';

const { BorrowBook, Book, } = models;
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
    BorrowBook.findOne({
      where: {
        userId,
        bookId,
      },
      include: [{
        model: Book,
        as: 'book',
        required: true,
        attribute: ['id', 'title']
      }],
    })
      .then((borrowedBook) => {
        if (borrowedBook && borrowedBook.borrowStatus === 'pending') {
          return res.status(409).json({
            message: `You have made a request earlier on ${borrowedBook.book.title}, it is pending approval by Administrator`
          });
        }
        BorrowBook.findOne({
          where: {
            userId,
            expectedReturnDate: {
              $lt: new Date(),
            }

          },
          include: [{
            model: Book,
            as: 'book',
            required: true,
            attribute: ['id', 'title']
          }],
        })
          .then((overDueBook) => {
            if (overDueBook) {
              res.status(403).json({
                message: 'You have to return the book with you before you can make a new request',
                book: overDueBook.book.title
              });
            } else {
              Book.findOne({
                where: {
                  id: bookId,
                }
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
                      res.status(201).json({
                        message: `borrow request has been made on ${book.title} and it is being processed`,
                        borrowedBook: createdBorrowedBook
                      });
                    });
                })
                .catch((error) => {
                  res.status(500).json({
                    message: error.message,
                  });
                });
            }
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message,
            });
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
            });
        }
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
    BorrowBook.findOne({
      where: {
        userId: req.params.userId,
        bookId: req.params.bookId,
      }
    })
      .then((borrowedBook) => {
        if (!borrowedBook) {
          res.status(404).json({
            message: 'borrowedBook match not found'
          });
        } else if (borrowedBook.borrowStatus !== 'pending') {
          res.status(200).json({
            message: 'This book borrow request has been accepted'
          });
        } else {
          borrowedBook.update({
            expectedReturnDate: new Date(Date.now() + (14 * 24 * 60 * 60 * 1000)),
            borrowDate: new Date(),
            borrowStatus: 'accepted'
          })
            .then(() => {
              borrowedBook.reload().then((reloadedupdatedborrowedBook) => {
                Book.findOne({
                  where: {
                    id: req.params.bookId,
                  }
                })
                  .then((book) => {
                    book.decrement('quantity');
                    book.increment('borrowCount');
                    res.status(200).json({
                      message: 'successfully accepted borrow request',
                      borrowedBook: reloadedupdatedborrowedBook
                    });
                  });
              });
            });
        }
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
                  });
              });
            });
        }
      });
  }
}
