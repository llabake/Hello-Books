import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';
import userData from '../tests/mocks/userData';
import bookData from '../tests/mocks/bookData';

const { BorrowBook, Book, User } = models;
const request = supertest(app);
const { expect } = chai;


describe('Borrow Book Endpoint Functionality', () => {
  describe('Aunthenticated user can borrow a book', () => {
    beforeEach((done) => {
      BorrowBook.destroy({ where: {} })
        .then(() => {
        }); Book.destroy({ where: {} })
        .then(() => {
        });
      User.destroy({ where: {} })
        .then(() => {
          done();
        });
    });
    after((done) => {
      BorrowBook.destroy({ where: {} })
        .then(() => {
        }); Book.destroy({ where: {} })
        .then(() => {
        });
      User.destroy({ where: {} })
        .then(() => {
          done();
        });
    });
    it('it should return missing token', (done) => {
      const user = userData.user1;
      User.create(user).then(() => {
        const book = bookData.book1;
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/users/borrow/${createdBook.id}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(401);
              expect(res.body.error)
                .to.eql('Missing token.Expects token in header with key as Authorization');
              done(err);
            });
        });
      });
    });
    it('it should return invalid token', (done) => {
      const user = userData.user1;
      const token = '956236789hgsdfgh96238755';
      User.create(user).then(() => {
        const book = bookData.book1;
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/users/borrow/${createdBook.id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(401);
              expect(res.body.error)
                .to.eql('Authentication failed. Invalid access token');
              done(err);
            });
        });
      });
    });
    xit('it should return expired token', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/users/borrow/${createdBook.id}`)
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
    it('it should not allow a logged out user borrow a book', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/users/borrow/${createdBook.id}`)
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
    it('it should not allow borrow action if a book does not exist', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const bookId = 2087050;
          const token = generateToken(createdUser);
          request.post(`/api/v1/users/borrow/${bookId}`)
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
    it('it should not allow borrow action by a user that does not exist', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const bookId = 2;
          const token = generateToken(createdUser);
          createdUser.destroy().then(() => {
            request.post(`/api/v1/users/borrow/${bookId}`)
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
    it('it should return request made earlier', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.post(`/api/v1/users/borrow/${createdBook.id}`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(409);
                    expect(res.body.message).to.eql(`You have made a request earlier on ${createdBook.title}, it is pending approval by Administrator`);
                    done(err);
                  });
              });
          });
        });
      });
    });
    it('it should ask user to return pending books', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then((createdBorrowedBook) => {
                createdBorrowedBook.update({
                  borrowStatus: 'accepted',
                  returnStatus: '',
                  expectedReturnDate: new Date(Date.now() - (14 * 24 * 60 * 60 * 1000)),
                  BorrowDate: new Date(Date.now() - (28 * 24 * 60 * 60 * 1000)),
                }).then(() => {
                  request.post(`/api/v1/users/borrow/${createdBook.id}`)
                    .set('Accept', 'application/json')
                    .set('Authorization', token)
                    .end((err, res) => {
                      expect(403);
                      expect(res.body).to.have.own.property('book');
                      expect(res.body.book).to.eql(createdBook.title);
                      expect(res.body.message).to.eql('You have to return the book with you before you can make a new request');
                      done(err);
                    });
                });
              });
          });
        });
      });
    });
    it('it should return book currently unavailable', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book3;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            request.post(`/api/v1/users/borrow/${createdBook.id}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(400);
                expect(res.body.message).to.eql(`${book.title} presently unavailable for borrow`);
                done(err);
              });
          });
        });
      });
    });
    it('it should successfully borrow a book', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book2;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            request.post(`/api/v1/users/borrow/${createdBook.id}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(201);
                expect(res.body).to.have.own.property('borrowedBook');
                expect(res.body.message).to.eql(`Borrow request has been made on ${book.title} and it is being processed`);
                expect(res.body).to.have.own.property('book');
                done(err);
              });
          });
        });
      });
    });
  });
  describe('Aunthenticated user can return a book', () => {
    beforeEach((done) => {
      BorrowBook.destroy({ where: {} })
        .then(() => {
        }); Book.destroy({ where: {} })
        .then(() => {
        });
      User.destroy({ where: {} })
        .then(() => {
          done();
        });
    });
    after((done) => {
      BorrowBook.destroy({ where: {} })
        .then(() => {
        }); Book.destroy({ where: {} })
        .then(() => {
        });
      User.destroy({ where: {} })
        .then(() => {
          done();
        });
    });
    xit('it should return request not yet attempted', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                createdBook.update({
                  borrowStatus: 'accepted',
                  returnSatus: ''
                }).then(() => {
                  request.post(`/api/v1/users/borrow/${createdBook.id}`)
                    .set('Accept', 'application/json')
                    .set('Authorization', token)
                    .end((err, res) => {
                      expect(409);
                      expect(res.body.message).to.eql(`You have not attempted to return this ${createdBook.title}`);
                      done(err);
                    });
                });
              });
          });
        });
      });
    });
    it('it should successfully return a book', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book2;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id })
              .then((createdBorrowedBook) => {
                createdBorrowedBook.update({
                  borrowStatus: 'accepted'
                })
                  .then(() => {
                    request.post(`/api/v1/users/return/${createdBook.id}`)
                      .set('Accept', 'application/json')
                      .set('Authorization', token)
                      .end((err, res) => {
                        expect(200);
                        expect(res.body).to.have.own.property('borrowedBook');
                        expect(res.body.message).to.eql('Book return request is pending approval by Administrator');
                        done(err);
                      });
                  });
              });
          });
        });
      });
    });
  });
  describe('Aunthenticated admin can accept a borrow request', () => {
    beforeEach((done) => {
      BorrowBook.destroy({ where: {} })
        .then(() => {
        }); Book.destroy({ where: {} })
        .then(() => {
        });
      User.destroy({ where: {} })
        .then(() => {
          done();
        });
    });
    after((done) => {
      BorrowBook.destroy({ where: {} })
        .then(() => {
        }); Book.destroy({ where: {} })
        .then(() => {
        });
      User.destroy({ where: {} })
        .then(() => {
          done();
        });
    });
    it('it should not allow a logged out admin accept book request', (done) => {
      const user = userData.user3;
      User.create(user).then((createdUser) => {
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.put(`/api/v1/admin/user/${createdUser.id}/borrow/${createdBook.id}`)
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
    it('it should not allow a normal user accept book request', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.put(`/api/v1/admin/user/${createdUser.id}/borrow/${createdBook.id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(403);
              expect(res.body.message).to.eql('Permission denied, only an admin can access this route');
              done(err);
            });
        });
      });
    });
    it('it should return borrowed book match not found', (done) => {
      const user = userData.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const bookId = 85624;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.put(`/api/v1/admin/user/${createdUser.id}/borrow/${bookId}`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(404);
                    expect(res.body.message).to.eql('borrowedBook match not found');
                    done(err);
                  });
              });
          });
        });
      });
    });
    xit('it should return borrow request has been accepted', (done) => {
      const user = userData.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then((createdBorrowedBook) => {
                createdBorrowedBook.update({
                  borrowStatus: 'accepted',
                }).then(() => {
                  request.put(`/api/v1/admin/user/${createdUser.id}/borrow/${createdBook.id}`)
                    .set('Accept', 'application/json')
                    .set('Authorization', token)
                    .end((err, res) => {
                      expect(200);
                      expect(res.body.message).to.eql('This book borrow request has been accepted');
                      done(err);
                    });
                });
              });
          });
        });
      });
    });
    it('it should successfully accept book borrow request', (done) => {
      const user = userData.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book2;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.put(`/api/v1/admin/user/${createdUser.id}/borrow/${createdBook.id}`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(200);
                    expect(res.body).to.have.own.property('borrowedBook');
                    expect(res.body.message).to.eql('Successfully accepted borrow request');
                    done(err);
                  });
              });
          });
        });
      });
    });
  });
  describe('Aunthenticated admin can accept a return request', () => {
    beforeEach((done) => {
      BorrowBook.destroy({ where: {} })
        .then(() => {
        }); Book.destroy({ where: {} })
        .then(() => {
        });
      User.destroy({ where: {} })
        .then(() => {
          done();
        });
    });
    after((done) => {
      BorrowBook.destroy({ where: {} })
        .then(() => {
        }); Book.destroy({ where: {} })
        .then(() => {
        });
      User.destroy({ where: {} })
        .then(() => {
          done();
        });
    });
    it('it should not allow a logged out admin accept book request', (done) => {
      const user = userData.user3;
      User.create(user).then((createdUser) => {
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.put(`/api/v1/admin/user/${createdUser.id}/return/${createdBook.id}`)
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
    it('it should not allow a normal user accept book request', (done) => {
      const user = userData.user1;
      User.create(user).then((createdUser) => {
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.put(`/api/v1/admin/user/${createdUser.id}/borrow/${createdBook.id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(403);
              expect(res.body.message).to.eql('Permission denied, only an admin can access this route');
              done(err);
            });
        });
      });
    });
    it('it should return borrowed book match not found', (done) => {
      const user = userData.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const bookId = 85624;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.put(`/api/v1/admin/user/${createdUser.id}/return/${bookId}`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(404);
                    expect(res.body.message).to.eql('borrowedBook match not found');
                    done(err);
                  });
              });
          });
        });
      });
    });
    xit('it should return return request has been accepted', (done) => {
      const user = userData.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then((createdBorrowedBook) => {
                createdBorrowedBook.update({
                  returnStatus: 'accepted',
                }).then(() => {
                  request.put(`/api/v1/admin/user/${createdUser.id}/return/${createdBook.id}`)
                    .set('Accept', 'application/json')
                    .set('Authorization', token)
                    .end((err, res) => {
                      expect(200);
                      expect(res.body.message).to.eql('This book return request has been accepted');
                      done(err);
                    });
                });
              });
          });
        });
      });
    });
    xit('it should successfully accept book return request', (done) => {
      const user = userData.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book2;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.put(`/api/v1/users/${createdUser.id}/return/${createdBook.id}`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(200);
                    expect(res.body).to.have.own.property('borrowedBook');
                    expect(res.body.message).to.eql('successfully accepted return request');
                    done(err);
                  });
              });
          });
        });
      });
    });

    it('it should successfully get all borrowed books with pending borrow status', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook1;
          const bookb = bookData.validBook2;
          const token = generateToken(createdUser);
          Book.create(booka)
            .then((createdBook) => {
              BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.get('/api/v1/borrowedbooks?borrowStatus=pending')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message)
                    .to.eql('Borrowed books retrieved successfully');
                  expect(res.body).to.have.own.property('borrowedBooks');
                  expect(res.body.borrowedBooks).to.be.an('array').to.have.length(1);
                  done(err);
                });
              })
            });
        });
      });
    });
    it('it should return borrowStatus or returnStatus expected in query', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook1;
          const token = generateToken(createdUser);
          Book.create(booka)
            .then((createdBook) => {
              BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.get('/api/v1/borrowedbooks')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(400);
                  expect(res.body.message)
                    .to.eql('borrowStatus or returnStatus expected in query');
                  done(err);
                });
              })
            });
        });
      });
    });
    it('it should return borrow can either be accepted or pending', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook1;
          const token = generateToken(createdUser);
          Book.create(booka)
            .then((createdBook) => {
              BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.get('/api/v1/borrowedbooks?borrowStatus=pendingstatus')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(400);
                  expect(res.body.message)
                    .to.eql('returnStatus can either be accepted or pending');
                  done(err);
                });
              })
            });
        });
      });
    });
    it('it should return returnStatus can either be accepted or pending', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook1;
          const token = generateToken(createdUser);
          Book.create(booka)
            .then((createdBook) => {
              BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.get('/api/v1/borrowedbooks?returnStatus=pendingstatus')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(400);
                  expect(res.body.message)
                    .to.eql('returnStatus can either be accepted or pending');
                  done(err);
                });
              })
            });
        });
      });
    });
    it('it should successfully get users borrowed books', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook1;
          // const bookb = bookData.validBook2;
          const token = generateToken(createdUser);
          Book.create(booka)
            .then((createdBook) => {
              BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.get('/api/v1/user/borrowed_books')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message)
                    .to.eql('BorrowedBooks history fetched successfully');
                  expect(res.body).to.have.own.property('borrowedBooks');
                  expect(res.body.borrowedBooks).to.be.an('array').to.have.length(1);
                  done(err);
                });
              })
            });
        });
      });
    });
  });
});
