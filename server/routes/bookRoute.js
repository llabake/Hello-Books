import * as bookController from '../controllers/v1/bookController';
import * as reviewController from '../controllers/v1/reviewController';
import * as favoriteController from '../controllers/v1/favoriteController';
import bookExists from '../middlewares/bookExistsMiddleware';
import userExists from '../middlewares/userExistsMiddleware';
import borrowedBookExists from '../middlewares/borrowedBookExistsMiddleware';

const bookRoute = (app) => {
  app.post('/api/v1/books', bookController.addBook);
  app.get('/api/v1/books/:bookId(\\d+)', bookExists,
    bookController.getSingleBook);
  app.put('/api/v1/books/:bookId(\\d+)', bookExists, bookController.modifyBook);
  app.get('/api/v1/books', bookController.getAllBooks);
  app.post('/api/v1/users/:userId(\\d+)/review/:bookId(\\d+)',
    userExists, bookExists, reviewController.addReview);
  app.post('/api/v1/users/:userId(\\d+)/fav/:bookId(\\d+)',
    userExists, bookExists, favoriteController.markBookAsFavorite);
  app.get('/api/v1/users/:userId(\\d+)/favbooks',
    favoriteController.retrieveUserFavorite);
  app.post('/api/v1/users/:userId(\\d+)/borrow/:bookId(\\d+)', 
    bookExists, bookController.borrowBook);
  app.post('/api/v1/users/:userId(\\d+)/return/:bookId(\\d+)', 
    bookExists, borrowedBookExists, bookController.returnBook);
  app.put('/api/v1/users/:userId(\\d+)/borrow/:bookId(\\d+)', 
    bookExists, borrowedBookExists, bookController.acceptBorrowBook);
  app.put('/api/v1/users/:userId(\\d+)/return/:bookId(\\d+)', 
    bookExists, borrowedBookExists, bookController.acceptReturnBook);
};

export default bookRoute;
