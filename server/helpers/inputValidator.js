import { isAlphanumeric, isEmail, isNumeric } from './utils';
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
   * @param {any} args
   * @returns {status} errors array
   * @memberof InputValidator
   */
  static signUp(args) {
    const fields = [
      'username',
      'lastName',
      'firstName',
      'email', 'password',
      'confirmpassword'
    ];
    const errors = [];
    fields.forEach((field) => {
      if (args[field] === undefined || args[field] === '') {
        errors.push({ path: field, message: `${field} is required` });
      }
    });
    if (args.password !== args.confirmpassword) {
      errors.push({
        path: 'password',
        message: 'Please ensure the passwords match'
      });
    }
    if (!isEmail(args.email)) {
      errors.push({
        path: 'email',
        message: 'Please enter a valid email'
      });
    }
    if (!isAlphanumeric(args.username)) {
      errors.push({
        path: 'username',
        message: 'Username can only contain alphabets and numbers'
      });
    }
    const isValid = errors.length === 0;
    return { errors, isValid };
  }
  /**
 *
 *
 * @static
 * @param {any} args
 * @memberof InputValidator
 * @returns {status} error array
 */
  static signIn(args) {
    const errors = [];
    const requiredFields = ['username', 'password'];
    requiredFields.forEach((field) => {
      if (args[field] === undefined || args[field] === '') {
        errors.push({ path: field, message: `${field} is required` });
      }
    });
    const isValid = errors.length === 0;
    return { errors, isValid };
  }
  /**
 *
 *
 * @static
 * @param {any} args
 * @returns {status} error array
 * @memberof InputValidator
 */
  static bookFields(args) {
    const errors = [];
    const requiredFields = [
      'title',
      'author',
      'publishedYear',
      'ISBN',
      'quantity',
      'description'
    ];
    requiredFields.forEach((field) => {
      if (args[field] === undefined || args[field] === '') {
        errors.push({ path: field, message: `${field} is required` });
      }
    });
    if (!isNumeric(args.publishedYear)) {
      errors.push({
        path: 'publishedYear',
        message: 'PublishedYear can only be a number'
      });
    }
    if (!isNumeric(args.ISBN)) {
      errors.push({
        path: 'ISBN',
        message: 'ISBN can only be a number'
      });
    }
    if (!isNumeric(args.quantity) || args.quanitity <= 0) {
      errors.push({
        path: 'quantity',
        message: 'Quantity can only be a number and must be greater than zero'
      });
    }
    const isValid = errors.length === 0;
    return { errors, isValid };
  }
}
