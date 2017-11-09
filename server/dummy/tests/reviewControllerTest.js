import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import { dummyData } from '../helpers/modelHelpers';
import Book from '../models/book';
import Favorite from '../models/favorite';

const request = supertest(app);
const { expect } = chai;


describe('Controller Functions', () => {
  describe('Review Controller:', () => {
    beforeEach(() => {
      // runs before each test in this block
      dummyData.books = {};
      dummyData.reviews = {};
      dummyData.favorites = {};
      dummyData.borrowedBooks = {};
      dummyData.users = {};
    });
    it('should create a book review', (done) => {
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
      const reviewData = { text: 'granduer' };
      dummyData.users[userData.id] = userData;
      request.post(`/api/v1/users/${userData.id}/review/${book.id}`)
        .set('Accept', 'application/json')
        .send(reviewData)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to
            .eql(`Review with content: ${reviewData.text} has been added`);
          expect(Object.prototype.hasOwnProperty.call(res.body, 'review'))
            .to.eql(true);
          done(err);
        });
    });
  });
});
