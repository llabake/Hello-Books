import {
  isAlphanumeric,
  isEmail,
  isNumeric,
  isStrong,
  isYear,
  trimObject,
  isDefined,
  isNotEmpty
} from './utils';

/**
 *
 *
 * @export
 * 
 * @class InputValidator
 */
export default class InputValidator {
  /**
   *
   *
   * @static
   * 
   * @param {any} data
   * 
   * @returns {object} errors and isValid status
   * 
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
    const errors = {};
    fields.forEach((field) => {
      errors[field] = []
      if (data[field] === undefined || data[field] === '') {
        if (field === 'confirmPassword') {
          errors[field].push('Please confirm your password')
        } else {
          errors[field].push(`${field} is required`);
        }
      } else if (field !== 'confirmPassword' && data[field].trim() === '') {
        errors[field].push(`${field} can not be blank`)
      }
    });
    const { username, email, password, userExist } = trimObject(data)

    if (username && username.length < 5) {
      errors.username.push('Username too short Must be at least 5 characters');
    }
    if (username && !isAlphanumeric(username)) {
      errors.username.push('Username can only contain alphabets and numbers');
    }
    if (email && !isEmail(email)) {
      errors.email.push('Please enter a valid email');
    }
    if (password && password.length < 8) {
      errors.password.push('Password should contain atleast 8 characters');
    }
    if (password && !isStrong(password)) {
      errors.password.push(`Password should contain atleast 1 uppercase,
        1 lowercase letter, 1 number and a special character`);
    }
    if (password && data.confirmPassword
      && password !== data.confirmPassword) {
      errors.confirmPassword.push('Ensure passwords match');
    }
    if (userExist.username) {
      errors.username.push(userExist.username)
    }
    if (userExist.email) {
      errors.email.push(userExist.email)
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
 * 
 * @param {any} data
 * 
 * @memberof InputValidator
 * 
 * @returns {object} errors and isValid status
 */
  static signIn(data) {
    const errors = {};
    const requiredFields = ['username', 'password'];
    requiredFields.forEach((field) => {
      errors[field] = []
      if (!isDefined(data[field])
        || !isNotEmpty(data[field])) {
        errors[field].push(`${field} is required`);
      }
    });
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
 * 
 * @param {any} data
 * 
 * @returns {object} errors and isValid status
 * 
 * @memberof InputValidator
 */
  static addBook(data) {
    const errors = {};
    const requiredFields = [
      'title', 'author', 'publishedYear',
      'isbn', 'quantity', 'description',
      'aboutAuthor'
    ];

    requiredFields.forEach((field) => {
      errors[field] = []
      if (!isDefined(data[field]) || !isNotEmpty(data[field])) {
        errors[field].push(`${field} is required`);
      }
    });
    if (data.publishedYear && !isNumeric(data.publishedYear)) {
      errors.publishedYear.push('PublishedYear can only be a number')
    }
    if (data.publishedYear && !isYear(data.publishedYear)) {
      errors.publishedYear.
        push('PublishedYear is not a valid year, expect date in range 1000-9999')
    }
    if (data.isbn && !isNumeric(data.isbn)) {
      errors.isbn.push('isbn can only be a number');
    }

    if (data.quantity && !isNumeric(data.quantity) || data.quantity <= 0) {
      errors.quantity.push('Quantity must be a number and greater than zero');
    }
    if (data.isbnExist) {
      errors.isbn.push(data.isbnExist)
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
 * 
 * @param {any} data
 * 
 * @returns {status} errors and isValid status
 * 
 * @memberof InputValidator
 */
  static addReview(data) {
    const errors = {};
    const requiredFields = ['content', 'caption'];
    requiredFields.forEach((field) => {
      errors[field] = [];
      if (!isDefined(data[field]) || !isNotEmpty(data[field])) {
        errors[field].push(`${field} is required`);
      }
    });
    if (data.content && data.content.length < 10) {
      errors.content.push('Review content is too short');
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
 * 
 * @param {any} data
 * 
 * @returns {object} errors and isValid status
 * 
 * @memberof InputValidator
 */
  static modifyBook(data) {
    return this.addBook(data)
  }

  /**
   * 
   * 
   * @static
   * 
   * @param {any} data
   *  
   * @returns {object} errors and isValid status
   * 
   * @memberof InputValidator
   */
  static modifyReview(data) {
    return this.addReview(data)
  }
  /**
   * 
   * 
   * @static
   * 
   * @param {any} data
   * 
   * @returns {object} error and isValid
   * 
   * @memberof InputValidator
   */
  static updateProfile(data) {
    const errors = {};
    const requiredFields = ['firstName', 'lastName'];
    requiredFields.forEach((field) => {
      errors[field] = [];
      if (!isDefined(data[field]) || !isNotEmpty(data[field])) {
        errors[field].push(`${field} is required`);
      }
    });

    let isValid = true;
    Object.keys(errors)
      .map(key => errors[key]).forEach((error) => {
        if (error.length) {
          isValid = false;
        }
      });
    return { errors, isValid };
  }
}
