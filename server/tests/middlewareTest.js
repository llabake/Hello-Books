import supertest from "supertest";
import chai from "chai";
import app from "../../app";
import { dummyData } from '../helpers/modelHelpers'
import Book from '../models/book';
import Review from '../models/review';
import BorrowedBook from '../models/borrowedBook'

global.request = supertest(app);
const expect = chai.expect;


describe('Middleware Functions', () => {
    describe('Book Controller:', () =>{
        beforeEach(() => {
            // runs before each test in this block
            dummyData.books = {};
            dummyData.reviews = {};
            dummyData.favorites = {};
            dummyData.borrowedBooks = {};
            dummyData.users ={};
        });
         // middleware book not found
            it('should return "Book not found. Please check the id" for borrow when book does not exist', (done) => {
                const bookData = {
                    'title': 'so long a letter',
                    'author': 'mariam ba',
                    'isbn': 65486565,
                    'quantity': 56,
                    'publishedYear': 2009
                };
                const book = new Book(bookData);
                book.create();
                // send id invalid for book not found
                const userData = {
                    "username": "keinzy",
                    "email": "ayinla1",
                    "password": "love4eva",
                    "id": 3
                };
                const bookId = 55;
                request.post(`/api/v1/users/${userData.Id}/borrow/${bookId}`)
                    .set('Accept', 'application/json')
                    .expect(404)
                    .end((err, res) => {
                        expect(res.body.message).to.eql('Book not found. Please check the id');
                        done(err)
                    });
            });
            // middleware user not found
            it('should return User not found. for borrow when book does not exist', (done) => {
                const bookData = {
                    'title': 'so long a letter',
                    'author': 'mariam ba',
                    'isbn': 65486565,
                    'quantity': 56,
                    'publishedYear': 2009
                };
                const book = new Book(bookData);
                book.create();
                // send id invalid for book not found
                const userData = {
                    "username": "keinzy",
                    "email": "ayinla1",
                    "password": "love4eva",
                    "id": 3
                };
                const userId = 15;
                request.post(`/api/v1/users/${userId}/borrow/${book.id}`)
                    .set('Accept', 'application/json')
                    .expect(404)
                    .end((err, res) => {
                        expect(res.body.message).to.eql('User not found.');
                        done(err)
                    });
            });
        
    });
});