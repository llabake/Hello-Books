import jwt from 'jsonwebtoken';
import models from '../models/index';

export const isEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const isAlphanumeric = (str) => {
  const re = /^([0-9]|[a-z])+([0-9a-z]+)$/i;
  return re.test(str);
};

export const isNumeric = (str) => {
  const re = /^([0-9])+$/i;
  return re.test(str);
};

/**
   *
   * @description: generate a login token
   * 
   * @param {Object} user payload to generate token
   * 
   * @returns {String} the gnerated token
   */
export const generateToken = (user) => {
  const token = jwt.sign(
    {
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
        username: user.username,
        active: user.active
      }
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  return token;
};

export const sortBooksByTopFavorites = ( books ) => {
  books.sort((book1, book2) => {
    if (book1.favorited.length < book2.favorited.length) {
      return 1
    } else if (book1.favorited.length > book2.favorited.length) {
      return -1
    } else {
      return 0
    }
  });
  return books;
}

export const trimObject = (obj) => {
  const trimmedObject = {}
  Object.keys(obj).forEach((key) => {
    trimmedObject[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key]
  })
  return trimmedObject;
}

export const maxPageLimit = process.env.MAX_PAGE_LIMIT || 4;

export const formatPagination = (req) => {
  const limit = !Number.isInteger(parseInt(req.query.limit, 10))
  || req.query.limit > maxPageLimit ? maxPageLimit : req.query.limit
  const page = (!Number.isInteger(parseInt(req.query.page, 10))
  || req.query.page <= 0) ? 1 : req.query.page
  const offset = limit * (page - 1);
  return { limit, page, offset }
}

export const hostUrl = process.env.NODE_ENV === 'production' ?
  'https://myhellobooks.herokuapp.com' :
  'http://localhost:5000';

export const getPrevPaginatedUrl = (limit, page, totalCount, path) => {
  const char = path.indexOf('?') !== -1 ? '&' : '?';
  return page > 1 ? `${hostUrl}${path}${char}page=${page-1}&limit=${limit}` : null
}

export const getNextPaginatedUrl = (limit, page, totalCount, path) => {
  const char = path.indexOf('?') !== -1 ? '&' : '?';
  return page + 1 <= Math.ceil(totalCount/limit) ? `${hostUrl}${path}${char}page=${page+1}&limit=${limit}` : null
}

export const paginateBookResult = ({ req, res, result, limit, page, }) => {
  let books = result.rows;
  let message = 'Books retrieved successfully';
  if(result.count === 0) {
    message = 'Books are unavailable now, do check back later'
    if(req.query.search || req.query.borrowStatus || req.query.returnStatus) {
      message = 'No book matches your search. Try some other combinations'
    }
    if(req.path === '/api/v1/books/fav/top-favorite') {
      message = 'No books found';
    }
    if(req.path === '/api/v1/users/borrowed-books') {
      message = 'Start borrowing books now';
    }
  } else if (result.rows.length === 0) {
      message = 'There are no books in this pagination set'
  } else if (req.path === '/api/v1/books/fav/top-favorite') {
      message = 'Top favorited books retrieved successfully',
      books = sortBooksByTopFavorites(result.rows)
  } else if (req.path === '/api/v1/users/books/popular-books') {
      message = 'Popular books retrieved successfully'
  } else if (req.path === '/api/v1/users/borrowed-books' || req.query.borrowStatus || req.query.returnStatus) {
    message = 'BorrowedBooks history fetched successfully'
    if (req.path === '/api/v1/admin/books/borrowed-books') {
      message = 'Borrowed books retrieved successfully'
    }
    return res.status(200).json({
      message,
      borrowedBooks: result.rows,
      count: result.count,
      next: getNextPaginatedUrl(limit, page, result.count, req.originalUrl),
      previous: getPrevPaginatedUrl(limit, page, result.count, req.originalUrl)
    });
  }
  return res.status(200).json({
    message,
    books,
    count: result.count,
    next: getNextPaginatedUrl(limit, page, result.count, req.originalUrl),
    previous: getPrevPaginatedUrl(limit, page, result.count, req.originalUrl)
  });
}

export const checkResourceExist = async (resource, resourceId, res, next) =>  {
  try {
    const resourceFound = await models[resource].findById(resourceId)
    if(!resourceFound) {
      return res.status(404).json({
        message: `${resource} with id: ${resourceId} not found`
      });
    }
    next();
  } catch (error) {
      return res.status(500).json({
        message: 'Error sending your request',
        error
      })
  }
}

export const paginateBookReviews = ({ req, res, result, limit, page }) => {
    let message = 'Reviews retrieved successfully'
    if(result.count === 0) {
      message = 'Be the first to post a review...'
    }
    return res.status(200).json({
      message,
      reviews: result.rows,
      count: result.count,
      next: getNextPaginatedUrl(limit, page, result.count, req.originalUrl),
      previous: getPrevPaginatedUrl(limit, page, result.count, req.originalUrl)
    });
}