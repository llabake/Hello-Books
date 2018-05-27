import models from '../../models';
import InputValidator from '../../helpers/inputValidator';
import { trimObject, formatPagination, paginateBookResult, } from '../../helpers/utils'

const {
 Book, Review, User, Favorite, BorrowBook, Vote
} = models;

const includeReviewAndFavorite = [{
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
}, {
  model: Vote,
  as: 'votes',
  attributes: ['id', 'voteType'],
  include: [{
    model: User,
    as: 'user',
    attributes: ['username', 'id'],
  }],
}]

const exclude = { exclude: ["createdAt", "updatedAt"] }


/**
 *
 *
 */
class BookController {
  /**
   *
   *
   * @static
   * 
   * @param {any} req
   * @param {any} res
   * 
   * @returns {any} response containing a book object
   * 
   * @description Adds new book
   * @memberof BookController
   */
  static async addBook(req, res) {
    const bookDetail = trimObject(req.body);
    const { errors, isValid } = InputValidator.addBook(bookDetail);
    if (!isValid) {
      return res.status(400).json({ errors });
    } else {
      try {
        const { title, author, publishedYear, isbn, quantity, description, image, aboutAuthor } = bookDetail;
        const book = await Book.create({ title, author, publishedYear, description, image,
          aboutAuthor, isbn: parseInt(isbn, 10), quantity: parseInt(quantity, 10),
        })
        if(book) {
          return res.status(201).json({
            message: `Book with title: ${book.title} has been added`,
            book
          });
        }
      } catch (error) {
          if (error.name === 'SequelizeUniqueConstraintError') {
            const field = Object.keys(error.fields)[0];
            return res.status(409).json({
              message: `Book with ${field}: ${req.body[field]} already exist`
            });
          }
          return res.status(400).send(error);
      }
    }
  }
  /**
   *
   *
   * @static
   * 
   * @param {any} req
   * @param {any} res
   * 
   * @description Gets a single book from the library
   * @returns {any} response contaning a single book
   * @memberof BookController
   */
  static async getSingleBook(req, res) {
    try {
      const book = await Book.findOne({
        where: {
          id: req.params.bookId
        },
        attributes: exclude,
        include: includeReviewAndFavorite,
      })
      if (book) {
        return res.status(200).json({
          book,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'error sending your request',
        error
      })
    }
  }

  /**
   *
   *
   * @static
   * 
   * @param {any} req
   * @param {any} res
   * 
   * @returns {any} response containing a modified book detail
   * @description Modifies a book in the library
   * @memberof BookController
   */
  static async modifyBook(req, res) {
    const bookToBeEditedDetail = trimObject(req.body)
    const { errors, isValid } = InputValidator.modifyBook(bookToBeEditedDetail);
    if (!isValid) {
      res.status(400).json({ errors });
    } else {
      try {
        const updatedBook = await Book.update(
          bookToBeEditedDetail,
          {
            where: { id: req.params.bookId },
            returning: true,
          }
        )
        if(updatedBook) {
          return res.status(200).json({
            book: updatedBook[1][0],
            message: 'Your book has been updated'
          });
        }
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          const field = Object.keys(error.fields)[0];
          return res.status(409).json({
            message: `Operation disallowed, Book with ${field}: ${req.body[field]} already exist`
          });
        }
        return res.status(500).send(error);
      }
    }
  }
  /**
   *
   *
   * @static
   * 
   * @param {Object} req
   * @param {Object} res
   * @param {next} next
   * 
   * @returns {any} response containing all the books in the library in an array
   * 
   * @description Gets all books in the library
   * @memberof BookController
   */
  static getAllBooks(req, res, next) {
    if (req.query.sort || req.query.search) return next();
    const { limit, page, offset } = formatPagination(req)
    Book.findAndCountAll({
      include: includeReviewAndFavorite,
      limit,
      offset
    })
      .then((result) => {
        return paginateBookResult({ req, res, result, limit, page })
      })
      .catch((error) => {
        return res.status(500).json({ message: 'error sending your request', error });
      });
  }
  /**
   *@description Gets books with the most upvotes
   *
   * @static
   * 
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * 
   * @returns {Object} response containing top 10 books in the library in an array
   * @memberof BookController
   */
  static getBooksByUpvotes(req, res, next) {
    const { limit, page, offset } = formatPagination(req)    
    if (req.query.sort === undefined) return next();
    if (req.query.order !== 'descending') {
      return res.status(400).json({
        message: 'order can only be descending'
      });
    }
    if (req.query.sort !== 'upvotes') {
      return res.status(400).json({
        message: 'sort can only be by upvotes'
      });
    }
    const options = {};
    options.order = [['upVotes', 'DESC']];
    options.limit = limit;
    options.offset = offset
    options.attributes = exclude;
    options.include = includeReviewAndFavorite;
    Book.findAndCountAll(options)
    // Fix me: check the next line
      // .then(books => res.status(200).json(books))
      .then((result) => {
        return paginateBookResult({ req, res, result, limit, page })
        // return res.json({ req})
      })
      .catch(error => res.status(400).json({
        message: 'error sending your request',
        error
      }));
  }
  /**
 *
 *@description Gets books by search word

 * @static
 * 
 * @param {Object} req
 * @param {Object} res
 * 
 * @returns {Object} response containing books that match the search
 * 
 * @memberof BookController
 */
  static getBooksBySearch(req, res) {
    const { limit, page, offset } = formatPagination(req)
    const options = {};
    const searchQuery = req.query.search;
    options.limit = limit;
    options.offset = offset;
    options.attributes = exclude;
    options.include = includeReviewAndFavorite
    options.where = {
      $or: [
        { author: { $iLike: `%${searchQuery}%` } },
        { description: { $iLike: `%${searchQuery}%` } },
        { title: { $iLike: `%${searchQuery}%` } }
      ],
    };
    Book.findAndCountAll(options)
      .then((result) => {
        if (!result.length) {
          return paginateBookResult({ req, res, result, limit, page })
        }
        return paginateBookResult({ req, res, result, limit, page })
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
   * 
   * @param {any} req 
   * @param {any} res
   * 
   * @returns {Object} response containing validity of book
   * @memberof BookController
   */
  static checkIsbnExist(req, res) {
    const { isbn, } = req.query;
    if (!isbn) {
      return res.status(400).json({
        message: 'ISBN expected in query'
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
   * 
   * @param {any} req 
   * @param {any} res
   * 
   * @memberof BookController
   * @returns {Object} response message
   */
  static deleteBook(req, res) {
    Book.find({
      where : {
        id: req.params.bookId
      },
      include: [{
        model: BorrowBook,
        as: 'borrowedBook',
        attributes: ['borrowStatus', 'returnStatus'],
      }],
    })
    .then((book) => {
      if(book.borrowedBook.length) {
        const borrowedBook = book.borrowedBook[0]
        if(borrowedBook.borrowStatus === 'accepted'
          && borrowedBook.returnStatus === 'pending'
          || borrowedBook.borrowStatus === 'accepted'
          && borrowedBook.returnStatus === '') {
            return res.status(400).json({
              message: `'${book.title}' cannot be deleted at the moment, a user has borrowed it`
            })
        }
      }
      book.destroy()
      .then(() => {
        return res.status(200).json({
          message: 'Book deleted successfully',
        });
      })
      .catch((error) => {
        return res.status(500).json({
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
  /**
   * 
   * 
   * @static
   * 
   * @param {any} req 
   * @param {any} res
   * 
   * @returns {Array} A list of popular books
   * @memberof BookController
   */
  static getPopularBooks(req, res) {
    const options = {};
    const { limit, page, offset } = formatPagination(req)
    options.limit = limit;
    options.offset = offset;
    options.order = [['borrowCount', 'DESC']];
    options.attributes = exclude;
    options.include = includeReviewAndFavorite;
    Book.findAndCountAll(options)
      .then((result) => {
        return paginateBookResult({ req, res, result, limit, page })
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
 * 
 * @param {any} req 
 * @param {any} res
 * 
 * @returns {Array} Top favorite books
 * @memberof BookController
 */
static getTopFavoritedBooks(req, res) {
    const options = {};
    const { limit, page, offset } = formatPagination(req)
    options.limit = limit;
    options.offset = offset;
    options.attributes = ['id', 'title', 'image'];
    options.include = [{
      model: Favorite,
      as: 'favorited',
      attributes: ['id']
    }];
    Book.findAndCountAll(options)
      .then((result) => {
        return paginateBookResult({ req, res, result, limit, page })
      })
      .catch(error => res.status(400).json({
        message: 'error sending your request',
        error
      }));
  }
}
export default BookController;