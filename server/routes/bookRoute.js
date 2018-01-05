import AdminMiddleware from '../middlewares/adminMiddleware';
import Authentication from '../middlewares/authenticationMiddleware';
import BookController from '../controllers/v1/bookController';
import FavoriteController from '../controllers/v1/favoriteController';
import ReviewController from '../controllers/v1/reviewController';
import BorrowBookController from '../controllers/v1/borrowBookController';
import VoteController from '../controllers/v1/voteController';
import BookMiddleware from '../middlewares/bookMiddleware';
import UserMiddleware from '../middlewares/userMiddleware';
import FavoriteMiddleware from '../middlewares/favoriteMiddleware';
import VoteMiddleware from '../middlewares/voteMiddleware';
import BorrowedBookMiddleware from '../middlewares/borrowedBookMiddleware';

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
  app.post(
    '/api/v1/books',
    Authentication.authMiddleware, AdminMiddleware.isAdmin,
    Authentication.isActive, BookController.addBook
  );
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
    '/api/v1/books/:bookId(\\d+)',
    Authentication.authMiddleware,
    Authentication.isActive,
    BookController.getSingleBook
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
  app.put(
    '/api/v1/books/:bookId(\\d+)', BookMiddleware.bookExist,
    Authentication.authMiddleware, AdminMiddleware.isAdmin,
    Authentication.isActive, BookController.modifyBook
  );
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
 *   User:
 *     properties:
 *       username:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 *       confirmpassword:
 *         type: number
 *       email:
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
 *
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
  app.get(
    '/api/v1/books',
    Authentication.authMiddleware,
    Authentication.isActive, BookController.getAllBooks,
    BookController.getBooksByUpvotes, BookController.getBooksBySearch
  );
  /**
 * @swagger
 * /api/v1/books/{bookId}/review/:
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
    '/api/v1/books/:bookId(\\d+)/review/',
    Authentication.authMiddleware, UserMiddleware.userExist,
    Authentication.isActive,
    BookMiddleware.bookExist, ReviewController.addReview
  );
  /**
 * @swagger
 * /api/v1/books/fav/{bookId}:
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
    '/api/v1/books/fav/:bookId(\\d+)',
    Authentication.authMiddleware, UserMiddleware.userExist,
    Authentication.isActive, BookMiddleware.bookExist,
    FavoriteController.markBookAsFavorite
  );
  /**
 * @swagger
 * /api/v1/books/favbooks:
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
    '/api/v1/books/favbooks',
    Authentication.authMiddleware,
    Authentication.isActive, FavoriteController.retrieveUserFavorite
  );
  /**
 * @swagger
 * /api/v1/books/fav/{bookId}:
 *   delete:
 *     tags:
 *       - Book Functionality
 *     description: Deletes a book from a user's favorite list
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
 *         description: Successfully deleted
 *       400:
 *         description: Unauthenticated
 */
  app.delete(
    '/api/v1/books/fav/:bookId(\\d+)',
    Authentication.authMiddleware,
    Authentication.isActive, FavoriteMiddleware.favoriteExist,
    FavoriteController.deleteBookFromFavorite
  );
  /**
 * @swagger
 * /api/v1/users/borrow/{bookId}:
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
    '/api/v1/users/borrow/:bookId(\\d+)',
    Authentication.authMiddleware, UserMiddleware.userExist,
    Authentication.isActive, BookMiddleware.bookExist,
    BorrowedBookMiddleware.bookReturnOverDueExist,
    BorrowedBookMiddleware.borrowedBookExist,
    BorrowBookController.borrowBook
  );
  /**
 * @swagger
 * /api/v1/users/return/{bookId}:
 *   post:
 *     tags:
 *       - Return Functionality
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
    '/api/v1/users/return/:bookId(\\d+)',
    Authentication.authMiddleware, UserMiddleware.userExist,
    Authentication.isActive, BorrowBookController.returnBook
  );
  /**
 * @swagger
 * /api/v1/admin/user/{userId}/borrow/{bookId}:
 *   put:
 *     tags:
 *       - Borrow Functionality
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
    '/api/v1/admin/user/:userId(\\d+)/borrow/:bookId(\\d+)',
    Authentication.authMiddleware, AdminMiddleware.isAdmin,
    Authentication.isActive, BorrowBookController.acceptBorrowBook
  );
  /**
 * @swagger
 * /api/v1/admin/user/{userId}/return/{bookId}:
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
    '/api/v1/admin/user/:userId(\\d+)/return/:bookId(\\d+)',
    Authentication.authMiddleware, AdminMiddleware.isAdmin,
    Authentication.isActive, BorrowBookController.acceptReturnBook
  );
  /**
 * @swagger
 * /api/v1/books/{bookId}/review/:
 *   delete:
 *     tags:
 *       - Book Functionality
 *     description: Deletes a review from a book
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
 *         description: Successfully deleted
 *       400:
 *         description: Unauthenticated
 */
  app.delete(
    '/api/v1/books/review/:reviewId(\\d+)',
    Authentication.authMiddleware, UserMiddleware.userExist,
    Authentication.isActive,
    ReviewController.deleteReview
  );
  /**
 * @swagger
 * /api/v1/books/{bookId}/upvote:
 *   post:
 *     tags:
 *       - Book Functionality
 *     description: Downvote a book
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
 *         description: Successfully voted
 *       400:
 *         description: Unathenticated
 */
  app.post(
    '/api/v1/books/:bookId(\\d+)/upvote',
    Authentication.authMiddleware, UserMiddleware.userExist,
    Authentication.isActive, BookMiddleware.bookExist,
    VoteMiddleware.setUpVote, VoteController.voteBook
  );
  /**
 * @swagger
 * /api/v1/books/{bookId}/downvote:
 *   post:
 *     tags:
 *       - Book Functionality
 *     description: Downvote a book
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
 *         description: Successfully voted
 *       400:
 *         description: Unathenticated
 */
  app.post(
    '/api/v1/books/:bookId(\\d+)/downvote',
    Authentication.authMiddleware, UserMiddleware.userExist,
    Authentication.isActive, BookMiddleware.bookExist,
    VoteMiddleware.setDownVote, VoteController.voteBook
  );
  /**
 * @swagger
 * /api/v1/borrowedbooks:
 *   get:
 *     tags:
 *       - Borrow Functionality
 *     description: Returns all borrowed books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of borrowed books
 *         schema:
 *           $ref: '#/definitions/BorrowedBooks'
 */

  app.get(
    '/api/v1/borrowedbooks/',
    Authentication.authMiddleware,
    Authentication.isActive,
    BorrowBookController.getAllBorrowedBook
  );
  
    /**
  * @swagger
  * /api/v1/books/add/validate:
  *   get:
  *     tags:
  *       - User Functionality
  *     description: Checks if book exists
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
  *         description: Successfully found a book
  *       404:
  *         description: Book not found
  */
  app.get(
    '/api/v1/books/add/validate', BookController.checkIsbnExist
  )
};

export default bookRoute;
