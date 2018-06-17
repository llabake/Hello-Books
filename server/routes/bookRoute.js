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
 * definition:
 *   BookCreationResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: 'Book with title: title has been added'
 *       book:
 *         type: object
 *         example: {
 *             "id": 13,
 *             "isbn": 9898989764623,
 *             "title": "title",
 *             "author": "author",
 *             "description": "description",
 *             "image": "image.jpg",
 *             "borrowCount": 0,
 *             "publishedYear": 2017,
 *             "upVotes": 0,
 *             "downVotes": 0,
 *             "quantity": 10,
 *             "aboutAuthor": "aboutAuthor",
 *             "updatedAt": "2018-06-16T22:11:08.238Z",
 *             "createdAt": "2018-06-16T22:11:08.238Z"
 *   }
 * /api/v1/books:
 *   post:
 *     tags:
 *       - Book Functionality
 *     summary: Add book
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
 *         description: Successfully added book
 *         schema: 
 *           $ref: '#/definitions/BookCreationResponse'
 *       400:
 *         description: Incomplete or invalid parameters or type 
 *         example: {
 *           errors: {
 *             title: title is required,
 *             author: author is required,
 *             publishedYear: PublishedYear can not be a future year,
 *             isbn: Provide a valid 13-digit ISBN,
 *        }
 *     }
 *       403:
 *         description: Permission denied
 *         example: {
 *            message: Permission denied, only an admin can access this route
 *     }
 *       409:
 *         description: Conflict
 *         example: {
 *            message: "Book with isbn: 1232017509746 already exist"
 *     }
 *       500:
 *        description: Internal Server Error
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
 *     summary: Retrieves a single book
 *     description: Returns a single book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name:  authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: bookId
 *         in: path
 *         description: Id of book to be retrieved
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: A book object
 *         schema:
 *           $ref: '#/definitions/BookRetrievedResponse'
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Book not found
 */
  app.get(
    '/api/v1/books/:bookId', validateParamsMiddleware,
    Authentication.authMiddleware, Authentication.isActive,
    ResourceExistMiddleware.bookExist, BookController.getSingleBook
  );


    /**
 * @swagger
 * definition: 
 *   FavoriteResponse:
 *     type: object
 *     properties:
 *        id:
 *          type: integer
 *          example: 3
 *        createdAt:
 *          type: string
 *          example: 2018-06-11T15:47:32.577Z
 *        updatedAt:
 *          type: string
 *          example: 2018-06-11T15:47:32.577Z
 *        bookId:
 *          type: integer
 *          example: 5
 *        userId:
 *          type: integer
 *          example: 9
 *        book:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              example: 3
 *            title:
 *              type: string
 *              example: title
 *            description:
 *              type: string
 *              example: description
 *            downVotes:
 *              type: integer
 *              example: 5
 *            upVotes:
 *              type: integer
 *              example: 9
 *            image:
 *              type: string
 *              example: image.jpg
 *            reviews:
 *              type: array
 *              items:
 *                properties:
 *                  content:
 *                    type: string
 *                    example: content
 *                  caption:
 *                    type: string
 *                    example: caption
 *                  user:
 *                    type: object
 *                    properties:
 *                      username:
 *                        type: string
 *                        example: username
 *                      id:
 *                        type: integer
 *                        example: 3
 *            favorited:
 *              type: array
 *              items:
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  createdAt:
 *                    type: string
 *                    example: 2018-06-11T16:17:27.369Z
 *                  user:
 *                    type: object
 *                    properties:
 *                      username:
 *                        type: string
 *                        example: username
 *                      id:
 *                        type: integer
 *                        example: 3
 * /api/v1/users/favbooks:
 *   get:
 *     tags:
 *       - Favorite Functionality
 *     summary: User's Favorite Book
 *     description: Adds a book as favorite
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         schema:
 *           type: object
 *           properties:
 *             count:
 *               type: integer
 *               example: 1
 *             next:
 *               type: string
 *               example: "http://localhost:5000/api/v1/books?page=3&limit=3"
 *             previous:
 *               type: string
 *               example: "http://localhost:5000/api/v1/books?page=2&limit=3"
 *             message:
 *               type: string
 *               example: Favorite Book(s) retrieved successfully
 *             favorites:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/FavoriteResponse'
 *       500:
 *         description: Internal Server Error
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
 *     summary: Modify book detail
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
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true 
 *     responses:
 *       200:
 *         description: Successfully modified
 *         schema:
 *           type: object
 *           properties:
 *             book:
 *               schema:
 *                 $ref: '#/definitions/Book'
 *             message:
 *               type: string
 *               example: Your book has been updated
 * 
 *       404:
 *         description: Book not found
 * 
 *       400:
 *         description: Incomplete or invalid parameters or type 
 *         example: {
 *           errors: {
 *             publishedYear: PublishedYear can not be a future year,
 *             isbn: Provide a valid 13-digit ISBN,
 *        }
 *     }
 *       403:
 *         description: Permission denied
 *         example: {
 *            message: Permission denied, only an admin can access this route
 *     }
 *       409:
 *         description: Conflict
 *         example: {
 *            message: "Book with isbn: 1232017509746 already exist"
 *     }
 *       500:
 *        description: Internal Server Error
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
 *         example: Lord of the Rings
 *       author:
 *         type: string
 *         example: Hogwarts
 *       publishedYear:
 *         type: integer
 *         example: 2013
 *       quantity:
 *         type: integer
 *         example: 5
 *       description:
 *         type: string
 *         example: exaple description
 *       aboutAuthor:
 *         type: string
 *         example: example author
 *       isbn:
 *         type: integer
 *         example: 9292929292029
 *       image:
 *         type: string
 *         example: exampleimage.jpg
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
 *         type: integer
 *       userId:
 *         type: integer
 *   BorrowedBook:
 *     properties:
 *       bookId:
 *          type: integer
 *       userId :
 *          type: integer
 *   Request Object:
 *     properties:
 *       title:
 *          type: string
 *       author:
 *          type: string
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
 *          type: integer
 *       userId:
 *          type: integer
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
 *          type: integer
 *       userId:
 *          type: integer
 *       book:
 *          type: object
 *       id:
 *         type: integer
 *       createdAt:
 *         type: string
 *       updatedAt: 
 *         type: string
 * 
 *   BookRetrievedResponse:
 *     type: object
 *     properties:
 *        reviews:
 *          type: array
 *          items:
 *           properties:
 *             content:
 *               type: string
 *               example: content
 *             caption:
 *               type: string
 *               example: caption
 *             user:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: username
 *                 id:
 *                   type: integer
 *                   example: 3
 *        favorited:
 *          type: array
 *          items:
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             createdAt:
 *               type: string
 *               example: 2018-06-11T16:17:27.369Z
 *             user:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: username
 *                 id:
 *                   type: integer
 *                   example: 3
 *        votes:
 *          type: array
 *        title:
 *          type: string
 *          example: Lord of the Rings
 *        author:
 *          type: string
 *          example: Hogwarts
 *        publishedYear:
 *          type: integer
 *          example: 2013
 *        quantity:
 *          type: integer
 *          example: 5
 *        description:
 *          type: string
 *          example: exaple description
 *        aboutAuthor:
 *          type: string
 *          example: example author
 *        isbn:
 *          type: integer
 *          example: 9292929292029
 *        image:
 *          type: string
 *          example: exampleimage.jpg
 *   BorrowedBooksResponse:
 *     type: object
 *     properties:
 *        user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: username
 *             id:
 *                type: integer
 *                example: 3
 *        book:
 *           type: object
 *           properties:
 *             author:
 *               type: string
 *               example: author
 *             id:
 *                type: integer
 *                example: 3
 *             title:
 *               type: string
 *               example: title
 *             quantity:
 *                type: integer
 *                example: 3
 *             borrowCount:
 *                type: integer
 *                example: 3
 *        borrowDate:
 *          type: string
 *          example: 2018-06-17T10:14:33.640Z
 *        id:
 *          type: integer
 *          example: 2
 *        userId:
 *          type: integer
 *          example: 5
 *        actualReturnDate:
 *          type: string
 *          example: 2018-06-17T10:14:33.640Z
 *        borrowStatus:
 *          type: string
 *          example: accepted
 *        returnStatus:
 *           type: string
 *           example: pending
 *        bookId:
 *          type: integer
 *          example: 9
 *        expectedReturnDate:
 *          type: string
 *          example: 2018-06-17T10:14:33.640Z
 * 
 *   ReviewsResponse:
 *     type: object
 *     properties:
 *        user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: username
 *             id:
 *                type: integer
 *                example: 3
 *        content:
 *          type: string
 *          example: content
 *        id:
 *          type: integer
 *          example: 2
 *        userId:
 *          type: integer
 *          example: 5
 *        caption:
 *          type: string
 *          example: caption
 *        updatedAt:
 *          type: string
 *          example: 2018-06-17T10:14:33.640Z
 *        bookId:
 *          type: integer
 *          example: 9
 *        createdAt:
 *          type: string
 *          example: 2018-06-17T10:14:33.640Z
 *   SuggestedBookResponse:
 *     properties:
 *       title:
 *          type: string
 *          example: title
 *       author:
 *          type: string
 *          example: author
 *       userId:
 *          type: integer
 *          example: 3
 *       createdAt:
 *          type: string
 *          example: 2018-06-17T10:14:33.640Z
 *       updatedAt:
 *          type: string
 *          example: 2018-06-17T10:14:33.640Z
 *
 */
  /**
 * @swagger
 * /api/v1/books:
 *   get:
 *     tags:
 *       - Book Functionality
 *     summary: All Books
 *     description: Users can get books by search term or by upvotes and without any query
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: authorization
 *        in: header
 *        type: string
 *        required: true
 *      - name: search
 *        in: query
 *        description: Value to search with
 *        type: string
 *      - name: sort
 *        in: query
 *        description: Value to base the sort on (upvotes)
 *        type: string
 *      - name: order
 *        in: query
 *        description: Value to order the sort with (descending)
 *        type: string
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             count:
 *               type: integer
 *               example: 1
 *             next:
 *               type: string
 *               example: "http://localhost:5000/api/v1/books?page=3&limit=3"
 *             previous:
 *               type: string
 *               example: "http://localhost:5000/api/v1/books?page=2&limit=3"
 *             message:
 *               type: string
 *               example: Books retrieved successfully
 *             books:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/BookRetrievedResponse'
 *       500:
 *         description: Internal Server Error
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
 *       - Review Functionality
 *     summary: Add a review
 *     description: Adds a review to a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: Id of book to be reviewed
 *         in: path
 *         required: true
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: review body
 *         description: Review object that contains content and caption to be posted
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Review'
 *     responses:
 *       201:
 *         description: Successfully created Review
 *         example: {
 *     "message": "Review has been posted",
 *     "book": {
 *       "id": 1,
 *      "title": "There was a country",
 *      "author": "Chinua Achebe",
 *      "publishedYear": "2010",
 *       "isbn": "2947018573019",
 *       "quantity": 7,
 *     "description": "There Was a Country offers us a powerful story interlaced with poetry, of a time of innocence that quickly dissolved into the postcolonial iron years. It is a great gift from one of the giants of the twentieth century, and it will add to the debate on the situation of Africa in the postcolonial moment, seen through the steady eyes of an inspired witness.",
 *       "image": "https://res.cloudinary.com/sardaunan/image/upload/v1525556908/there%20was%20a%20country.jpg",
 *       "upVotes": 0,
 *       "downVotes": 0,
 *       "borrowCount": 1,
 *       "aboutAuthor": "Chinua Achebe, often considered his best, is the most widely read book in modern African literature. He won the Man Booker International Prize in 2007.",
 *       "createdAt": "2018-06-07T15:08:48.835Z",
 *       "updatedAt": "2018-06-17T06:19:22.561Z",
 *       "reviews": [
 *           {
 *               "id": 2,
 *               "content": "juhuguhuhjhj",
 *               "createdAt": "2018-06-17T07:11:59.724Z",
 *               "updatedAt": "2018-06-17T07:11:59.724Z",
 *               "caption": "when caption is too long?",
 *               "user": {
 *                   "username": "mama",
 *                   "id": 2,
 *                   "image": ""
 *               }
 *           }
 *       ],
 *       "favorited": []
 *   },
 *     "review": {
 *       "id": 2,
 *       "content": "juhuguhuhjhj",
 *       "caption": "when caption is too long?",
 *       "bookId": 1,
 *       "userId": 2,
 *       "updatedAt": "2018-06-17T07:11:59.724Z",
 *       "createdAt": "2018-06-17T07:11:59.724Z"
 *   }
 *   }
 *       400:
 *         description: Incomplete parameters or type
 *       409: 
 *         description: Review has been posted previously
 *       500:
 *         description: Internal Server Error
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
 *       - Favorite Functionality
 *     summary: Add book as favorite 
 *     description: Adds a book as favorite
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: ID of the Book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *         description: authorization
 *     responses:
 *       201:
 *         description: Successfully added book to favorite
 *       404:
 *         description: Book not found
 *       409:
 *         description: Book already on favorite list
 *       500: 
 *         description: Internal Server Error
 */
  app.post(
    '/api/v1/books/fav/:bookId',
    Authentication.authMiddleware, ResourceExistMiddleware.userExist,
    Authentication.isActive, validateParamsMiddleware,
    ResourceExistMiddleware.bookExist, FavoriteController.markBookAsFavorite
  );
  /**
 * @swagger
 * /api/v1/users/favbooks/{bookId}:
 *   delete:
 *     tags:
 *       - Favorite Functionality
 *     summary: Delete from favorite list
 *     description: Deletes a book from a user's favorite list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: ID of the Book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       400:
 *         description: Unauthenticated
 *       404:
 *         description: Book not found
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
 *     summary: Borrow Book
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
 *         type: integer
 *     responses:
 *       201:
 *         description: Book Successfully borrowed
 *       400:
 *         description: Book not available for borrow presently
 *       404:
 *         description: Book not found
 *       409:
 *         description: |
 *           Request has been made before
 *           Book return overdue
 *       500:
 *         description: Internal Server Error
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
 *     summary: Return Book
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
 *         description: ID of Book to be returned
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Book Successfully borrowed
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
 *     summary: Acccept borrow request
 *     description: Acccept a borrow for a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: userId
 *         description: ID of the User that made the request
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: ID of Book to be borrowed
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Borrow request Successfully accepted
 *       400:
 *         description: Book not available for borrow
 *       404:
 *         description: borrowedBook match not found
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
 *     summary: Acccept return request
 *     description: Acccept a return for a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: userId
 *         description: ID of the User that made the request
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: ID of Book to be returned
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Book return request successfully accepted
 *       400:
 *         description: Borrow request not yet accepted
 *       404:
 *         description: borrowedBook match not found
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
 * /api/v1/books/{bookId}/reviews/{reviewId}:
 *   delete:
 *     tags:
 *       - Review Functionality
 *     summary: Delete a review
 *     description: Deletes a review on a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: bookId
 *         description: ID of the Book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: reviewId
 *         description: ID of the Review to be deleted
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Review deleted successfully
 *       403:
 *         description: Permission denied
 *         message: 
 *           type: string
 *           example: You did not post this Review, hence can not delete it
 * 
 *       404:
 *         description: Not Found
 *         message:
 *           type: string
 *           example: Review not found
 *       500:
 *         description: Internal Server Error
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
 *       - Vote Functionality
 *     summary: Upvote
 *     description: Upvote a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: bookId
 *         description: ID of the Book
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully voted
 *       404:
 *         description: Book not found
 *       409: 
 *         description: Conflict, upvote or downvote already exists
 *       500: 
 *         description: Internal server error 
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
 *       - Vote Functionality
 *     summary: Downvote
 *     description: Downvote a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: bookId
 *         description: ID of the Book
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully voted
 *       404:
 *         description: Book not found
 *       409: 
 *         description: Conflict, upvote or downvote already exists
 *       500: 
 *         description: Internal server error 
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
 * /api/v1/admin/books/borrowedbooks:
 *   get:
 *     tags:
 *       - Borrow Functionality
 *     summary: Get all borrowed books 
 *     description: Returns all borrowed books
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: borrow status
 *         description: pending or accepted
 *         in: query
 *         type: string
 *       - name: return status
 *         description: pending or accepted
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: An array of borrowed books
 *         schema:
 *           type: object
 *           properties:
 *             count:
 *               type: integer
 *               example: 1
 *             next:
 *               type: string
 *               example: "http://localhost:5000/api/v1/admin/books/borrowed-books?borrowStatus=pending&page=3&limit=3"
 *             previous:
 *               type: string
 *               example: "http://localhost:5000/api/v1/admin/books/borrowed-books?borrowStatus=pending&page=2&limit=3"
 *             message:
 *               type: string
 *               example: Borrowed books successfully
 *             borrowedBooks:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/BorrowedBooksResponse'
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
  *     summary: validate ISBN existence
  *     description: Checks if book exists
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: authorization
  *         in: header
  *         type: string
  *         required: true
  *       - name: isbn
  *         description: ISBN to validate existence
  *         in: query
  *         required: true
  *     responses:
  *       200:
  *         description: Valid ISBN 
  *       400:
  *         description: ISBN expected in query
  *       500: 
  *         description: Internal Server Error
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
  *     summary: All reviews
  *     description: Gets all reviews on a book
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: bookId
  *         description: ID of the Book
  *         in: path
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: Successfully retrieved all reviews on book
  *         schema:
  *           type: object
  *           properties:
  *             count:
  *               type: integer
  *               example: 1
  *             next:
  *               type: string
  *               example: "http://localhost:5000/api/v1/books/1/reviews?page=3&limit=3"
  *             previous:
  *               type: string
  *               example: "http://localhost:5000/api/v1/books/1/reviews?page=2&limit=3"
  *             message:
  *               type: string
  *               example: reviews retrieved successfully
  *             reviews:
  *               type: array
  *               items:
  *                 $ref: '#/definitions/ReviewsResponse'
  *       500:
  *         description: Internal Server Error
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
   *     description: Successfully Deleted Book 
   *     summary: Delete a single Book
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: authorization
   *         in: header
   *         type: string
   *         required: true
   *         description: authorization
   *       - name: bookId
   *         description: ID of book
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   *               example: Book deleted successfully
   *       400:
   *         description: Operation disallowed
   *         message:
   *           type: string
   *           example: Book cannot be deleted has it has been borrowed out
   *       403:
   *         description: Permission denied
   *         example: {
   *            message: Permission denied, only an admin can access this route
   *   }
   *       404:
   *         description: Book not found
   *       500:
   *         description: Internal Server Error
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
   * /api/v1/users/borrowed_books:
   *   get:
   *     tags:
   *       - Borrow Functionality
   *     summary: User Borrow History
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
   *         description: BorrowedBooks history fetched successfullyo
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
   * /api/v1/books/{bookId}/reviews/{reviewId}:
   *   put:
   *     tags:
   *       - Review Functionality
   *     summary: Edit Review
   *     description: Modify review for a book
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: authorization
   *         in: header
   *         type: string
   *         required: true
   *       - name: bookId
   *         description: ID of the Book
   *         in: path
   *         required: true
   *         type: integer
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
   * /api/v1/users/books/popular-books:
   *   get:
   *     tags:
   *       - Book Functionality
   *     summary: Popular books
   *     description: Returns a list of popular books
   *     produces:
   *       - application/json
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
   * /api/v1/books/fav/top-favorite:
   *   get:
   *     tags:
   *       - Book Functionality
   *     summary: Top Favorite books
   *     description: Returns a list of top favorite books
   *     produces:
   *       - application/json
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
 *     summary: Suggest books to the library
 *     description: A user suggests a book to be add to the library
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: book
 *         description:  Suggested Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Request Object'
 *     responses:
 *       201:
 *         description: Successfully suggested a book
 *         schema:
 *           type: object
 *           properties:
 *             requestedBook:
 *               $ref: '#/definitions/SuggestedBookResponse'
 *             message: Thank you for the book suggestion, the management is always at your service
 *       400:
 *         description: Incomplete parameters or type
 *       500: 
 *         description: Internal Server Error
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
   *     summary: Suggested books
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
   *           $ref: '#/definitions/SuggestedBookResponse'
   *       500:
   *         description: Internal Server Error
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
