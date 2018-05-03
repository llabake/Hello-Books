import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';
import userData from '../tests/mocks/userData';
import bookData from '../tests/mocks/bookData';

const { Favorite, Book, User } = models;
const request = supertest(app);
const { expect } = chai;

describe('Favorite Endpoint Functionality', () => {
  describe('User signs in to add a book as a favorite', () => {
    beforeEach((done) => {
      Favorite.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true
      }).then(() => {
          Book.destroy({
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
    })
    it('should not allow a logged out user mark book as favorite', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/books/fav/${createdBook.id}`)
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
    it('should not add a book that does not exist as favorite', (done) => {
      const user = userData.validUser6;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const bookId = 200;
          const token = generateToken(createdUser);
          request.post(`/api/v1/books/fav/${bookId}`)
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
    it('should not allow a user that does not exist add book as favorite', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const bookId = 200;
          const token = generateToken(createdUser);
          createdUser.destroy().then(() => {
            request.post(`/api/v1/books/fav/${bookId}`)
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
    it('should successfully mark a book as favorite', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/books/fav/${createdBook.id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(201);
              expect(res.body.message).to.eql(`'${createdBook.title}' has been added to your favorite list`);
              expect(res.body).to.have.own.property('favorite');
              expect(res.body).to.have.own.property('book');
              done(err);
            });
        });
      });
    });
    it('should not add a book as favorite twice', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          Favorite.create({
            bookId: createdBook.id,
            userId: createdUser.id
          }).then(() => {
            request.post(`/api/v1/books/fav/${createdBook.id}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(409);
                expect(res.body.message).to.eql(`'${createdBook.title}' already on your favorite list`);
                done(err);
              });
          });
        });
      });
    });
    it('should successfully get a single favorite list item', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          Favorite.create({
            bookId: createdBook.id,
            userId: createdUser.id
          }).then(() => {
            request.get('/api/v1/users/favbooks/')
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(201);
                expect(res.body.message).to.eql('Favorite Book(s) retrieved successfully');
                expect(res.body).to.have.own.property('favorites');
                done(err);
              });
          });
        });
      });
    });
    it('should return an empty array if no books on the favorite list', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then(() => {
          request.get('/api/v1/users/favbooks/')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(200);
              expect(res.body.message).to.eql('There are no Books on your Favorite List');
              expect(res.body).to.have.own.property('favorites').to.have.length(0);
              done(err);
            });
        });
      });
    });
    it('should successfully get a list of users favorite books', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const userId = createdUser.id;
          const booka = bookData.book1;
          const bookb = bookData.book2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAll())
            .then((books) => {
              Favorite.bulkCreate([
                { bookId: books[0].id, userId },
                { bookId: books[1].id, userId },
              ]).then(() => {
                request.get('/api/v1/users/favbooks/')
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(201);
                    expect(res.body.message)
                      .to.eql('Favorite Book(s) retrieved successfully');
                    expect(res.body).to.have.own.property('favorites');
                    done(err);
                  });
              });
            });
        });
      });
    });
    it('should return book not found on favorite list', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const userId = createdUser.id;
        const booka = bookData.book1;
        const bookb = bookData.book2;
        const token = generateToken(createdUser);
        Book.bulkCreate([booka, bookb])
          .then(() => Book.findAll()).then((books) => {
            Favorite.bulkCreate([
              { bookId: books[0].id, userId },
              { bookId: books[1].id, userId },
            ])
              .then(() => Favorite.findAll())
              .then(() => {
                const bookId = 500;
                request.delete(`/api/v1/users/favbooks/${bookId}/`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(404);
                    expect(res.body.message).to.eql(`Book with id:${bookId} is not on your Favorite List`);
                    done(err);
                  });
              });
          });
      });
    });
    it('should successfully delete book from a user favorite list', (done) => {
      const user = userData.validUser8;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const userId = createdUser.id;
          const booka = bookData.book1;
          const bookb = bookData.book2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAll())
            .then((books) => {
              Favorite.bulkCreate([
                { bookId: books[0].id, userId },
                { bookId: books[1].id, userId },
              ]);
              request.delete(`/api/v1/users/favbooks/${books[0].id}/`)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message)
                    .to.eql(`'${booka.title}' has been removed from your favorite list`);
                  expect(res.body).to.have.own.property('book')
                  done(err);
                });
            });
        });
      });
    });
  });
});
