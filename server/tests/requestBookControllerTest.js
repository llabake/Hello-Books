import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';
import userData from '../tests/mocks/userData';
import bookData from '../tests/mocks/bookData';

const { RequestBook, User } = models;
const request = supertest(app);
const { expect } = chai;

describe('RequestBook Endpoint Functionality', () => {
  describe('Authenticated user can request a book', () => {
    beforeEach((done) => {
      RequestBook.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true
      }).then(() => {
          User.destroy({
            cascade: true,
            truncate: true,
            restartIdentity: true
          }).then(() => {
            done();
          })
      })
    })
    
    it('should not allow a logged out user suggest a book', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        const book = bookData.suggestedBook2;
        const token = generateToken(createdUser);
        RequestBook.create({
          title: book.title,
          author: book.author,
          userId: createdUser.id
        }).then(() => {
          request.post(`/api/v1/books/suggest-Book`)
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
    it('should not allow book suggestion action by a user that does not exist', (done) => {
      const user = userData.validUser5;
      const book = bookData.suggestedBook1
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          createdUser.destroy().then(() => {
              const suggestion = {
                title: book.title,
                author: book.author,
                userId: createdUser.id
              }
              request.post(`/api/v1/books/suggest-Book`)
                .send(suggestion)
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
    it('should return fields are required when suggesting books', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
            request.post(`/api/v1/books/suggest-Book`)
              .send({})
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(404);
                expect(res.body).to.eql({
                  errors: {
                    title: "title is required",
                    author: 'author is required'
                  }
                });
                done(err);
              });
        });
      });
    });
    it('should validate that inputs are present when suggesting books', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const suggestion = { title: '', author: '', userId: createdUser.id }
          request.post(`/api/v1/books/suggest-Book`)
            .send(suggestion)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(404);
              expect(res.body).to.eql({
                errors: {
                  title: "Title can not be blank",
                  author: 'Author can not be blank'
                }
              });
              done(err);
            });
        });
      });
    });
    it('should successfully create a book request', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.suggestedBook2;
          const token = generateToken(createdUser);
          const suggestion = {
            title: book.title,
            author: book.author,
            userId: createdUser.id
          }
          request.post(`/api/v1/books/suggest-Book`)
            .send(suggestion)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(201);
              expect(res.body.message).to.eql('Thank you for the book suggestion, the management is always at your service');
              expect(res.body.requestedBook.title).to.eql(book.title);
              expect(res.body.requestedBook.author).to.eql(book.author);
              expect(res.body).to.have.own.property('requestedBook');
              done(err);
            });
        });
      });
    });
  });
});
