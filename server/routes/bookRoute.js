import AdminMiddleware from '../middlewares/adminMiddleware';
import Authentication from '../middlewares/authenticationMiddleware';
import BookController from '../controllers/v1/bookController';
import FavoriteController from '../controllers/v1/favoriteController';
import ReviewController from '../controllers/v1/reviewController';
import BorrowBookController from '../controllers/v1/borrowBookController';
import VoteController from '../controllers/v1/voteController';
import FavoriteMiddleware from '../middlewares/favoriteMiddleware';
import VoteMiddleware from '../middlewares/voteMiddleware';
import BorrowedBookMiddleware from '../middlewares/borrowedBookMiddleware';
import RequestBookController from '../controllers/v1/requestBookController';
import validateParamsMiddleware from '../middlewares/validateParamsMiddleware';
import ResourceExistMiddleware from '../middlewares/resourceExistMiddleware';

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
 *       - name:  authorization
 *         in: header
 *         type: string
 *         required: true
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
 *     parameters:
 *       - name:  authorization
 *         in: header
 *         type: string
 *         required: true
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
    '/api/v1/books/:bookId', validateParamsMiddleware,
    Authentication.authMiddleware, Authentication.isActive,
    ResourceExistMiddleware.bookExist, BookController.getSingleBook
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
 *       - name: authorization
 *         in: header
 *         type: string
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
  '/api/v1/users/favbooks',
  Authentication.authMiddleware,
  Authentication.isActive, FavoriteController.retrieveUserFavorite
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
 *       - name: authorization
 *         in: header
 *         type: string
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
    '/api/v1/books/:bookId', validateParamsMiddleware, 
    Authentication.authMiddleware, AdminMiddleware.isAdmin,
    Authentication.isActive, ResourceExistMiddleware.bookExist,
    BookController.modifyBook
  );
  /**
 * @swagger
 * definition:
 *   Book:
 *     properties:
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       publishedYear:
 *         type: number
 *       quantity:
 *         type: number
 *       description:
 *         type: string
 *       aboutAuthor:
 *         type: string
 *       isbn:
 *         type: number
 *       image:
 *         type: string
 *        
 *   Review:
 *     properties:
 *       content:
 *         type: string
 *       caption:
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
 *   Request Object:
 *     properties:
 *       title:
 *          type: string
 *       author:
 *          type: string
 *       userId:
 *          type: number
 *   BorrowedBooks:
 *     properties:
 *       borrowDate:
 *          type: string
 *       expectedReturnDate:
 *          type: string
 *       actualReturnDate:
 *          type: string
 *       borrowStatus:
 *          type: string
 *       returnStatus:
 *          type: string
 *       bookId:
 *          type: number
 *       userId:
 *          type: number
 *       user:
 *          type: object
 *       book:
 *          type: object
 * 
 *   UserBorrowedBooks:
 *     properties:
 *       borrowDate:
 *          type: string
 *       expectedReturnDate:
 *          type: string
 *       actualReturnDate:
 *          type: string
 *       borrowStatus:
 *          type: string
 *       returnStatus:
 *          type: string
 *       bookId:
 *          type: number
 *       userId:
 *          type: number
 *       book:
 *          type: object
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
 *     parameters:
 *      - name: authorization
 *        in: header
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: An array of books
 *         schema:
 *           $ref: '#/definitions/Book'
 */
  app.get(
    '/api/v1/books',
    Authentication.authMiddleware, Authentication.isActive,
    BookController.getAllBooks, BookController.getBooksByUpvotes,
    BookController.getBooksBySearch
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
 *       - name: authorization
 *         in: header
 *         type: string
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
    '/api/v1/books/:bookId/review',
    Authentication.authMiddleware, ResourceExistMiddleware.userExist,
    Authentication.isActive, validateParamsMiddleware,
    ResourceExistMiddleware.bookExist, ReviewController.addReview
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
 *       - name: authorization
 *         in: header
 *         type: string
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
    '/api/v1/books/fav/:bookId',
    Authentication.authMiddleware, ResourceExistMiddleware.userExist,
    Authentication.isActive, validateParamsMiddleware,
    ResourceExistMiddleware.bookExist, FavoriteController.markBookAsFavorite
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
 *       - name: authorization
 *         in: header
 *         type: string
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
    '/api/v1/users/favbooks',
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
 *       - name: authorization
 *         in: header
 *         type: string
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
    '/api/v1/users/favbooks/:bookId',
    Authentication.authMiddleware, Authentication.isActive,
    validateParamsMiddleware, FavoriteMiddleware.favoriteExist,
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
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
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
    '/api/v1/users/borrow/:bookId',
    Authentication.authMiddleware, ResourceExistMiddleware.userExist,
    Authentication.isActive, validateParamsMiddleware,
    ResourceExistMiddleware.bookExist, BorrowedBookMiddleware.bookReturnOverDueExist,
    BorrowedBookMiddleware.borrowedBookExist, BorrowBookController.borrowBook
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
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
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
    '/api/v1/users/return/:bookId',
    Authentication.authMiddleware, validateParamsMiddleware,
    ResourceExistMiddleware.userExist,
    Authentication.isActive,
    BorrowBookController.returnBook
  );
  /**
 * @swagger
 * /api/v1/admin/users/{userId}/borrow/{bookId}:
 *   put:
 *     tags:
 *       - Borrow Functionality
 *     description: Acccept a borrow for a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
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
    '/api/v1/admin/users/:userId/borrow/:bookId', validateParamsMiddleware,
    Authentication.authMiddleware, AdminMiddleware.isAdmin,
    Authentication.isActive, BorrowBookController.acceptBorrowBook
  );
  /**
 * @swagger
 * /api/v1/admin/users/{userId}/return/{bookId}:
 *   put:
 *     tags:
 *       - Return Functionality
 *     description: Acccept a return for a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
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
    '/api/v1/admin/users/:userId/return/:bookId', validateParamsMiddleware,
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
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
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
    '/api/v1/books/:bookId/reviews/:reviewId',
    Authentication.authMiddleware, ResourceExistMiddleware.userExist,
    Authentication.isActive, validateParamsMiddleware,
    ResourceExistMiddleware.bookExist, ReviewController.deleteReview
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
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
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
    '/api/v1/books/:bookId/upvote',
    Authentication.authMiddleware, ResourceExistMiddleware.userExist,
    Authentication.isActive, validateParamsMiddleware,
    ResourceExistMiddleware.bookExist, VoteMiddleware.setUpVote,
    VoteController.voteBook
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
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
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
    '/api/v1/books/:bookId/downvote',
    Authentication.authMiddleware, ResourceExistMiddleware.userExist,
    Authentication.isActive, validateParamsMiddleware,
    ResourceExistMiddleware.bookExist, VoteMiddleware.setDownVote,
    VoteController.voteBook
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
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: An array of borrowed books
 *         schema:
 *           $ref: '#/definitions/BorrowedBooks'
 */

  app.get(
    '/api/v1/admin/books/borrowed-books',
    Authentication.authMiddleware,
    Authentication.isActive,
    BorrowBookController.getAllBorrowedBook
  );
  
  /**
  * @swagger
  * /api/v1/books/add/validate:
  *   get:
  *     tags:
  *       - Book Functionality
  *     description: Checks if book exists
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: authorization
  *         in: header
  *         type: string
  *         required: true
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
  
  /**
  * @swagger
  * /api/v1/books/{bookId}/reviews:
  *   get:
  *     tags:
  *       - Review Functionality
  *     description: Gets all reviews on a book
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: review
  *         description: Review object
  *         in: body
  *         required: true
  *         schema:
  *           $ref: '#/definitions/Review'
  *     responses:
  *       200:
  *         description: Successfully retrieved all reviews on abook
  *       404:
  *         description: Book not found
  */
  app.get(
    '/api/v1/books/:bookId/reviews',
    Authentication.authMiddleware, validateParamsMiddleware,
    ResourceExistMiddleware.bookExist, Authentication.isActive,
    ReviewController.getAllBookReview
  );
  /**
   * @swagger
   * /api/v1/books/{bookId}:
   *   delete:
   *     tags:
   *       - Book Functionality
   *     description: Returns a message 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: authorization
   *         in: header
   *         type: string
   *         required: true
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
  app.delete(
    '/api/v1/books/:bookId',
    Authentication.authMiddleware,
    Authentication.isActive,
    AdminMiddleware.isAdmin,
    validateParamsMiddleware,
    ResourceExistMiddleware.bookExist,
    BookController.deleteBook
  );

  /**
   * @swagger
   * /api/v1/user/borrowed_books:
   *   get:
   *     tags:
   *       - Borrow Functionality
   *     description: Returns all borrowed books by user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: authorization
   *         in: header
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: An array of borrowed books
   *         schema:
   *           $ref: '#/definitions/UserBorrowedBooks'
   */
  app.get(
    '/api/v1/users/borrowed-books',
    Authentication.authMiddleware,
    Authentication.isActive,
    BorrowBookController.getUserBorrowedBooks
  );

    /**
   * @swagger
   * /api/v1/book/review/{reviewId}:
   *   put:
   *     tags:
   *       - Review Functionality
   *     description: Modify review for a book
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: authorization
   *         in: header
   *         type: string
   *         required: true
   *       - name: reviewId
   *         description: ID of the review
   *         in: path
   *         required: true
   *         type: integer
   *       - name: book
   *         description: review object with updated information
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Review'
   *     responses:
   *       200:
   *         description: Successfully created
   *         schema:
   *           $ref: '#/definitions/Review'
   *       400:
   *         description: All fields are required
   *       404:
   *         description: Book not found
   */
  app.put(
    '/api/v1/books/:bookId/reviews/:reviewId', Authentication.authMiddleware, 
    ResourceExistMiddleware.userExist, Authentication.isActive,
    validateParamsMiddleware, ResourceExistMiddleware.bookExist,
    ResourceExistMiddleware.reviewExist,
    ReviewController.editBookReview
  );
    /**
   * @swagger
   * /api/v1/books/popular-books:
   *   get:
   *     tags:
   *       - Book Functionality
   *     description: Returns a list of popular books
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: authorization
   *         in: header
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: An array of popular books
   *         schema:
   *           $ref: '#/definitions/Book'
   */
  app.get(
      '/api/v1/users/books/popular-books', BookController.getPopularBooks
  )
    /**
   * @swagger
   * /api/v1/books/top-favorite:
   *   get:
   *     tags:
   *       - Book Functionality
   *     description: Returns a list of top favorite books
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: authorization
   *         in: header
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: An array of top favorite books
   *         schema:
   *           $ref: '#/definitions/Book'
   */
  app.get(
      '/api/v1/books/fav/top-favorite', BookController.getTopFavoritedBooks
  )
    /**
 * @swagger
 * /api/v1/books/suggest-book:
 *   post:
 *     tags:
 *       - Book Functionality
 *     description: A user suggests a book to be add to the library
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Request Object'
 *     responses:
 *       201:
 *         description: Successfully suggested a book
 *       400:
 *         description: Unathenticated
 */
  app.post(
    '/api/v1/books/suggest-book', Authentication.authMiddleware,
    ResourceExistMiddleware.userExist, Authentication.isActive,
    RequestBookController.requestBook
  );

      /**
   * @swagger
   * /api/v1/suggest-book:
   *   get:
   *     tags:
   *       - Book Functionality
   *     description: Returns a list of requested books
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: authorization
   *         in: header
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Requested Books retrieved successfully
   *         schema:
   *           $ref: '#/definitions/Request Object'
   */
  app.get(
    '/api/v1/suggest-book',
    Authentication.authMiddleware,
    Authentication.isActive,
    AdminMiddleware.isAdmin,
    RequestBookController.getRequestedBooks
  )
}

export default bookRoute;
