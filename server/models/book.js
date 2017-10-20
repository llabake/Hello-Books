import { getObjectId, dummyData } from '../helpers/modelHelpers';

const addReviewToBook = (book) => {
  book.reviews = [];
  const allReviews = dummyData.reviews;
  for (let reviewId in allReviews) {
    if (allReviews[reviewId].bookId === book.id) {
      book.reviews.push(allReviews[reviewId]);
    }
  }
};

export default class Book {
  constructor(args) {
    const fields = ['title', 'isbn', 'author', 'quantity', 'publishedYear'];
    const errors = [];
    const dataType = {title:'string', isbn:'number', author: 'string', quantity: 'number', publishedYear:'number'};
    
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
    this.id = getObjectId('books');
  };
    
  create () {
    dummyData.books[this.id] = this;
  };
 
  static getById (id) {
    const book = dummyData.books[id];
    if (book) {
      addReviewToBook(book);      
      delete book.deleted;
      return book;
    } else {
      throw `Book with id: ${id} not found`
    }
  };

  static updateById(id, updateArgs) {
    const book = this.getById(id);
    const updateFields = ['title', 'author', 'isbn', 
    'publishedYear', 'quantity'];    
    updateFields.forEach(field => {
      book[field] = updateArgs[field] || book[field];
    });
    return book
  }

  static getAll () {
    const returnedBooks = [];
    const allBooks = dummyData.books;
    for (let id in allBooks) {
      const book = allBooks[id];
      addReviewToBook(book);
      delete book.deleted;
      returnedBooks.push(book);
    }
    return returnedBooks;
  }
}



  