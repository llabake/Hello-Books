import { getObjectId, dummyData } from '../helpers/modelHelpers';

export default class BorrowedBook {
  constructor(args) {
    const fields = ['bookId', 'userId'];
    const errors = [];
    const dataType = { bookId: 'number', userId: 'number' };

    // check if required fields are present
    fields.forEach((field) => {
      if (!args[field]) {
        errors.push({ path: field, message: `${field} is required` });
      } else if (typeof (args[field]) !== dataType[field]) {
        errors.push({ path: field, message: `${field} must be a ${dataType[field]}` });
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

  create() {
    dummyData.borrowedBooks[this.id] = this;
  }

  static getAll() {
    const borrowedBooks = [];
    const allBorrowedBooks = dummyData.borrowedBooks;
    for (const id in allBorrowedBooks) {
      const borrowedBook = allReviews[id];
      delete borrowedBook.deleted;
      borrowedBooks.push(borrowedBook);
    }
    return borrowedBooks;
  }

  static getById(id) {
    const borrowedBook = dummyData.borrowedBooks[id];
    if (borrowedBook) {
      delete borrowedBook.deleted;
      return borrowedBook;
    }
    throw `borrowedBook with id: ${id} not found`;
  }

  static existsByUserIdAndBookId(userId, bookId) {
    const borrowedBooks = dummyData.borrowedBooks;
    for (const id in borrowedBooks) {
      if (borrowedBooks[id].userId === userId &&
          borrowedBooks[id].bookId === bookId) {
        return true;
      }
    }
    return false;
  }

  static getByUserIdAndBookId(userId, bookId) {
    let borrowedBook;
    const borrowedBooks = dummyData.borrowedBooks;
    for (const id in borrowedBooks) {
      if (borrowedBooks[id].userId === userId &&
            borrowedBooks[id].bookId === bookId) {
        borrowedBook = borrowedBooks[id];
        break;
      }
    }
    if (borrowedBook) {
      return borrowedBook;
    }
    throw 'borrowedBook match request not found';
  }
}

