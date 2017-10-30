// import supertest from "supertest";
// import chai from "chai";
// import app from "../../app";
// import { dummyData } from '../helpers/modelHelpers'
// import Book from '../models/book';
// import Favorite from '../models/favorite';

// global.request = supertest(app);
// const expect = chai.expect;


// describe('Controller Functions', () => {
//     describe('Favorite Controller:', () =>{
//         beforeEach(() => {
//             // runs before each test in this block
//             dummyData.books = {};
//             dummyData.reviews = {};
//             dummyData.favorites = {};
//             dummyData.borrowedBooks = {};
//             dummyData.users ={};
//         });
//         it('should add a book as favorite',(done) => {
//             const bookData = {
//                 'title': 'so long a letter',
//                 'author': 'mariam ba',
//                 'isbn': 65486565,
//                 'quantity': 56,
//                 'publishedYear': 2009
//             };
//             const book = new Book(bookData);
//             book.create();
//             const userData = {
//                 "username": "keinzy",
//                 "email": "ayinla1",
//                 "password": "love4eva",
//                 "id": 3
//             };
//             const favorite = new Favorite();
//             favorite.create();
//             console.log(dummyData.favorites)
//             console.log(dummyData.users)
//             request.post(`/api/v1/users/${userData.id}/fav/${book.id}`)
//                 .set('Accept', 'application/json')
//                 .expect(201)
//                 .end((err, res) => {
//                     expect(res.body.message).to.eql(`The book: ${book.title} has been added to your favorite list`);
//                     expect(res.body.book.title).to.eql(bookData.title);
//                     expect(Object.prototype.hasOwnProperty.call(res.body.book, 'id')).to.eql(true)
//                     done(err);
//                 });
//         });
//         xit('should get a all book', (done) => {
//             const bookData1 = {
//                 'title': 'so long a letter',
//                 'author': 'mariam ba',
//                 'isbn': 65486565,
//                 'quantity': 56,
//                 'publishedYear': 2009
//             };
//             const book1 = new Book(bookData1);
//             book1.create();
//             const bookData2 = {
//                 'title': 'Alapata Apata',
//                 'author': 'Wole Soyinka',
//                 'isbn': 12345565,
//                 'quantity': 6,
//                 'publishedYear': 2003
//             };
//             const book2 = new Book(bookData2);
//             book2.create();
//             const bookData3 = {
//                 'title': 'Reclaim Your Heart',
//                 'author': 'Yasmin Mogahed',
//                 'isbn': 5645565,
//                 'quantity': 8,
//                 'publishedYear': 2013
//             };
//             const book3 = new Book(bookData3);
//             book3.create();
//             request.get('/api/v1/books/')
//                 .set('Accept', 'application/json')
//                 .expect(200)
//                 .end((err, res) => {
//                     expect(res.body.books).to.have.lengthOf(3);
//                     expect(res.body.books).to.deep.include(book1);
//                     expect(res.body.books).to.deep.include(book2);
//                     expect(res.body.books).to.deep.include(book3);
//                     expect(res.body.books[res.body.books.length - 1].title).to.eql(book3.title);
//                     done(err)
//                 });
//         });
//     });
// });