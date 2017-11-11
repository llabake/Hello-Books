// change it back to models/book
import Book from '../../dummy/models/book';
// change it back to models/borrowedBook
import BorrowedBook from '../../dummy/models/borrowedBook';

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
    try {
      const book = new Book(req.body);
      book.create();
      return res.status(201).json({
        message: `Book with title: ${book.title} has been added`, book
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
   * @description Gets a single book from the library
   * @returns {any} response contaning a single book
   * @memberof BookController
   */
  static getSingleBook(req, res) {
    try {
      const book = Book.getById(req.params.bookId);
      return res.status(200).json({ book });
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
 * @returns {any} repsonse containing a modified book detail
 * @description Modifies a book in the library
 * @memberof BookController
 */
  static modifyBook(req, res) {
    try {
      const book = Book.updateById(req.params.bookId, req.body);
      return res.status(200).json({ book });
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
 * @returns {any} repsonse containing all the books in the library in an array
 * @description Gets all books in the library
 * @memberof BookController
 */
  static getAllBooks(req, res) {
    const books = Book.getAll();
    if (req.query.sort === 'upvotes' && req.query.order === 'desc') {
      books.sort((book1, book2) => book2.upvotes - book1.upvotes);
    }
    return res.status(200).json({ books });
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
