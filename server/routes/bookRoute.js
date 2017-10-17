import * as bookController from '../controllers/v1/bookController';
import bookExists from '../middlewares/bookExistsMiddleware';

const bookRoute = (app) => {
  app.post('/api/v1/books',  bookController.addBook);
};

export default bookRoute;
