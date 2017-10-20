import * as bookController from '../controllers/v1/bookController';
import bookExists from '../middlewares/bookExistsMiddleware';

const bookRoute = (app) => {
  app.post('/api/v1/books', bookController.addBook);
  app.get('/api/v1/books/:bookId(\\d+)', bookExists,
  bookController.getSingleBook);
  app.put('/api/v1/books/:bookId(\\d+)', bookExists, bookController.modifyBook);
  app.get('/api/v1/books', bookController.getAllBooks);
};

export default bookRoute;
