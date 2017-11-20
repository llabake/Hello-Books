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
        if (borrowedBook && borrowedBook.borrowedStatus === 'pending') {
          return res.status(409).json({
            message: `You have made a request earlier on ${borrowedBook.book.title}, its pending approval by Administrator`
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
                        message: `borrow request has been made on ${book.title} and its being processed`,
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
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);
    try {
      const borrowedBook = BorrowedBook.getByUserIdAndBookId(userId, bookId);
      if (borrowedBook.borrowedStatus === 'accepted') {
        borrowedBook.returnStatus = 'pending';
        return res.status(200).json({ borrowedBook });
      }
      return res.status(400).json({
        message: 'Request to borrow is still pending'
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
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
            message: 'This book borrowed request as been accepted'
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
                    book.increment('borrowCount');
                    book.decrement('quantity');
                  });
                res.status(200).json({
                  message: 'successfully accepted borrow request',
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
       * @description Admin accepts return book
       * @memberof BookController
       */
  static acceptReturnBook(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);
    try {
      const book = Book.getById(bookId);
      const borrowedBook = BorrowedBook.getByUserIdAndBookId(userId, bookId);
      if (borrowedBook.returnStatus === 'pending') {
        borrowedBook.returnStatus = 'accepted';
        book.quantity += 1;
        return res.status(200).json({ borrowedBook, book });
      }
      return res.status(400).json({
        message: 'Request to return book has not been made'
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
