import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';

const { Review, Book, User } = models;
const request = supertest(app);
const { expect } = chai;

const reviewDataTest = {
  validReview1: {
    content: 'mesmerising read',
  },
  validReview2: {
    content: 'suspense filled',
  },
  shortReview: {
    content: 'intrigue',
  },
  emptyReview: {
    content: ''
  }
};
const userDataTest = {
  user1: {
    username: 'keinzy',
    email: 'oyebola.otin@gmail.com',
    password: 'password',
    firstName: 'oyebola',
    lastName: 'ayinla',
    confirmpassword: 'password'
  },
};
const bookDataTest = {
  book1: {
    title: 'so long a letter',
    author: 'mariam ba',
    isbn: 65486565,
    quantity: 56,
    publishedYear: 2009,
    description: 'a book a family'
  },
  book2: {
    title: 'so long a letter',
    author: 'mariam ba',
    isbn: 65486565,
    quantity: 56,
    publishedYear: 2009,
    description: 'a book a family'
  },
};

describe('Review Endpoint Functionality', () => {
  beforeEach((done) => {
    Review.destroy({ where: {} })
      .then(() => {
      }); Book.destroy({ where: {} })
      .then(() => {
      });
    User.destroy({ where: {} })
      .then(() => {
        done();
      });
  });
  describe('User signs in to post a review', () => {
    it('it should return an array of errors to validate empty input', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(()=> {
          const book = bookDataTest.book1;
          const review = reviewDataTest.emptyReview;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            request.post(`/api/v1/books/${createdBook.id}/review`)
              .send(review)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(400);
                expect(res.body).to.eql({
                  errors: [
                    {
                      path: 'content',
                      message: 'content is required'
                    }
                  ]
                });
                done(err);
              });
          });
        });
      });
    });
    it('it should return an array of errors to validate short review content', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookDataTest.book1;
        const review = reviewDataTest.shortReview;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/books/${createdBook.id}/review`)
            .send(review)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(400);
              expect(res.body).to.eql({
                errors: [
                  {
                    path: 'content',
                    message: 'Review content is too short'
                  }
                ]
              });
              done(err);
            });
        });
      });
    });
    it('it should not allow a logged out user post a review', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        const book = bookDataTest.book1;
        const review = reviewDataTest.validReview1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/books/${createdBook.id}/review`)
            .send(review)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(403);
              expect(res.body.message).to.eql(`You are logged out ${user.username}, please log back in`);
              done(err);
            });
        });
      });
    });
    it('it should not allow a post of review if a book does not exist', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const bookId = 200;
        const review = reviewDataTest.validReview1;
        const token = generateToken(createdUser);
        request.post(`/api/v1/books/${bookId}/review`)
          .send(review)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .end((err, res) => {
            expect(404);
            expect(res.body.message).to.eql(`Book with id: ${bookId} not found`);
            done(err);
          });
      });
    });
    it('it should not allow a post of review by a user that does not exist', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const bookId = 200;
        const review = reviewDataTest.validReview1;
        const token = generateToken(createdUser);
        createdUser.destroy();
        request.post(`/api/v1/books/${bookId}/review`)
          .send(review)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .end((err, res) => {
            expect(404);
            expect(res.body.message).to.eql(`User with id: ${createdUser.id} not found`);
            done(err);
          });
      });
    });
    it('it should successfully post a review', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookDataTest.book1;
        const review = reviewDataTest.validReview1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/books/${createdBook.id}/review`)
            .send(review)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(201);
              expect(res.body.message).to.eql('Review has been posted');
              expect(res.body.content).to.eql(review.content);
              done(err);
            });
        });
      });
    });
    it('it should not allow users delete others reviews', (done) => {
      const userA = userDataTest.user1;
      const userB = userDataTest.user2;
      User.bulkCreate([userA, userB])
        .then(() => User.update({ active: true }, { where: {} }))
        .spread(() => User.findAll()).then((users) => {
          const book = bookDataTest.book1;
          const token = generateToken(users[1]);
          Book.create(book).then((createdBook) => {
            Review.create({
              bookId: createdBook.id,
              userId: users[0].id,
              content: 'suspense filled'
            }).then((createdReview) => {
              request.delete(`/api/v1/books/review/${createdReview.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(403);
                  expect(res.body.message).to.eql('You did not post this Review, hence can not delete it');
                  done(err);
                });
            });
          });
        });
    });
    it('it should return review not found', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          Review.create({
            bookId: createdBook.id,
            userId: createdUser.id,
            content: 'suspense filled'
          }).then(() => {
            const reviewId = 5000;
            request.delete(`/api/v1/books/review/${reviewId}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(404);
                expect(res.body.message).to.eql('Review not found');
                done(err);
              });
          });
        });
      });
    });
    it('it should successfully delete a review', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          Review.create({
            bookId: createdBook.id,
            userId: createdUser.id,
            content: 'suspense filled'
          }).then((createdReview) => {
            request.delete(`/api/v1/books/review/${createdReview.id}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(200);
                expect(res.body.message).to.eql('Review deleted successfully');
                done(err);
              });
          });
        });
      });
    });
  });
});
