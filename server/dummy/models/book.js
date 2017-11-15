import { getObjectId, dummyData } from '../helpers/modelHelpers';

const addReviewToBook = (book) => {
  book.reviews = [];
  Object.keys(dummyData.reviews)
    .map(key => dummyData.reviews[key]).forEach((review) => {
      if (review.bookId === book.id) {
        delete review.deleted;
        book.reviews.push(review);
      }
    });
};
/**
 *
 *
 * @export
 * @class Book
 */
export default class Book {
/**
 * Creates an instance of Book.
 * @param {any} args
 * @memberof Book
 * @returns {any} book object
 */
  constructor(args) {
    const fields = ['title', 'isbn', 'author', 'quantity', 'publishedYear'];
    const errors = [];
    const dataType = {
      title: 'string',
      isbn: 'number',
      author: 'string',
      quantity: 'number',
      publishedYear: 'number'
    };

    // check if required fields are present
    fields.forEach((field) => {
      if (args[field] === undefined || args[field] === '') {
        errors.push({ path: field, message: `${field} is required` });
      } else if (typeof (args[field]) !== dataType[field]) {
        errors.push({
          path: field,
          message: `${field} must be a ${dataType[field]}`
        });
      }
    });

    Object.keys(args).forEach((field) => {
      if (fields.indexOf(field) === -1) {
        errors.push({ message: `invalid field: ${field} found in args` });
      } else {
        this[field] = args[field];
      }
    });

    if (this.quantity <= 0) {
      errors.push({
        path: 'quantity',
        message: 'quantity can not be less than or equal zero'
      });
    }

    if (errors.length) {
      throw errors;
    }
    this.deleted = false;
    this.upvotes = 0;
    this.downvotes = 0;
    this.id = getObjectId('books');
  }
  /**
 *
 *
 * @memberof Book
 * @returns {any} book
 */
  create() {
    dummyData.books[this.id] = this;
  }
  /**
 *
 *
 * @static
 * @param {any} id
 * @returns {any} a single book
 * @memberof Book
 */
  static getById(id) {
    const book = dummyData.books[id];
    if (book) {
      addReviewToBook(book);
      delete book.deleted;
      return book;
    }
    throw `Book with id: ${id} not found`;
  }
  /**
 *
 *
 * @static
 * @param {any} id
 * @param {any} updateArgs
 * @returns {any} updated book
 * @memberof Book
 */
  static updateById(id, updateArgs) {
    const book = this.getById(id);
    const updateFields = ['title', 'author', 'isbn',
      'publishedYear', 'quantity'];
    // check the quantity update is not zero
    updateFields.forEach((field) => {
      book[field] = updateArgs[field] || book[field];
    });
    return book;
  }
  /**
 *
 *
 * @static
 * @returns {any} all books
 * @memberof Book
 */
  static getAll() {
    const returnedBooks = [];
    Object.keys(dummyData.books)
      .map(key => dummyData.books[key]).forEach((book) => {
        addReviewToBook(book);
        delete book.deleted;
        returnedBooks.push(book);
      });
    return returnedBooks;
  }
  /**
 *
 *
 * @static
 * @param {any} bookId
 * @returns {any} book status
 * @memberof Book
 */
  static isAvailable(bookId) {
    const book = this.getById(bookId);
    return book.quantity > 0;
  }
}

