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

const MINIMUM_NAME_LENGTH = 3;
const MAXIMUM_NAME_LENGTH = 25;
const MINIMUM_NAME_MESSAGE = `Minimum of ${MINIMUM_NAME_LENGTH} characters allowed`;
const MAXIMUM_NAME_MESSAGE = `Maximum of ${MAXIMUM_NAME_LENGTH} characters allowed`;

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
      if (!isDefined(data[field]) || !isNotEmpty(data[field])) {
        if (field === 'confirmPassword') {
          errors[field].push('Please confirm your password')
        } else {
          errors[field].push(`${field} is required`);
        }
      } else {
        const {
          firstName,
          lastName,
          username,
          email,
          password,
          confirmPassword
        } = trimObject(data);

        if (field === 'firstName') {
          if (firstName.length < 3) {
            errors[field].push(MINIMUM_NAME_MESSAGE)
          } else if (firstName.length > 25) {
            errors[field].push(MAXIMUM_NAME_MESSAGE)
          }
        }
        if (field === 'lastName') {
          if (lastName.length < 3) {
            errors[field].push(MINIMUM_NAME_MESSAGE)
          } else if (lastName.length > 25) {
            errors[field].push(MAXIMUM_NAME_MESSAGE)
          }
        }

        if (field === 'username') {
          if (username.length >= 5) {
            if (!isAlphanumeric(username)) {
              errors[field].push('Username can only contain alphabets and numbers');
            }
          } else {
            errors[field].push('Username too short Must be at least 5 characters');
          }
        }

        if (field === 'email' && !isEmail(email)) {
          errors[field].push('Please enter a valid email');
        }

        if (field === 'password') {
          if (password.length >= 8) {
            if (!isStrong(password)) {
              errors[field].push(`Password should contain atleast 1 uppercase,
              1 lowercase letter, 1 number and a special character`);
            }
          } else {
            errors[field].push('Password should contain atleast 8 characters');
          }
        }

        if (field === 'confirmPassword' && password !== confirmPassword) {
          errors[field].push('Ensure passwords match');
        }
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
      } else {
        let { publishedYear, isbn, quantity } = data;
        if (field === 'publishedYear') {
          publishedYear = publishedYear.toString().trim()
          if (publishedYear.length && isNumeric(publishedYear)) {
            if (isYear(publishedYear)) {
              const presentYear = new Date().getFullYear();
              if (publishedYear > presentYear) {
                errors.publishedYear
                  .push('PublishedYear can not be a future year');
              }
            } else {
              errors.publishedYear.
                push('PublishedYear is not a valid year, expect date in range 1000-9999');
            }
          } else {
            errors.publishedYear.push('PublishedYear can only be a number');
          }
        }

        if (field === 'isbn') {
          isbn = isbn.toString().trim()
          if (isbn.length && isNumeric(isbn)) {
            if (isbn.toString().length !== 13) {
              errors.isbn.push('Provide a valid 13-digit ISBN');
            }
          } else {
            errors.isbn.push('ISBN can only be a number');
          }
        }

        if (field === 'quantity') {
          if (!isNumeric(quantity) || quantity <= 0) {
            errors.quantity.push('Quantity must be a number and greater than zero');
          }
        }
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
      } else {
        const { content, caption } = trimObject(data);
        if( field === 'content') {
          if (content.length < 10) {
            errors.content.push('Review content is too short');
          } else if (content.length > 1000) {
            errors.content.push('Content should be a maximum of 1000 characters');
          }
        }

        if( field === 'caption') {
          if (caption.length < 3) {
            errors.caption.push(MINIMUM_NAME_MESSAGE)
          } else if (caption.length > 700) {
            errors.caption.push(MAXIMUM_NAME_MESSAGE)
          }
        }
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
