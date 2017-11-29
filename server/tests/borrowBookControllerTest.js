import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';

const { BorrowBook, Book, User } = models;
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
  },
  user3: {
    username: 'peju',
    email: 'pejupopoola@gmail.com',
    password: 'olaolegan',
    confirmpassword: 'olaolegan',
    firstName: 'adepeju',
    lastName: 'popoola',
    role: 'admin'
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
  book3: {
    title: 'The secret life of baba segi wife',
    author: 'Lola Soneyin',
    isbn: 565,
    quantity: 0,
    publishedYear: 2009,
    description: 'a book a family'
  },
};

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
    it('it should not allow a logged out user borrow a book', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        const book = bookDataTest.book1;
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
      const user = userDataTest.user1;
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
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const bookId = 200;
          const token = generateToken(createdUser);
          createdUser.destroy();
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
    it('it should return request made earlier', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
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
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
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
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book3;
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
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book2;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            request.post(`/api/v1/users/borrow/${createdBook.id}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(201);
                expect(res.body).to.have.own.property('borrowedBook');
                expect(res.body.message).to.eql(`borrow request has been made on ${book.title} and it is being processed`);
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
    it('it should not allow a logged out user return a book', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/users/return/${createdBook.id}`)
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
    it('it should not allow return action by a user that does not exist', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const bookId = 200;
          const token = generateToken(createdUser);
          createdUser.destroy();
          request.post(`/api/v1/users/return/${bookId}`)
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
    it('it should return borrowed book match not found', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const bookId = 85624;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.post(`/api/v1/users/return/${bookId}`)
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
    it('it should return borrow request has not been accepted', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then((createdBorrowedBook) => {
                createdBorrowedBook.update({
                  borrowStatus: 'pending',
                }).then(() => {
                  request.post(`/api/v1/users/return/${createdBook.id}`)
                    .set('Accept', 'application/json')
                    .set('Authorization', token)
                    .end((err, res) => {
                      expect(200);
                      expect(res.body.message).to.eql('This book borrow request has not been accepted');
                      done(err);
                    });
                });
              });
          });
        });
      });
    });
    it('it should successfully return a book', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book2;
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
      const user = userDataTest.user3;
      User.create(user).then((createdUser) => {
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.put(`/api/v1/users/${createdUser.id}/borrow/${createdBook.id}`)
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
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.put(`/api/v1/users/${createdUser.id}/borrow/${createdBook.id}`)
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
      const user = userDataTest.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const bookId = 85624;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.put(`/api/v1/users/${createdUser.id}/borrow/${bookId}`)
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
    it('it should return borrow request has been accepted', (done) => {
      const user = userDataTest.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then((createdBorrowedBook) => {
                createdBorrowedBook.update({
                  borrowStatus: 'accepted',
                }).then(() => {
                  request.put(`/api/v1/users/${createdUser.id}/borrow/${createdBook.id}`)
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
      const user = userDataTest.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book2;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.put(`/api/v1/users/${createdUser.id}/borrow/${createdBook.id}`)
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(200);
                    expect(res.body).to.have.own.property('borrowedBook');
                    expect(res.body.message).to.eql('successfully accepted borrow request');
                    done(err);
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
      const user = userDataTest.user3;
      User.create(user).then((createdUser) => {
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.put(`/api/v1/users/${createdUser.id}/return/${createdBook.id}`)
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
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.put(`/api/v1/users/${createdUser.id}/borrow/${createdBook.id}`)
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
      const user = userDataTest.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const bookId = 85624;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then(() => {
                request.put(`/api/v1/users/${createdUser.id}/return/${bookId}`)
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
    it('it should return borrow request has been accepted', (done) => {
      const user = userDataTest.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            BorrowBook.create({ userId: createdUser.id, bookId: createdBook.id, })
              .then((createdBorrowedBook) => {
                createdBorrowedBook.update({
                  returnStatus: 'accepted',
                }).then(() => {
                  request.put(`/api/v1/users/${createdUser.id}/return/${createdBook.id}`)
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
    it('it should successfully accept book borrow request', (done) => {
      const user = userDataTest.user3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookDataTest.book2;
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
  });
});
