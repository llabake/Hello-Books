import models from '../../models';
import InputValidator from '../../helpers/inputValidator';
import { sortBooksByTopFavorites } from '../../helpers/utils'

const {
 Book, Review, User, Favorite, sequelize, Sequelize
} = models;

/**
 *
 *
 */
class BookController {
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {any} response containing a book object
   * @description Adds new book
   * @memberof BookController
   */
  static addBook(req, res) {
    const { errors, isValid } = InputValidator.addBook(req.body);
    if (!isValid) {
      res.status(400).json({ errors });
    } else {
      Book.create({
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
        isbn: parseInt(req.body.isbn, 10),
        quantity: parseInt(req.body.quantity, 10),
        description: req.body.description,
        image: req.body.image,
        aboutAuthor: req.body.aboutAuthor
      })
        .then((book) => {
          res.status(201).json({
            message: `Book with title: ${book.title} has been added`,
            book
          });
        })
        .catch((error) => {
          if (error.name === 'SequelizeUniqueConstraintError') {
            const field = Object.keys(error.fields)[0];
            return res.status(409).json({
              message: `Book with ${field}: ${req.body[field]} already exist`
            });
          }
          return res.status(400).send(error);
        });
    }
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @description Gets a single book from the library
   * @returns {any} response contaning a single book
   * @memberof BookController
   */
  static getSingleBook(req, res) {
    Book.findOne({
      where: {
        id: req.params.bookId
      },
      attributes: [
        'id', 'title', 'description', 'image', 'author',
        'upVotes', 'downVotes', 'borrowCount',
        'quantity', 'aboutAuthor'
      ],
      include: [{
        model: Review,
        as: 'reviews',
        attributes: ['id', 'content', 'createdAt', 'caption','updatedAt'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['username', 'id'],
        }],
      }, {
        model: Favorite,
        as: 'favorited',
        attributes: ['id', 'createdAt'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['username', 'id'],
        }],
      }],
    })
      .then((book) => {
        res.status(200).json({
          book,
        });
      })
      .catch(error => res.status(500).json({
        message: 'error sending your request',
        error
      }));
  }

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {any} response containing a modified book detail
   * @description Modifies a book in the library
   * @memberof BookController
   */
  static modifyBook(req, res) {
    const { errors, isValid } = InputValidator.modifyBook(req.body);
    if (!isValid) {
      res.status(400).json({ errors });
    } else {
      Book.update(
        req.body,
        {
          where: { id: req.params.bookId },
          returning: true,
        }
      ).then((updatedBook) => {
        res.status(200).json({
          book: updatedBook[1][0],
          message: 'Your book has been updated'
        });
      }).catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          const field = Object.keys(error.fields)[0];
          return res.status(409).json({
            message: `Operation disallowed, Book with ${field}: ${req.body[field]} already exist`
          });
        }
        return res.status(500).send(error);
      });
    }
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {next} next
   * @returns {any} response containing all the books in the library in an array
   * @description Gets all books in the library
   * @memberof BookController
   */
  static getAllBooks(req, res, next) {
    if (req.query.sort || req.query.search) return next();
    Book.findAll({
      include: [{
        model: Review,
        as: 'reviews',
        attributes: ['id', 'content', 'createdAt'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['username', 'id'],
        }],
      }, {
        model: Favorite,
        as: 'favorited',
        attributes: ['id', 'createdAt'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['username', 'id'],
        }],
      }],
    })
      .then((books) => {
        if (books.length === 0) {
          return res.status(200).json({
            message: 'Books are unavailable now, do check back later',
            books
          });
        }
        return res.status(200).json({
          message: 'Books retrieved successfully',
          books
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'error sending your request', error });
      });
  }
  /**
   *@description Gets books with the most upvotes
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} response containing top 10 books in the library in an array
   * @memberof BookController
   */
  static getBooksByUpvotes(req, res, next) {
    if (req.query.sort === undefined) return next();
    if (req.query.order !== 'descending') {
      res.status(400).json({
        message: 'order can only be descending'
      });
    }
    if (req.query.sort !== 'upvotes') {
      res.status(400).json({
        message: 'sort can only be by upvotes'
      });
    }
    const options = {};
    options.order = [['upVotes', 'DESC']];
    options.limit = 10;
    options.attributes = [
      'id', 'title', 'description', 'image',
      'upVotes', 'downVotes', 'borrowCount'
    ];
    options.include = [{
      model: Review,
      as: 'reviews',
      attributes: ['id', 'content', 'createdAt'],
      include: [{
        model: User,
        as: 'user',
        attributes: ['username', 'id'],
      }],
    }, {
      model: Favorite,
      as: 'favorited',
      attributes: ['id', 'createdAt'],
      include: [{
        model: User,
        as: 'user',
        attributes: ['username', 'id'],
      }],
    }];
    Book.findAll(options)
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({
        message: 'error sending your request',
        error
      }));
  }
  /**
 *
 *@description Gets books by search word
 * @static
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} response containing books that match the search
 * @memberof BookController
 */
  static getBooksBySearch(req, res) {
    const options = {};
    const searchQuery = req.query.search;
    options.limit = 10;
    options.attributes = [
      'id', 'title', 'description', 'author', 'image',
      'upVotes', 'downVotes', 'borrowCount', 'quantity'
    ];
    options.include = [{
      model: Review,
      as: 'reviews',
      attributes: ['id', 'content', 'createdAt'],
      include: [{
        model: User,
        as: 'user',
        attributes: ['username', 'id'],
      }],
    }, {
      model: Favorite,
      as: 'favorited',
      attributes: ['id', 'createdAt'],
      include: [{
        model: User,
        as: 'user',
        attributes: ['username', 'id'],
      }],
    }];
    options.where = {
      $or: [
        { author: { $like: `%${searchQuery}%` } },
        { description: { $like: `%${searchQuery}%` } },
        { title: { $like: `%${searchQuery}%` } }
      ],
    };
    Book.findAll(options)
      .then((books) => {
        if (!books.length) {
          res.status(200).json({
            message: 'No book matches your search. Try some other combinations',
            books
          });
        }
        res.status(200).json({
          message: 'Books retrieved successfully',
          books
        });
      })
      .catch(error => res.status(400).json({
        message: 'error sending your request',
        error
      }));
  }
  
  /**
   * 
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * @returns {Object} response containing validity of book
   * @memberof BookController
   */
  static checkIsbnExist(req, res) {
    const { isbn, } = req.query;
    if (!isbn) {
      return res.status(400).json({
        message: 'isbn expected in query'
      })
    }
    Book.findOne({
      where: {
        isbn: isbn
      }
    }).then((book) => {
      if (!book) {
        return res.status(200).json({
          message: 'ISBN is valid'
        })
      } else {
        return res.status(400).json({
          message: `Book with isbn: ${book.isbn} already exist`
        })
      }

    })
    .catch((error) => {
      return res.status(400).json({ error })
    })
  }

  /**
   * 
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * @memberof BookController
   * @returns {Object} response message
   */
  static deleteBook(req, res) {
    Book.findById(req.params.bookId)
      .then((book) => {
        book.destroy()
        .then(() => {
          return res.status(200).json({
            message: 'Book deleted successfully',
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            message: error.message
          })
        })
      })
      .catch((error) => {
        return res.status(500).json({
          error,
          message: 'error sending your request'
        })
      })
  }

  static getPopularBooks(req, res) {
    const options = {};
    options.limit = 6;
    options.order = [['borrowCount', 'DESC']];
    options.attributes = [
      'id', 'title', 'description', 'author', 'image',
      'upVotes', 'downVotes', 'borrowCount', 'quantity'
    ];
    options.include = [{
      model: Review,
      as: 'reviews',
      attributes: ['id', 'content', 'createdAt'],
      include: [{
        model: User,
        as: 'user',
        attributes: ['username', 'id'],
      }],
    }, {
      model: Favorite,
      as: 'favorited',
      attributes: ['id', 'createdAt'],
      include: [{
        model: User,
        as: 'user',
        attributes: ['username', 'id'],
      }],
    }];
    Book.findAll(options)
      .then((books) => {
        if (!books.length) {
          res.status(200).json({
            message: 'No books found',
            books
          });
        }
        res.status(200).json({
          message: 'Popular books retrieved successfully',
          books
        });
      })
      .catch(error => res.status(400).json({
        message: 'error sending your request',
        error
      }));
  }

  static getTopFavoritedBooks(req, res) {

  const options = {};
  options.limit = 9;
  options.attributes = [
    'id', 'title', 'image'];
  options.include = [{
    model: Favorite,
    as: 'favorited',
    attributes: ['id']
  }];
  Book.findAll(options)
    .then((books) => {
      if (!books.length) {
        res.status(200).json({
          message: 'No books found',
          books
        });
      }
      res.status(200).json({
        message: 'Top favorited books retrieved successfully',
        books: sortBooksByTopFavorites(books)
      });
    })
    .catch(error => res.status(400).json({
      message: 'error sending your request',
      error
    }));
  }


}
export default BookController;