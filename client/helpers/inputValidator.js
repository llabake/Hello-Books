import { isAlphanumeric, isEmail, isNumeric, isStrong } from './utils';
/**
 *
 *
 * @export
 * @class InputValidator
 */
export default class InputValidator {
  /**
   *
   *
   * @static
   * @param {any} data
   * @returns {status} errors array
   * @memberof InputValidator
   */
  static signUp(data) {
    const fields = [
      'firstName',
      'lastName',
      'username',
      'email',
      'password',
      'confirmPassword'
    ];
    const errors = {}

    fields.forEach((field) => {
      errors[field] = []
      if (data[field] === undefined || data[field] === '') {
        errors[field].push(`${field} is required`); 
      }
    });

    if (data.username && data.username.length < 6) {
      errors.username.push('Username too short Must be at least 5 characters');
    }
    if (data.username && !isAlphanumeric(data.username)) {
      errors.username.push('Username can only contain alphabets and numbers');
    }
    if (data.email && !isEmail(data.email)) {
      errors.email.push('Please enter a valid email');
    }
    if (data.password && data.password.length < 8) {
      errors.password.push('Password should contain atleast 8 characters');
    } 
    if (data.password && !isStrong(data.password)) {
      errors.password.push('Password should contain atleast 1 uppercase, 1 lowercase letter, 1 number and a special character');
    }
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      errors.confirmPassword.push('Ensure passwords match');
    }
    if (data.userExist.username) {
      errors.username.push(data.userExist.username)
    }
    if (data.userExist.email) {
      errors.email.push(data.userExist.email)
    }
    let isValid = true;
    Object.keys(errors)
    .map(key => errors[key]).forEach((error) => {
      if (error.length) {
        isValid = false;
      }
    });
    return { errors, isValid };
  }
  /**
 *
 *
 * @static
 * @param {any} data
 * @memberof InputValidator
 * @returns {status} error array
 */
  static signIn(data) {
    const errors = [];
    const requiredFields = ['username', 'password'];
    requiredFields.forEach((field) => {
      if (data[field] === undefined || data[field] === '') {
        errors.field({ path: field, message: `${field} is required` });
      }
    });
    const isValid = errors.length === 0;
    return { errors, isValid };
  }
  /**
 *
 *
 * @static
 * @param {any} data
 * @returns {status} error array
 * @memberof InputValidator
 */
  static addBook(data) {
    const errors = [];
    const requiredFields = [
      'title', 'author', 'publishedYear',
      'isbn', 'quantity', 'description'
    ];
    requiredFields.forEach((field) => {
      if (data[field] === undefined || data[field] === '') {
        errors.field({ path: field, message: `${field} is required` });
      }
    });
    if (!isNumeric(data.publishedYear)) {
      errors.field({
        path: 'publishedYear',
        message: 'PublishedYear can only be a number'
      });
    }
    if (!isNumeric(data.isbn)) {
      errors.field({ path: 'isbn', message: 'isbn can only be a number' });
    }

    if (!isNumeric(data.quantity) || data.quantity <= 0) {
      errors.field({
        path: 'quantity',
        message: 'Quantity must be a number and greater than zero'
      });
    }
    const isValid = errors.length === 0;
    return { errors, isValid };
  }
  /**
 *
 *
 * @static
 * @param {any} data
 * @returns {status} error array
 * @memberof InputValidator
 */
  static addReview(data) {
    const errors = [];
    const requiredFields = ['content'];
    requiredFields.forEach((field) => {
      if (data[field] === undefined || data[field] === '') {
        errors.field({ path: field, message: `${field} is required` });
      }
    });
    if (data.content && data.content.length < 10) {
      errors.field({ path: 'content', message: 'Review content is too short' });
    }
    const isValid = errors.length === 0;
    return { errors, isValid };
  }
  /**
 *
 *
 * @static
 * @param {any} data
 * @returns {status} error array
 * @memberof InputValidator
 */
  static modifyBook(data) {
    const errors = [];
    const notManipulate = ['upVotes', 'downVotes', 'borrowCount'];
    notManipulate.forEach((field) => {
      if (data[field] !== undefined) {
        errors.field({
          path: field,
          message: `${field} field can not be updated`
        });
      }
    });
    const isValid = errors.length === 0;
    return { errors, isValid };
  }
}
