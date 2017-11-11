import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import { dummyData } from '../dummy/helpers/modelHelpers';
// change them back to model
import Book from '../dummy/models/book';
import Favorite from '../dummy/models/favorite';

const request = supertest(app);
const { expect } = chai;


describe('Controller Functions', () => {
  describe('Favorite Controller:', () => {
    beforeEach(() => {
      // runs before each test in this block
      dummyData.books = {};
      dummyData.reviews = {};
      dummyData.favorites = {};
      dummyData.borrowedBooks = {};
      dummyData.users = {};
    });
    it('should add a book as favorite', (done) => {
      const bookData = {
        title: 'so long a letter',
        author: 'mariam ba',
        isbn: 65486565,
        quantity: 56,
        publishedYear: 2009
      };
      const book = new Book(bookData);
      book.create();
      const userData = {
        username: 'keinzy',
        email: 'ayinla1',
        password: 'love4eva',
        id: 3
      };
      dummyData.users[userData.id] = userData;
      request.post(`/api/v1/users/${userData.id}/fav/${book.id}`)
        .set('Accept', 'application/json')
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to
            .eql(`The book: ${book.title} has been added to your favorite list`);
          expect(Object.prototype.hasOwnProperty.call(res.body.favorite, 'id'))
            .to.eql(true);
          done(err);
        });
    });
    it('should get a all book', (done) => {
      const userData = {
        username: 'keinzy',
        email: 'ayinla1',
        password: 'love4eva',
        id: 3
      };
      const bookData1 = {
        title: 'so long a letter',
        author: 'mariam ba',
        isbn: 65486565,
        quantity: 56,
        publishedYear: 2009
      };
      const book1 = new Book(bookData1);
      book1.create();
      const favorite1 = new Favorite({ userId: userData.id, bookId: book1.id });
      favorite1.create();
      const bookData2 = {
        title: 'Alapata Apata',
        author: 'Wole Soyinka',
        isbn: 12345565,
        quantity: 6,
        publishedYear: 2003
      };
      const book2 = new Book(bookData2);
      book2.create();
      const favorite2 = new Favorite({ userId: userData.id, bookId: book2.id });
      favorite2.create();
      dummyData.users[userData.id] = userData;
      request.get(`/api/v1/users/${userData.id}/favbooks`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.userFavorites).to.have.lengthOf(2);
          expect(res.body.userFavorites).to.deep.include(favorite1);
          expect(res.body.userFavorites).to.deep.include(favorite2);
          done(err);
        });
    });
  });
});
