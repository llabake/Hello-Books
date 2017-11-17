import models from '../../models';
// change it back to models/book
// import Book from '../../dummy/models/book';
// change it back to models/borrowedBook
import BorrowedBook from '../../dummy/models/borrowedBook';
import InputValidator from '../../helpers/inputValidator';

const { Book, Review, User } = models;

/**
 *
 *
 */
class BookController {
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {any} response containing a book object
   * @description Adds new book
   * @memberof BookController
   */
  static addBook(req, res) {
    const { errors, isValid } = InputValidator.addBook(req.body);
    if (!isValid) {
      res.status(400).json({ errors });
    } else {
      Book.create({
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
        isbn: parseInt(req.body.isbn, 10),
        quantity: parseInt(req.body.quantity, 10),
        description: req.body.description,
        image: req.body.image,
      })
        .then((book) => {
          res.status(200).json({
            message: `Book with title: ${book.title} has been added`,
            book
          });
        })
        .catch((error) => {
          if (error.name === 'SequelizeUniqueConstraintError') {
            const field = Object.keys(error.fields)[0];
            return res.status(409).json({
              messsage: `Book with ${field}: ${req.body[field]} already exist`
            });
          }
          return res.status(400).send(error);
        });
    }
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @description Gets a single book from the library
   * @returns {any} response contaning a single book
   * @memberof BookController
   */
  static getSingleBook(req, res) {
    Book.findOne({
      where: {
        id: req.params.bookId
      },
      attributes: [
        'id', 'title', 'description',
        'upVotes', 'downVotes', 'borrowCount'
      ],
      include: [{
        model: Review,
        as: 'reviews',
        attributes: ['id', 'content', 'createdAt'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['username', 'id'],
        }],
      }],
    })
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            message: `No Book exist with id: ${req.params.bookId}`
          });
        }
        res.status(200).json({ book });
      })
      .catch(error => res.status(500).json({
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
   * @returns {any} repsonse containing a modified book detail
   * @description Modifies a book in the library
   * @memberof BookController
   */
  static modifyBook(req, res) {
    Book.findById(req.params.bookId)
      .then((book) => {
        book.update({
          title: req.body.title || book.title,
          author: req.body.author || book.author,
          publishedYear: req.body.publishedYear || book.publishedYear,
          quantity: req.body.quantity || book.quantity,
          description: req.body.description || book.description,
          image: req.body.image || book.image,
          readingList: req.body.readingList || book.readingList
        })
          .then((updatedBook) => {
            res.status(200)
              .json({
                book: updatedBook,
                message: 'Your book has been updated',
              });
          })
          .catch(error => res.status(500).json({
            message: 'error sending your request',
            error
          }));
      });
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {any} repsonse containing all the books in the library in an array
   * @description Gets all books in the library
   * @memberof BookController
   */
  static getAllBooks(req, res) {
    Book.findAll({
      attributes: [
        'id', 'title', 'description',
        'upVotes', 'downVotes', 'borrowCount'
      ],
      include: [{
        model: Review,
        as: 'reviews',
        attributes: ['id', 'content', 'createdAt'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['username', 'id'],
        }],
      }],
    })
      .then((books) => {
        if (books.length === 0) {
          return res.status(200).json({
            message: 'Books are unavailable now, do check back later'
          });
        }
        return res.status(200).json({
          message: 'Books retrieved successfully',
          books
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'error sending your request', error });
      });
  }
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
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);
    try {
      if (!Book.isAvailable(bookId)) {
        return res.status(400).json({
          message: 'book currently not available for borrow'
        });
      }
      if (BorrowedBook.existsByUserIdAndBookId(userId, bookId)) {
        return res.status(409).json({
          message: 'You have made this request earlier!'
        });
      }
      const borrowedBook = new BorrowedBook({
        userId,
        bookId
      });
      borrowedBook.create();
      return res.status(201).json({
        message: 'Your request has been made and its being processed',
        borrowedBook
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
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);
    try {
      const borrowedBook = BorrowedBook.getByUserIdAndBookId(userId, bookId);
      const book = Book.getById(bookId);
      book.quantity -= 1;
      borrowedBook.borrowedStatus = 'accepted';
      return res.status(200).json({ borrowedBook, book });
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
export default BookController;
