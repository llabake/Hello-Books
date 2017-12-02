import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';

const { Vote, Book, User } = models;
const request = supertest(app);
const { expect } = chai;

const userDataTest = {
  user1: {
    username: 'keinzy',
    email: 'oyebola.otin@gmail.com',
    password: 'password',
    firstName: 'oyebola',
    lastName: 'ayinla',
    confirmpassword: 'password'
  },
  user2: {
    username: 'solape',
    email: 'damywuraola@gmail.com',
    password: 'damola',
    confirmpassword: 'damola',
    firstName: 'adedamola',
    lastName: 'wuraola'
  }
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

describe('Vote Endpoint Functionality', () => {
  describe('Aunthenticated user can vote a book', () => {
    beforeEach((done) => {
      Vote.destroy({ where: {} })
        .then(() => {
        }); Book.destroy({ where: {} })
        .then(() => {
        });
      User.destroy({ where: {} })
        .then(() => {
          done();
        });
    });
    it('it should not allow a logged out user vote a book', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/books/${createdBook.id}/upvote`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(403);
              expect(res.body.message)
                .to.eql(`You are logged out ${user.username}, please log back in`);
              done(err);
            });
        });
      });
    });
    it('it should not allow vote action if a book does not exist', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const bookId = 2087050;
          const token = generateToken(createdUser);
          request.post(`/api/v1/books/${bookId}/upvote`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(404);
              expect(res.body.message)
                .to.eql(`Book with id: ${bookId} not found`);
              done(err);
            });
        });
      });
    });
    it('it should not allow vote action by a user that does not exist', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          createdUser.destroy().then(() =>{
            Book.create(bookDataTest.book1).then((createdBook) => {
              request.post(`/api/v1/books/${createdBook.id}/upvote`)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(404);
                  expect(res.body.message)
                    .to.eql(`User with id: ${createdUser.id} not found`);
                  done(err);
                });
            });
          });
        });
      });
    });
    it('it should return already upvoted book', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            Vote.create({ userId: createdUser.id, bookId: createdBook.id, voteType: 'upVote' })
              .then(() => {
                request.post(`/api/v1/books/${createdBook.id}/upvote`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(409);
                    expect(res.body.message).to.eql('You already upvoted this book');
                    done(err);
                  });
              });
          });
        });
      });
    });
    it('it should return successfully downvoted a book', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            Vote.create({ userId: createdUser.id, bookId: createdBook.id, voteType: 'downVote' })
              .then(() => {
                request.post(`/api/v1/books/${createdBook.id}/upvote`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(200);
                    expect(res.body.message).to.eql('You have successfully upvoted this book');
                    expect(res.body).to.have.own.property('book');
                    done(err);
                  });
              });
          });
        });
      });
    });
    it('it should successfully upvote a book', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            request.post(`/api/v1/books/${createdBook.id}/upvote`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(200);
                expect(res.body.message).to.eql('You have successfully upvoted this book');
                expect(res.body).to.have.own.property('book');
                done(err);
              });
          });
        });
      });
    });
    it('it should return already downvoted book', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            Vote.create({ userId: createdUser.id, bookId: createdBook.id, voteType: 'downVote' })
              .then(() => {
                request.post(`/api/v1/books/${createdBook.id}/downvote`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(409);
                    expect(res.body.message).to.eql('You already downvoted this book');
                    done(err);
                  });
              });
          });
        });
      });
    });
    it('it should return successfully upvoted a book', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            Vote.create({ userId: createdUser.id, bookId: createdBook.id, voteType: 'upVote' })
              .then(() => {
                request.post(`/api/v1/books/${createdBook.id}/downvote`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(200);
                    expect(res.body.message).to.eql('You have successfully downvoted this book');
                    expect(res.body).to.have.own.property('book');
                    done(err);
                  });
              });
          });
        });
      });
    });
    it('it should successfully downvote a book', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            request.post(`/api/v1/books/${createdBook.id}/downvote`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(200);
                expect(res.body.message).to.eql('You have successfully downvoted this book');
                expect(res.body).to.have.own.property('book');
                done(err);
              });
          });
        });
      });
    });
  });
});
