import { getObjectId, dummyData } from '../helpers/modelHelpers';
/**
 *
 *
 * @export
 * @class Review
 */
export default class Review {
/**
 * Creates an instance of Review.
 * @param {any} args
 * @memberof Review
 */
  constructor(args) {
    const fields = ['bookId', 'userId', 'text'];
    const errors = [];
    const dataType = { bookId: 'number', userId: 'number', text: 'string' };

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
    this.id = getObjectId('reviews');
  }
  /**
   *
   *
   * @memberof Review
   * @returns {any} review object
   */
  create() {
    dummyData.reviews[this.id] = this;
  }
  /**
 *
 *
 * @static
 * @returns {any} all review object
 * @memberof Review
 */
  static getAll() {
    const returnedReviews = [];
    Object.keys(dummyData.reviews)
      .map(key => dummyData.reviews[key]).map((review) => {
        delete review.deleted;
        return review;
      });
    return returnedReviews;
  }
  /**
 *
 *
 * @static
 * @param {any} id
 * @returns {any} a single review
 * @memberof Review
 */
  static getById(id) {
    const review = dummyData.reviews[id];
    if (review) {
      delete review.deleted;
      return review;
    }
    throw `review with id: ${id} not found`;
  }
  /**
 *
 *
 * @param {any} args
 * @memberof Review
 * @returns {any} updated review
 */
  update(args) {
    const updateFields = ['text'];
    updateFields.forEach((field) => {
      this[field] = args[field] || this[field];
    });
  }
}

