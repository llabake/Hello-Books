import { getObjectId, dummyData } from '../helpers/modelHelpers';

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
};





  