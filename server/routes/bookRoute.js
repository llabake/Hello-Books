import bookController from '../controllers/v1/bookController';
import favoriteController from '../controllers/v1/favoriteController';
import addReview from '../controllers/v1/reviewController';
import bookExists from '../middlewares/bookExistsMiddleware';
import userExists from '../middlewares/userExistsMiddleware';
import borrowedBookExists from '../middlewares/borrowedBookExistsMiddleware';

const bookRoute = (app) => {
  /**
 * @swagger
 * /api/v1/books:
 *   post:
 *     tags:
 *       - Book Functionality
 *     description: Adds a new book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Incomplete parameters or type
 */
  app.post('/api/v1/books', bookController.addBook);
  /**
 * @swagger
 * /api/v1/books/{bookId}:
 *   get:
 *     tags:
 *       - Book Functionality
 *     description: Returns a single book
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A book object
 *       400:
 *         description: Error occurred
 *       404:
 *         description: Book not found
 *         schema:
 *           $ref: '#/definitions/Book'
 */
  app.get(
    '/api/v1/books/:bookId(\\d+)', bookExists,
    bookController.getSingleBook
  );
  /**
 * @swagger
 * /api/v1/books/{bookId}:
 *   put:
 *     tags:
 *       - Book Functionality
 *     description: Modify an already added Book's information
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: ID of the Book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: book
 *         description: Book object with updated information
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 */
  app.put('/api/v1/books/:bookId(\\d+)', bookExists, bookController.modifyBook);
  /**
 * @swagger
 * definition:
 *   Book:
 *     properties:
 *       name:
 *         type: string
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       publishedYear:
 *         type: number
 *       quantity:
 *         type: number
 *   Review:
 *     properties:
 *       text:
 *         type: string
 *   Favorite:
 *     properties:
 *       bookId:
 *         type: number
 *       userId:
 *         type: number
 *   BorrowedBook:
 *     properties:
 *       bookId:
 *          type: number
 *       userId :
 *          type: number
 */
  /**
 * @swagger
 * /api/v1/books:
 *   get:
 *     tags:
 *       - Book Functionality
 *     description: Returns all books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of books
 *         schema:
 *           $ref: '#/definitions/Book'
 */
  app.get('/api/v1/books', bookController.getAllBooks);
  /**
 * @swagger
 * /api/v1/users/{userId}/review/{bookId}:
 *   post:
 *     tags:
 *       - Book Functionality
 *     description: Adds a review to a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Review'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Incomplete parameters or type
 */
  app.post(
    '/api/v1/users/:userId(\\d+)/review/:bookId(\\d+)',
    userExists, bookExists, addReview
  );
  /**
 * @swagger
 * /api/v1/users/{userId}/fav/{bookId}:
 *   post:
 *     tags:
 *       - Book Functionality
 *     description: Adds a book as favorite
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Favorite'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Incomplete parameters or type
 */
  app.post(
    '/api/v1/users/:userId(\\d+)/fav/:bookId(\\d+)',
    userExists, bookExists, favoriteController.markBookAsFavorite
  );
  /**
 * @swagger
 * /api/v1/users/{userId}/favbooks:
 *   get:
 *     tags:
 *       - Book Functionality
 *     description: Adds a book as favorite
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Favorite'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Incomplete parameters or type
 */
  app.get(
    '/api/v1/users/:userId(\\d+)/favbooks',
    favoriteController.retrieveUserFavorite
  );
  /**
 * @swagger
 * /api/v1/users/{userId}/borrow/{bookId}:
 *   post:
 *     tags:
 *       - Borrow Functionality
 *     description: Borrow a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User making the request
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: ID of Book to Borrow
 *         in: path
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - bookId
 *             - userId
 *           properties:
 *             bookId:
 *               type: integer
 *             userId:
 *               type: integer
 *           example: {
 *             "bookId": 2,
 *             "userId": 2
 *           }
 *     responses:
 *       200:
 *         description: Book Successfully borrowed
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: Book not available for borrow
 *       404:
 *         description: Book not found
 *       409:
 *         description: Request had been made before
 */
  app.post(
    '/api/v1/users/:userId(\\d+)/borrow/:bookId(\\d+)',
    bookExists, bookController.borrowBook
  );
  /**
 * @swagger
 * /api/v1/users/{userId}/return/{bookId}:
 *   post:
 *     tags:
 *       - Borrow Functionality
 *     description: Return a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User making the request
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: ID of Book to Borrow
 *         in: path
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - bookId
 *             - userId
 *           properties:
 *             bookId:
 *               type: integer
 *             userId:
 *               type: integer
 *           example: {
 *             "bookId": 2,
 *             "userId": 2
 *           }
 *     responses:
 *       200:
 *         description: Book Successfully borrowed
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: Book not available for borrow
 *       404:
 *         description: Book not found
 *       409:
 *         description: Request had been made before
 */
  app.post(
    '/api/v1/users/:userId(\\d+)/return/:bookId(\\d+)',
    bookExists, borrowedBookExists, bookController.returnBook
  );
  /**
 * @swagger
 * /api/v1/users/{userId}/borrow/{bookId}:
 *   put:
 *     tags:
 *       - Return Functionality
 *     description: Acccept a borrow for a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User making the request
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: ID of Book to be returned
 *         in: path
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - bookId
 *             - userId
 *           properties:
 *             bookId:
 *               type: integer
 *             userId:
 *               type: integer
 *           example: {
 *             "bookId": 2,
 *             "userId": 2
 *           }
 *     responses:
 *       200:
 *         description: Book Successfully borrowed
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: Book not available for borrow
 *       404:
 *         description: Book not found
 *       409:
 *         description: Request had been made before
 */
  app.put(
    '/api/v1/users/:userId(\\d+)/borrow/:bookId(\\d+)',
    bookExists, borrowedBookExists, bookController.acceptBorrowBook
  );
  /**
 * @swagger
 * /api/v1/users/{userId}/return/{bookId}:
 *   put:
 *     tags:
 *       - Return Functionality
 *     description: Acccept a return for a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User making the request
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: ID of Book to be returned
 *         in: path
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - bookId
 *             - userId
 *           properties:
 *             bookId:
 *               type: integer
 *             userId:
 *               type: integer
 *           example: {
 *             "bookId": 2,
 *             "userId": 2
 *           }
 *     responses:
 *       200:
 *         description: Book Successfully borrowed
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: Book not available for borrow
 *       404:
 *         description: Book not found
 *       409:
 *         description: Request had been made before
 */
  app.put(
    '/api/v1/users/:userId(\\d+)/return/:bookId(\\d+)',
    bookExists, borrowedBookExists, bookController.acceptReturnBook
  );
};

export default bookRoute;
