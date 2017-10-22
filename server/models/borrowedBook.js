import { getObjectId, dummyData } from '../helpers/modelHelpers';

export default class BorrowedBook {
  constructor(args) {
    const fields = ['bookId', 'userId'];
    const errors = [];
    const dataType = { bookId: 'number', userId:'number' };
    
    // check if required fields are present
    fields.forEach(field => {
      if (!args[field]) {
        errors.push({ path: field, message: `${field} is required` });
      } else if (typeof(args[field]) !== dataType[field]) {
        errors.push({ path: field, message: `${field} must be a ${dataType[field]}` });
      };
    });
    
    for (let key in args) {
      if (fields.indexOf(key) == -1) {
        errors.push({ message: `invalid field: ${key} found in args` });
      } else {
        this[key] = args[key];        
      };
    };

    if (errors.length) {
      throw errors;
    };
    this.deleted = 'false';
    this.borrowedStatus = 'pending';
    this.id = getObjectId('borrowedBooks');
  };
    
  create () {
    dummyData.borrowedBooks[this.id] = this;
  };

  static getAll () {
    const borrowedBooks = [];
    const allBorrowedBooks = dummyData.borrowedBooks;
    for (let id in allBorrowedBooks) {
      const borrowedBook = allReviews[id];
      delete borrowedBook.deleted;
      borrowedBooks.push(borrowedBook);
    }
    return borrowedBooks;
  };
  
  static getById (id) {
    const borrowedBook = dummyData.borrowedBooks[id];
    if (borrowedBook) {
      delete borrowedBook.deleted;
      return borrowedBook;
    } else {
      throw `borrowedBook with id: ${id} not found`;
    }
  };

  static existsByUserIdAndBookId(userId, bookId) {
    let borrowedBookExist = false;
    const borrowedBooks = dummyData.borrowedBooks;
    for (let id in borrowedBooks) {
        if (borrowedBooks[id].userid === userId &&
            borrowedBooks[id].bookId === bookId) {
            borrowedBookExist = true;
            break;    
        }
    }
    return borrowedBookExist;
  }

  update (args) {
    const updateFields = [ 'borrowedStatus', 'returnedStatus'];    
    updateFields.forEach(field => {
        this[field] = args [field] || this[field];
    });
  }
}

