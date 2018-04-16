import { isAlphanumeric, isEmail, isNumeric, isStrong, isYear } from './utils';
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

    if (data.username && data.username.length <= 6) {
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
    const errors = {};
    const requiredFields = ['username', 'password'];
    requiredFields.forEach((field) => {
      errors[field] = []
      if (data[field] === undefined || data[field] === '') {
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
 * @param {any} data
 * @returns {status} error array
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
      if (data[field] === undefined || data[field] === '') {
        errors[field].push(`${field} is required`); 
      }
    });
    if (data.publishedYear && !isNumeric(data.publishedYear)) {
      errors.publishedYear.push('PublishedYear can only be a number')
    }
    if (data.publishedYear && !isYear(data.publishedYear)) {
      errors.publishedYear.push('PublishedYear is not a valid year, expect date in range 1000-9999')
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

    errors.image = []
    if (data.uploadedImage) {
      
      const reader = new FileReader();
      //Read the contents of Image File.
      reader.readAsDataURL(data.uploadedImage);
      reader.onload = (e) => {
        //Initiate the JavaScript Image object.
        const image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;
        
        const minimumImageWidth = 50;
        const minimumImageHeight = 50;

        const maximumImageWidth = 200;
        const maximumImageHeight = 200;

        //Validate the File Height and Width.
        image.onload = () => {
          console.log('inside onload')
          const imageHeight = this.height;
          const imageWidth = this.width;

          if (!(minimumImageWidth <= imageWidth && maximumImageWidth >= imageWidth)) {
            errors.image.push(`Image width must be in range 
              ${minimumImageWidth}px - ${maximumImageWidth}px`)
          }

          if (!(minimumImageHeight <= imageHeight && maximumImageHeight >= imageHeight)) {
            errors.image.push(`Image height must be in range 
              ${minimumImageHeight}px - ${maximumImageHeight}px`)
          }
        }
      }
    } else {
      errors.image.push('Image is required')      
    }

   
    
    let isValid = true;
    Object.keys(errors)
    .map(key => errors[key]).forEach((error) => {
      if (error.length) {
        isValid = false;
      }
    });
    console.log('inside afhfshfdhj')
    
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
    const errors = {};
    const requiredFields = ['content', 'caption'];
    requiredFields.forEach((field) => {
      errors[field] = [];
      if (data[field] === undefined || data[field] === '') {
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
 * @param {any} data
 * @returns {status} error array
 * @memberof InputValidator
 */
  static modifyBook(data) {
    return this.addBook(data)
  }

  /**
   * 
   * 
   * @static
   * @param {any} data 
   * @returns {status} error array
   * @memberof InputValidator
   */
  static modifyReview(data) {
    return this.addReview(data)
  }

  static updateProfile(data) {
    const errors = {};
    const requiredFields = ['firstName', 'lastName'];
    requiredFields.forEach((field) => {
      errors[field] = [];
      if (data[field] === undefined || data[field] === '') {
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
