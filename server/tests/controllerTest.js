import supertest from "supertest";
import chai from "chai";
import app from "../../app";
import { dummyData } from '../helpers/modelHelpers'
import Book from '../models/book';
import Review from '../models/review'

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
            })
        })
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
            })
        })
        it('should return specific error message and the path to the error for invalid input type',(done) => {
            const bookData = {
                rubbishField: 'justrubbish',
                title: 'so long a letter',
                author: 'mariam ba',
                isbn: 65486565,
                quantity: 56
            };
            const args = bookData;
            const key = 'rubbishField'
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
            })
        })
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
            })
        })
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
            })
        })
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
            })
        })
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
                })
        })
    })
})