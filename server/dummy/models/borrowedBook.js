import { getObjectId, dummyData } from '../helpers/modelHelpers';
/**
 *
 *
 * @export
 * @class BorrowedBook
 */
export default class BorrowedBook {
  /**
   * Creates an instance of BorrowedBook.
   * @param {any} args
   * @memberof BorrowedBook
   */
  constructor(args) {
    const fields = ['bookId', 'userId'];
    const errors = [];
    const dataType = { bookId: 'number', userId: 'number' };
    // check if required fields are present
    fields.forEach((field) => {
      if (!args[field]) {
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

    if (errors.length) {
      throw errors;
    }
    this.deleted = false;
    this.borrowedStatus = 'pending';
    this.id = getObjectId('borrowedBooks');
  }
  /**
 *
 *
 * @memberof BorrowedBook
 * @returns {any} borrowed Book
 */
  create() {
    dummyData.borrowedBooks[this.id] = this;
  }
  /**
 *
 *
 * @static
 * @returns {any} all Borrowed Book
 * @memberof BorrowedBook
 */
  static getAll() {
    const borrowedBooks = [];
    Object.keys(dummyData.borrowedBooks)
      .map(key => dummyData.borrowedBooks[key]).forEach((borrowedBook) => {
        delete borrowedBook.deleted;
        borrowedBooks.push(borrowedBook);
      });
    return borrowedBooks;
  }
  /**
 *
 *
 * @static
 * @param {any} id
 * @returns {any} a borrowed Book
 * @memberof BorrowedBook
 */
  static getById(id) {
    const borrowedBook = dummyData.borrowedBooks[id];
    if (borrowedBook) {
      delete borrowedBook.deleted;
      return borrowedBook;
    }
    throw `borrowedBook with id: ${id} not found`;
  }
  /**
 *
 *
 * @static
 * @param {any} userId
 * @param {any} bookId
 * @returns {any} status of request
 * @memberof BorrowedBook
 */
  static existsByUserIdAndBookId(userId, bookId) {
    try {
      if (this.getByUserIdAndBookId(userId, bookId)) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  /**
 *
 *
 * @static
 * @param {any} userId
 * @param {any} bookId
 * @returns {any} book borroed by user
 * @memberof BorrowedBook
 */
  static getByUserIdAndBookId(userId, bookId) {
    const borrowedBookByUser = Object.keys(dummyData.borrowedBooks)
      .map(key => dummyData.borrowedBooks[key])
      .filter(borrowedBook => borrowedBook.userId === userId
        && borrowedBook.bookId === bookId)[0];
    if (borrowedBookByUser) {
      return borrowedBookByUser;
    }
    throw 'borrowedBook match request not found';
  }
}

