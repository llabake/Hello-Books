import supertest from "supertest";
import chai from "chai";
import app from "../../app";
import { dummyData } from '../helpers/modelHelpers'
import Book from '../models/book';
import Review from '../models/review';
import BorrowedBook from '../models/borrowedBook'

global.request = supertest(app);
const expect = chai.expect;

describe('Index route:', () => {
   it('it should return welcome message', () => {
    request.get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.eql({ message: 'Welcome to Hello Books.' });
        done(err);
      });
  }); 
});

describe('Controller Functions', () => {
    describe('Book Controller:', () =>{
        beforeEach(() => {
            // runs before each test in this block
            dummyData.books = {};
            dummyData.reviews = {};
            dummyData.favorites = {};
            dummyData.borrowedBooks = {};
            dummyData.users ={};
          });
        
        it('should return specific error message and the path to the error for empty fields',(done) => {
            const bookData = {};
            const fields = ['title', 'isbn', 'author', 'quantity', 'publishedYear'];
            request.post('/api/v1/books')
                .send(bookData)
                .set('Accept', 'application/json')
                .expect(400)
                .end((err, res) => {
                    expect(res.body.error).to.have.lengthOf(5);
                    fields.forEach((field)=>{
                        expect(res.body.error).to.deep.include({ path: field, message: `${field} is required` })
                    })
                    done(err);
                });
        });
        it('should return specific error message and the path to the error for invalid input type',(done) => {
            const bookData = {
                'title': 78,
                'author': 5+6,
                'isbn': 'bookisbn',
                'quantity': '56',
                'publishedYear': '2009'
            };
            const fields = ['title', 'isbn', 'author', 'quantity', 'publishedYear'];
            const dataType = {title:'string', isbn:'number', author: 'string', quantity: 'number', publishedYear:'number'};
            request.post('/api/v1/books')
                .send(bookData)
                .set('Accept', 'application/json')
                .expect(400)
                .end((err, res) => {
                    expect(res.body.error).to.have.lengthOf(5);
                    fields.forEach((field)=>{
                        expect(res.body.error).to.deep.include({ path: field, message: `${field} must be a ${dataType[field]}` })
                    })
                    done(err);
                });
        });
        it('should return specific error message and the path to the error for invalid input type',(done) => {
            const bookData = {
                rubbishField: 'justrubbish',
                title: 'so long a letter',
                author: 'mariam ba',
                isbn: 65486565,
                quantity: 56
            };
            const args = bookData;
            const key = 'rubbishField';
            const fields = ['publishedYear'];
            request.post('/api/v1/books')
                .send(bookData)
                .set('Accept', 'application/json')
                .expect(400)
                .end((err, res) => {
                    expect(res.body.error).to.have.lengthOf(2);
                    fields.forEach((field)=>{
                        expect(res.body.error).to.deep.include({ path: field, message: `${field} is required` })
                    })
                    expect(res.body.error).to.deep.include({  message: `invalid field: rubbishField found in args` })
                    done(err);
                });
        });
        it('should send and error when a book with zero or less quantity is sent',(done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 0,
                'publishedYear': 2009
            };
            // const fields = ['title', 'isbn', 'author', 'quantity', 'publishedYear'];
            request.post('/api/v1/books')
                .send(bookData)
                .set('Accept', 'application/json')
                .expect(400)
                .end((err, res) => {
                    expect(res.body.error).to.deep.include({ path: 'quantity',
                        message: 'quantity can not be less than or equal zero' })
                    done(err);
                });
        });
        it('should create a new book',(done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            request.post('/api/v1/books')
                .send(bookData)
                .set('Accept', 'application/json')
                .expect(201)
                .end((err, res) => {
                    expect(res.body.message).to.eql(`Book with title: ${bookData.title} has been added`);
                    expect(res.body.book.title).to.eql(bookData.title);
                    expect(res.body.book.publishedYear).to.eql(bookData.publishedYear);
                    expect(res.body.book.author).to.eql(bookData.author);
                    expect(res.body.book.isbn).to.eql(bookData.isbn);
                    expect(res.body.book.quantity).to.eql(bookData.quantity);
                    expect(res.body.book.upvotes).to.eql(0);
                    expect(res.body.book.downvotes).to.eql(0);
                    expect(Object.prototype.hasOwnProperty.call(res.body.book, 'id')).to.eql(true)
                    done(err);
                });
        });
        it('should get a single book', (done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            const book = new Book(bookData);
            book.create();
            request.get(`/api/v1/books/${book.id}`)
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    expect(res.body.book.id).to.eql(book.id);
                    expect(res.body.book.title).to.eql(book.title);
                    expect(res.body.book.publishedYear).to.eql(book.publishedYear);
                    expect(res.body.book.author).to.eql(book.author);
                    expect(res.body.book.isbn).to.eql(book.isbn);
                    expect(res.body.book.quantity).to.eql(book.quantity);
                    expect(res.body.book.upvotes).to.eql(book.upvotes);
                    expect(res.body.book.downvotes).to.eql(book.downvotes);
                    expect(res.body.book.hasOwnProperty('reviews')).to.eql(true);
                    expect(res.body.book.hasOwnProperty('deleted')).to.eql(false);
                    done(err)
                });
        });
        it('should get a single book with its review', (done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            // create a new book
            const book = new Book (bookData);
            book.create();
            const reviewData = {
                "bookId": book.id,
                "userId": 2,
                "text": "mesmerising"
            }
            // create a review for the new book
            const review = new Review (reviewData)
            review.create();
            reviewData.id = review.id;
            request.get(`/api/v1/books/${book.id}`)
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    expect(res.body.book.id).to.eql(book.id);
                    expect(res.body.book.title).to.eql(book.title);
                    expect(res.body.book.publishedYear).to.eql(book.publishedYear);
                    expect(res.body.book.author).to.eql(book.author);
                    expect(res.body.book.isbn).to.eql(book.isbn);
                    expect(res.body.book.quantity).to.eql(book.quantity);
                    expect(res.body.book.upvotes).to.eql(book.upvotes);
                    expect(res.body.book.downvotes).to.eql(book.downvotes);
                    expect(res.body.book.hasOwnProperty('deleted')).to.eql(false);
                    expect(res.body.book.hasOwnProperty('reviews')).to.eql(true);
                    expect(res.body.book.reviews).to.have.lengthOf(1);
                    expect(res.body.book.reviews).to.deep.include(reviewData)
                    done(err)
                });
        });
        it('should modify a book', (done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            const book = new Book(bookData);
            book.create();
            const updateData = {
                'title': 'so long ',
                'author': 'mariam',
                'quantity': 100
            }
            request.put(`/api/v1/books/${book.id}`)
                .send(updateData)
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    expect(res.body.book.id).to.eql(book.id);
                    expect(res.body.book.title).to.eql(updateData.title);
                    expect(res.body.book.publishedYear).to.eql(book.publishedYear);
                    expect(res.body.book.author).to.eql(updateData.author);
                    expect(res.body.book.isbn).to.eql(book.isbn);
                    expect(res.body.book.quantity).to.eql(updateData.quantity);
                    expect(res.body.book.upvotes).to.eql(book.upvotes);
                    expect(res.body.book.downvotes).to.eql(book.downvotes);
                    expect(res.body.book.hasOwnProperty('reviews')).to.eql(true);
                    expect(res.body.book.hasOwnProperty('deleted')).to.eql(false);
                    done(err)
                });
        });
        it('should get a all book', (done) => {
            const bookData1 = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            const book1 = new Book(bookData1);
            book1.create();
            const bookData2 = {
                'title': 'Alapata Apata',
                'author': 'Wole Soyinka',
                'isbn': 12345565,
                'quantity': 6,
                'publishedYear': 2003
            };
            const book2 = new Book(bookData2);
            book2.create();
            const bookData3 = {
                'title': 'Reclaim Your Heart',
                'author': 'Yasmin Mogahed',
                'isbn': 5645565,
                'quantity': 8,
                'publishedYear': 2013
            };
            const book3 = new Book(bookData3);
            book3.create();
            request.get('/api/v1/books/')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    expect(res.body.books).to.have.lengthOf(3);
                    expect(res.body.books).to.deep.include(book1);
                    expect(res.body.books).to.deep.include(book2);
                    expect(res.body.books).to.deep.include(book3);
                    expect(res.body.books[res.body.books.length - 1].title).to.eql(book3.title);
                    done(err)
                });
        });
        it('should return "You have made this request earlier!" when a borrow request has been made on a book more than once', (done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            // create a new book
            const book = new Book (bookData);
            book.create();
            const userData = {
                "username": "keinzy",
                "email": "ayinla1",
                "password": "love4eva",
                "id": 3
            };
            const userId = userData.id;
            const bookId = book.id;
            const borrowedBookData = {
                userId,
                bookId
            }
            const borrowedBook = new BorrowedBook (borrowedBookData);
            borrowedBook.create();
            request.post(`/api/v1/users/${userId}/borrow/${book.id}`)
                .set('Accept', 'application/json')
                .expect(409)
                .end((err, res) => {
                    expect(res.body.message).to.eql("You have made this request earlier!");
                    done(err)
                });
        });
        it('should return book currently not available for borrow when a borrow request has been made on a book with zero quantity', (done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            const book = new Book(bookData);
            book.create();
            // override book quantity to zero
            dummyData.books[book.id].quantity = 0;
            // send id invalid for book not found
            const userData = {
                "username": "keinzy",
                "email": "ayinla1",
                "password": "love4eva",
                "id": 3
            };
            request.post(`/api/v1/users/${userData.id}/borrow/${book.id}`)
                .set('Accept', 'application/json')
                .expect(400)
                .end((err, res) => {
                    expect(res.body.message).to.eql('book currently not available for borrow');
                    done(err)
                });
        });
        it('should return "Your request has been made and its being processed" when a borrow request is made', (done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            // create a new book
            const book = new Book (bookData);
            book.create();
            const userData = {
                "username": "simbad",
                "email": "bankudi",
                "password": "love4eva",
                "id": 5
            };
            const userId = userData.id;
            const bookId = book.id;
            request.post(`/api/v1/users/${userId}/borrow/${bookId}`)
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    expect(res.body.message).to.eql('Your request has been made and its being processed');
                    expect(Object.prototype.hasOwnProperty.call(res.body.borrowedBook, 'id')).to.eql(true)
                    done(err)
                });
        });
        // pending accept 
        xit('should return borrowedbook with status accepted for an accepted request', (done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            // create a new book
            const book = new Book (bookData);
            book.create();
            const userData = {
                "username": "simbad",
                "email": "bankudi",
                "password": "love4eva",
                "id": 6
            };
            const userId = userData.id;
            const bookId = book.id;
            const borrowedBookData = {
                userId,
                bookId
            }
            // create a broorowed boook 
            const borrowedBook = new BorrowedBook (borrowedBookData);
            console.log(dummyData.borrowedBooks)
            // change the status of the borrowed book
            dummyData.borrowedBooks[borrowedBook.id].borrowedStatus = 'accepted';
            request.put(`/api/v1/users/${userId}/borrow/${bookId}`)
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    // expect(res.body.borrowedBook.quantity).to.eql({dummyData.books[book.id].quantity - 1});
                    // expect(res.body.borrowedBook).to.eql({borrowedBook});
                    expect(Object.prototype.hasOwnProperty.call(res.body, 'borrowedBook')).to.eql(true)
                    expect(Object.prototype.hasOwnProperty.call(res.body, 'book')).to.eql(true)
                    done(err)
                });
        });
        it('should return Request to borrow is still pending when a return request is made for a book with the borrowed status not accepted', (done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            // create a new book
            const book = new Book (bookData);
            book.create();
            const userData = {
                "username": "simbad",
                "email": "bankudi",
                "password": "love4eva",
                "id": 5
            };
            const userId = userData.id;
            const bookId = book.id;
            const borrowedBookData = {
                userId,
                bookId
            }
            const borrowedBook = new BorrowedBook (borrowedBookData);
            borrowedBook.create();
            request.post(`/api/v1/users/${userId}/return/${bookId}`)
                .set('Accept', 'application/json')
                .expect(400)
                .end((err, res) => {
                    expect(res.body.message).to.eql('Request to borrow is still pending');
                    done(err)
                });
        });
        // retrun book with acceptded borrrow
        it('should return borrowed book when a return request is made for a book with the borrowed status accepted', (done) => {
            const bookData = {
                'title': 'so long a letter',
                'author': 'mariam ba',
                'isbn': 65486565,
                'quantity': 56,
                'publishedYear': 2009
            };
            // create a new book
            const book = new Book (bookData);
            book.create();
            const userData = {
                "username": "simbad",
                "email": "bankudi",
                "password": "love4eva",
                "id": 5
            };
            const userId = userData.id;
            const bookId = book.id;
            const borrowedBookData = {
                userId,
                bookId
            }
            const borrowedBook = new BorrowedBook (borrowedBookData);
            borrowedBook.create();
            // console.log(dummyData.borrowedBooks[borrowedBook.id])
            console.log(dummyData.borrowedBooks[borrowedBook.id].borrowedStatus)
            dummyData.borrowedBooks[borrowedBook.id].borrowedStatus = 'accepted';
            request.post(`/api/v1/users/${userId}/return/${bookId}`)
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    expect(res.body.borrowedBook).to.eql(borrowedBook);
                    done(err)
                });
        });
    });
});