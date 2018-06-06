import { isAlphanumeric, isEmail, isNumeric } from './utils';

const minLength = 3;
const maxLength = 25;
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
   * 
   * @param {any} args
   * @returns {status} errors array
   * 
   * @memberof InputValidator
   */
  static signUp(args) {
    const errors = {};
    let isValid = true
    const fields = [ 'username', 'lastName', 'firstName', 'email', 'password'];
    if (typeof args.username === 'undefined'||
      typeof args.email === 'undefined' ||
      typeof args.password === 'undefined' ||
      typeof args.firstName === 'undefined' ||
      typeof args.lastName === 'undefined'
      ) {
        fields.forEach((field) => {
          if(Object.keys(args).indexOf(field) === -1) {
            errors[field] = `${field} is required`;
          }
        })
      } else {
        const { username, email, firstName, lastName } = args;
        let { password } = args;
        if (username.length) {
          if(isAlphanumeric(username)) {
            if(username.length < minLength || username.length > maxLength){
              errors.username = 'Minimum of 3 character and Maximum of 25 characters required'
            }
          } else {
            errors.username = 'Username can only contain alphabets and numbers'
          }
        } else {
          errors.username = 'Username can not be blank'
        }
    
        if (email.length) {
          if(!isEmail(email)) {
            errors.email = 'Please enter a valid email'
          }
        } else {
            errors.email = 'Email can not be blank'
        }
          password = password.toString()
        
        if (password.length) {
          if(password.length < minLength || password.length > maxLength){
            errors.password = 'Minimum of 3 character and Maximum of 25 characters required'
          } 
        } else {
          errors.password = 'Password can not be blank'
        }
        if (firstName.length) {
          if(firstName.length < minLength || firstName.length > maxLength){
            errors.firstName = 'Minimum of 3 character and Maximum of 25 characters required'
          } 
        } else {
          errors.firstName = 'Firstname can not be blank'
        }
    
        if (lastName.length) {
          if(lastName.length < minLength || lastName.length > maxLength){
            errors.lastName = 'Minimum of 3 character and Maximum of 25 characters required'
          } 
        } else {
          errors.lastName = 'Lastname can not be blank'
        }
      }
    Object.keys(errors).map(key => errors[key]).forEach((error)=> {
      if(error) {
        isValid = false;
      }
    });
    return { isValid, errors, args }
  }
  /**
 *
 *
 * @static
 * 
 * @param {any} args
 * @memberof InputValidator
 * 
 * @returns {status} error array
 */
  static signIn(args) {
    const errors = {};
    let isValid = true;
    if (typeof args.username !== 'undefined'||
    typeof args.password !== 'undefined' 
    ) {
      const username = args.username;
      const password = args.password.toString();
      if (username.length) {
        if(isAlphanumeric(username)) {
          if(username.length < minLength || username.length > maxLength){
            errors.username = 'Minimum of 3 character and Maximum of 25 characters required'
          }
        } else {
          errors.username = 'Username can only contain alphabets and numbers'
        }
      } else {
        errors.username = 'Username can not be blank'
      }
      if (password.length) {
        if(password.length < minLength || password.length > maxLength){
          errors.password = 'Minimum of 3 character and Maximum of 25 characters required'
        } 
      } else {
        errors.password = 'Password can not be blank'
      }
      
    } else {
      ["username", "password"].forEach((field) => {
        if(Object.keys(args).indexOf(field) === -1) {
          errors[field] = `${field} is required`;
        }
      })
    }
    Object.keys(errors).map(key => errors[key]).forEach((error)=> {
      if(error) {
        isValid = false;
      }
    });
    return { isValid, errors }
  }
  /**
 *
 *
 * @static
 * 
 * @param {any} args
 * @returns {status} error array
 * 
 * @memberof InputValidator
 */
  static addBook(args) {
    const errors = {};
    let isValid = true;
    const requiredFields = [
      'title', 'author', 'publishedYear',
      'isbn', 'quantity', 'description', 'aboutAuthor'
    ];
    if (typeof args.title === 'undefined'||
    typeof args.author === 'undefined' ||
    typeof args.publishedYear === 'undefined' ||
    typeof args.isbn === 'undefined' ||
    typeof args.quantity === 'undefined' ||
    typeof args.description === 'undefined' ||
    typeof args.aboutAuthor === 'undefined'
    ) {
      requiredFields.forEach((field) => {
        if(Object.keys(args).indexOf(field) === -1) {
          errors[field] = `${field} is required`;
        }
      });
    } else {
      const { title, author, description, aboutAuthor } = args;
      let { publishedYear, isbn, quantity, image } = args;
      if(!title.length) {
        errors.title = 'Title cannot be blank'
      }
      if(!author.length) {
        errors.author = 'Author cannot be blank'
      }
      if(!description.length) {
        errors.description = 'Description cannot be blank'
      }
      if(!aboutAuthor.length) {
        errors.aboutAuthor = 'AboutAuthor cannot be blank'
      }
      if(image && typeof image !== 'string') {
        errors.image = 'Image should be a string'
      }

      publishedYear = publishedYear.toString();
      if(publishedYear.length) {
        if(isNumeric(publishedYear)) {
          const presentYear = new Date().getFullYear();
          if(publishedYear > presentYear) {
            errors.publishedYear = 'PublishedYear can not be a future year'
          } 
        } else {
          errors.publishedYear = 'PublishedYear can only be a number'
          }
      } else {
        errors.publishedYear = 'PublishedYear can not be blank'
      }

      if(isbn.toString().length) {
        if(isNumeric(isbn)) {
          if(isbn.toString().length !== 13) {
            errors.isbn = 'Provide a valid 13-digit ISBN'
          } 
        } else {
          errors.isbn = 'ISBN can only be a number'
        }
      } else {
        errors.isbn = 'ISBN can not be blank'
      }

      if(quantity.toString().length) {
        if(isNumeric(quantity)) {
          if(quantity <= 0) {
            errors.quantity = 'Quantity must be a number greater than zero'
          } 
        } else {
          errors.quantity = 'Quantity can only be a number'
          }
      } else {
        errors.quantity = 'Quantity can not be blank'
      }
    }
    Object.keys(errors).map(key => errors[key]).forEach((error)=> {
      if(error) {
        isValid = false;
      }
    });
    return { isValid, errors }
  }
  /**
 *
 *
 * @static
 * 
 * @param {any} args
 * @returns {status} error array
 * 
 * @memberof InputValidator
 */
  static addReview(args) {
    const errors = {};
    let isValid = true;
    if (typeof args.content === 'undefined' ||
    typeof args.caption === 'undefined' 
    ) {
      ['content', 'caption'].forEach((field) => {
        if(Object.keys(args).indexOf(field) === -1) {
          errors[field] = `${field} is required`;
        }
      })
    } else {
      const content = args.content;
      const caption = args.caption;
      if (content.length) {
        if(content.length < 10 || content.length > 1000){
          errors.content = 'Minimum of 10 character and Maximum of 1000 characters required'
        }
      } else {
        errors.content = 'Content can not be blank'
      }

      if (caption.length) {
        if(caption.length < minLength || caption.length > maxLength) {
          errors.caption = 'Minimum of 3 character and Maximum of 25 characters required'
        }
      } else {
        errors.caption = 'Caption can not be blank'
        
      }
    }
    Object.keys(errors).map(key => errors[key]).forEach((error)=> {
      if(error) {
        isValid = false;
      }
    });
    return { isValid, errors }
  }
  /**
 *
 *
 * @static
 * 
 * @param {any} args
 * @returns {status} error array
 * 
 * @memberof InputValidator
 */
  static modifyBook(args) {
    const errors = {};
    let isValid = true;
    const { title, author, description, aboutAuthor } = args;
    let { publishedYear, isbn, quantity, image } = args;
    if(title && !title.length) {
      errors.title = 'Title cannot be blank'
    }
    if(author && !author.length) {
      errors.author = 'Author cannot be blank'
    }
    if(description && !description.length) {
      errors.description = 'Description cannot be blank'
    }
    if(aboutAuthor && !aboutAuthor.length) {
      errors.aboutAuthor = 'AboutAuthor cannot be blank'
    }
    if(image && image && typeof image !== 'string') {
      errors.image = 'Image should be a string'
    }
    if(publishedYear) {
      publishedYear = publishedYear.toString();
      if(publishedYear.length) {
        if(isNumeric(publishedYear)) {
          const presentYear = new Date().getFullYear();
          if(publishedYear > presentYear) {
            errors.publishedYear = 'PublishedYear can not be a future year'
          } 
        } else {
          errors.publishedYear = 'PublishedYear can only be a number'
          }
      } else {
        errors.publishedYear = 'PublishedYear can not be blank'
      }
    }
    if(isbn) {
      if(isbn.toString().length) {
        if(isNumeric(isbn)) {
          if(isbn.toString().length !== 13) {
            errors.isbn = 'Provide a valid 13-digit ISBN'
          } 
        } else {
          errors.isbn = 'ISBN can only be a number'
          }
      } else {
        errors.isbn = 'ISBN can not be blank'
      }
    }
    if(quantity) {
      if(quantity.toString().length) {
        if(isNumeric(quantity)) {
          if(quantity <= 0) {
            errors.quantity = 'Quantity must be a number greater than zero'
          } 
        } else {
          errors.quantity = 'Quantity can only be a number'
          }
      } else {
        errors.quantity = 'Quantity can not be blank'
      }
    }
    const notManipulate = ['upVotes', 'downVotes', 'borrowCount'];
    notManipulate.forEach((field) => {
      if (args[field] !== undefined) {
          errors[field] = `${field} field can not be updated`
      }
    });
    Object.keys(errors).map(key => errors[key]).forEach((error)=> {
      if(error) {
        isValid = false;
      }
    });
    return { isValid, errors }
  }

  /**
   *
   *
   * @static
   * 
   * @param {any} args
   * @returns {status} error array
   * 
   * @memberof InputValidator
   */
  static editProfile(args) {
    const errors = {};
    let isValid = true;
    const notManipulate = ['role'];
    const { lastName, image, firstName } = args;
    if(firstName && !firstName.length) {
      errors.firstName = 'First name cannot be blank'
    }
    if(lastName && !lastName.length) {
      errors.lastName = 'Last name cannot be blank'
    }
    if(image && typeof image !== 'string') {
      errors.image = 'Image should be a string'
    }
    notManipulate.forEach((field) => {
      if (args[field] !== undefined) {
          errors[field] = `${field} field can not be updated`
      }
    });
    Object.keys(errors).map(key => errors[key]).forEach((error)=> {
      if(error) {
        isValid = false;
      }
    });
    return { isValid, errors }
  }

  /**
   * 
   * 
   * @static
   * 
   * @param {any} args
   * 
   * @returns {Boolean}  validation response status
   * @memberof InputValidator
   */
  static editReview(args) {
    const errors = {};
    let isValid = true;
      const content = args.content;
      const caption = args.caption;
      if (content && content.length) {
        if(content.length < 10 || content.length > 1000){
          errors.content = 'Minimum of 10 character and Maximum of 1000 characters required'
        }
      } else {
        errors.content = 'Content can not be blank'
      }

      if (caption.length) {
        if(caption.length < minLength || caption.length > maxLength) {
          errors.caption = 'Minimum of 3 character and Maximum of 25 characters required'
        }
      } else {
        errors.caption = 'Caption can not be blank'
      }
    Object.keys(errors).map(key => errors[key]).forEach((error)=> {
      if(error) {
        isValid = false;
      }
    });
    return { isValid, errors }
  }

  /**
   * 
   * 
   * @static
   * 
   * @param {any} args 
   * @returns {Object} validation response
   * 
   * @memberof InputValidator
   */
  static requestBook(args) {
    const errors = {};
    let isValid = true;
    if (typeof args.title !== 'undefined'||
    typeof args.author !== 'undefined' 
    ) {
      const title = args.title;
      const author = args.author;
      if (!title.length) {
        errors.title = 'Title can not be blank'
      }

      if (!author.length) {
        errors.author = 'Author can not be blank'
      }
      
    } else {
      ['title', 'author'].forEach((field) => {
        if(Object.keys(args).indexOf(field) === -1) {
          errors[field] = `${field} is required`;
        }
      })
    }
    Object.keys(errors).map(key => errors[key]).forEach((error)=> {
      if(error) {
        isValid = false;
      }
    });
    return { isValid, errors }
  }
}
