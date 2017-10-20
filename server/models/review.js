import { getObjectId, dummyData } from '../helpers/modelHelpers';

export default class Review {
  constructor(args) {
    const fields = ['bookId', 'userId', 'text'];
    const errors = [];
    const dataType = { bookId: 'number', userId:'number', text: 'string' };
    
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
    this.id = getObjectId('reviews');
  };
    
  create () {
    dummyData.reviews[this.id] = this;
  };

  static getAll () {
    const returnedReviews = [];
    const allReviews = dummyData.reviews;
    for (let id in allReviews) {
      const review = allReviews[id];
      delete review.deleted;
      returnedReviews.push(review);
    }
    return returnedReviews;
  };
  
  static getById (id) {
    const review = dummyData.reviews[id];
    if (review) {
      delete review.deleted;
      return review;
    } else {
      throw `review with id: ${id} not found`;
    }
  };

  update (args) {
    const updateFields = [ 'text'];    
    updateFields.forEach(field => {
        this[field] = args [field] || this[field];
    });
  }
}

