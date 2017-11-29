import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';

const { Book, User } = models;
const request = supertest(app);
const { expect } = chai;

const bookDataTest = {
  validBook1: {
    title: 'fine boys',
    author: 'ehabsuen',
    isbn: 27565,
    quantity: 6,
    publishedYear: 2015,
    description: 'juvenile adventure'
  },
  validBook2: {
    title: 'There Was A Country',
    author: 'Chinua Achebe',
    isbn: 65486565,
    quantity: 56,
    publishedYear: 2008,
    description: 'a book on nation building'
  },
  validBook3: {
    title: 'Lean Start Up',
    author: 'Eric Reis',
    isbn: 687565,
    quantity: 6,
    publishedYear: 2015,
    description: 'a start up book'
  },
  emptyBookDetail: {},
  zeroQuantity: {
    title: 'Alapata Apata',
    author: 'Wole Soyinka',
    isbn: '8655',
    quantity: 0,
    publishedYear: '2009',
    description: 'a book a family'
  },
  stringQuantity: {
    title: 'Alapata Apata',
    author: 'Wole Soyinka',
    isbn: 6565,
    quantity: 'pj',
    publishedYear: 2009,
    description: 'a book a family'
  },
  stringIsbnAndPublishedYear: {
    title: 'Alapata Apata',
    author: 'Wole Soyinka',
    isbn: '@=p',
    quantity: 8,
    publishedYear: 'p@}}',
    description: 'a book a family'
  },
  bookUpdate: {
    title: 'Country',
    author: 'Chinua'
  },
  bookUpdateIsbn: {
    isbn: 865275
  }
};
const userDataTest = {
  normalUser: {
    username: 'keinzy',
    email: 'oyebola.otin@gmail.com',
    password: 'password',
    firstName: 'oyebola',
    lastName: 'ayinla',
    confirmpassword: 'password'
  },
  normalUser1: {
    username: 'solape',
    email: 'damywuraola@gmail.com',
    password: 'damola',
    firstName: 'adedamola',
    lastName: 'wuraola',
    confirmpassword: 'damola'
  },
  adminUser: {
    username: 'flakky',
    email: 'flakkykitche@gmail.com',
    password: 'tobi',
    firstName: 'Folake',
    lastName: 'Onamusi',
    confirmpassword: 'tobi',
    role: 'admin'
  },
  adminUser1: {
    username: 'kech',
    email: 'nkechiokoye@gmail.com',
    password: 'kingsley',
    firstName: 'Nkechi',
    lastName: 'Okoye',
    confirmpassword: 'kingsley',
    role: 'admin'
  },
  adminUser2: {
    username: 'ramlah',
    email: 'bra@gmail.com',
    password: 'dieko',
    firstName: 'Ramlah',
    lastName: 'Babatunde',
    confirmpassword: 'dieko',
    role: 'admin'
  },
};

describe('Index route:', () => {
  it('it should return welcome message', (done) => {
    request.get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.eql({ message: 'Welcome to Hello Books' });
        done(err);
      });
  });
});

describe('Book Endpoint Functionality', () => {
  describe('Book addition', () => {
    beforeEach((done) => {
      Book.destroy({ where: {} })
        .then(() => {
          User.destroy({ where: {} })
            .then(() => {
              done();
            });
        });
    });
    it('it should return an array of errors to validate book input', (done) => {
      User.create(userDataTest.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send({})
            .end((err, res) => {
              expect(400);
              expect(res.body).to.eql({
                errors: [
                  {
                    path: 'title',
                    message: 'title is required'
                  },
                  {
                    path: 'author',
                    message: 'author is required'
                  },
                  {
                    path: 'publishedYear',
                    message: 'publishedYear is required'
                  },
                  {
                    path: 'isbn',
                    message: 'isbn is required'
                  },
                  {
                    path: 'quantity',
                    message: 'quantity is required'
                  },
                  {
                    path: 'description',
                    message: 'description is required'
                  },
                  {
                    path: 'publishedYear',
                    message: 'PublishedYear can only be a number'
                  },
                  {
                    path: 'isbn',
                    message: 'isbn can only be a number'
                  },
                  {
                    path: 'quantity',
                    message: 'Quantity must be a number and greater than zero'
                  }
                ]
              });
              done(err);
            });
        });
      });
    });
    it('it should check PublishedYear and isbn are numbers', (done) => {
      User.create(userDataTest.adminUser1).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(bookDataTest.stringIsbnAndPublishedYear)
            .end((err, res) => {
              expect(400);
              expect(res.body).to.eql({
                errors: [
                  {
                    path: 'publishedYear',
                    message: 'PublishedYear can only be a number'
                  },
                  {
                    path: 'isbn',
                    message: 'isbn can only be a number'
                  },
                ]
              });
              done(err);
            });
        });
      });
    });
    it('it should check that quantity is greater than zero', (done) => {
      User.create(userDataTest.adminUser2).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(bookDataTest.zeroQuantity)
            .end((err, res) => {
              expect(400);
              expect(res.body).to.eql({
                errors: [
                  {
                    path: 'quantity',
                    message: 'Quantity must be a number and greater than zero'
                  }
                ]
              });
              done(err);
            });
        });
      });
    });
    it('it should check that quantity is a number', (done) => {
      User.create(userDataTest.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(bookDataTest.stringQuantity)
            .end((err, res) => {
              expect(400);
              expect(res.body).to.eql({
                errors: [
                  {
                    path: 'quantity',
                    message: 'Quantity must be a number and greater than zero'
                  }
                ]
              });
              done(err);
            });
        });
      });
    });
    it('it should not allow a normal user add a book', (done) => {
      User.create(userDataTest.normalUser1).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(bookDataTest.validBook1)
            .end((err, res) => {
              expect(403);
              expect(res.body.message).to.eql('Permission denied, only an admin can access this route');
              done(err);
            });
        });
      });
    });
    it('it should successfully add a book', (done) => {
      User.create(userDataTest.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookDataTest.validBook2;
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(book)
            .end((err, res) => {
              expect(201);
              expect(res.body.message).to.eql(`Book with title: ${book.title} has been added`);
              expect(res.body).to.have.own.property('book');
              done(err);
            });
        });
      });
    });
    it('it should not add two books with same isbn', (done) => {
      User.create(userDataTest.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookDataTest.validBook2;
          Book.create(book).then(() => {
            request.post('/api/v1/books')
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .send(book)
              .end((err, res) => {
                expect(409);
                expect(res.body.message).to.eql(`Book with isbn: ${book.isbn} already exist`);
                done(err);
              });
          });
        });
      });
    });
    it('it should return book not found', (done) => {
      User.create(userDataTest.normalUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookDataTest.validBook2;
          Book.create(book).then(() => {
            const bookId = 586065;
            request.get(`/api/v1/books/${bookId}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(404);
                expect(res.body.message).to.eql(`No Book exist with id: ${bookId}`);
                done(err);
              });
          });
        });
      });
    });
    it('it should successfully get a book', (done) => {
      User.create(userDataTest.normalUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookDataTest.validBook2;
          Book.create(book).then((createdBook) => {
            request.get(`/api/v1/books/${createdBook.id}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(200);
                expect(res.body).to.have.own.property('book');
                expect(res.body.book).to.have.own.property('downVotes');
                expect(res.body.book).to.have.own.property('upVotes');
                expect(res.body.book).to.have.own.property('reviews');
                expect(res.body.book).to.have.own.property('borrowCount');
                expect(res.body.book.id).to.eql(createdBook.id);
                expect(res.body.book.title).to.eql(createdBook.title);
                done(err);
              });
          });
        });
      });
    });
    it('it should not allow a normal user modify a book', (done) => {
      User.create(userDataTest.normalUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookDataTest.validBook2;
          Book.create(book).then((createdBook) => {
            request.put(`/api/v1/books/${createdBook.id}`)
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
    });
    it('it should modify a book', (done) => {
      User.create(userDataTest.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookDataTest.validBook2;
          Book.create(book).then((createdBook) => {
            request.put(`/api/v1/books/${createdBook.id}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .send(bookDataTest.bookUpdate)
              .end((err, res) => {
                expect(200);
                expect(res.body.book.title).to.eql(bookDataTest.bookUpdate.title);
                expect(res.body.book.author).to.eql(bookDataTest.bookUpdate.author);
                expect(res.body.message).to.eql('Your book has been updated');
                done(err);
              });
          });
        });
      });
    });
    xit('it should not modify a book isbn number', (done) => {
      User.create(userDataTest.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookDataTest.validBook2;
          Book.create(book).then((createdBook) => {
            request.put(`/api/v1/books/${createdBook.id}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .send(bookDataTest.bookUpdateIsbn)
              .end((err, res) => {
                // expect(500);
                expect(200);
                // expect(res.body.message).to.eql('error sending your request');
                expect(res.body.book.title).to.eql(bookDataTest.bookUpdate.title);
                expect(res.body.book.author).to.eql(bookDataTest.bookUpdate.author);
                expect(res.body.message).to.eql('Your book has been updated');
                done(err);
              });
          });
        });
      });
    });
    it('it should successfully get all books in the library', (done) => {
      const user = userDataTest.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookDataTest.validBook1;
          const bookb = bookDataTest.validBook2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAll())
            .then(() => {
              request.get('/api/v1/books')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message)
                    .to.eql('Books retrieved successfully');
                  expect(res.body).to.have.own.property('books');
                  expect(res.body.books[0]).to.have.own.property('downVotes');
                  expect(res.body.books[0]).to.have.own.property('upVotes');
                  expect(res.body.books[0]).to.have.own.property('reviews');
                  expect(res.body.books[0]).to.have.own.property('borrowCount');
                  expect(res.body.books).to.be.an('array');
                  done(err);
                });
            });
        });
      });
    });
    it('it should return books unavailable', (done) => {
      const user = userDataTest.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.get('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(200);
              expect(res.body.message)
                .to.eql('Books are unavailable now, do check back later');
              expect(res.body).to.have.own.property('books');
              expect(res.body.books).to.be.an('array').to.have.lengthOf(0);
              done(err);
            });
        });
      });
    });
    it('it should successfully get all books by upvotes', (done) => {
      const user = userDataTest.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const secondInOrder = Object.assign(bookDataTest.validBook1, { upVotes: 10 });
          const lastInOrder = Object.assign(bookDataTest.validBook2, { upVotes: 8 });
          const firstInOrder = Object.assign(bookDataTest.validBook3, { upVotes: 20 });
          const token = generateToken(createdUser);
          Book.bulkCreate([secondInOrder, lastInOrder, firstInOrder])
            .then(() => Book.findAll())
            .then(() => {
              request.get('/api/v1/books?sort=upvotes&order=descending')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body).to.be.an('array').to.have.lengthOf(3);
                  expect(res.body[0].upVotes).to.eql(20);
                  expect(res.body[1].upVotes).to.eql(10);
                  expect(res.body[2].upVotes).to.eql(8);
                  done(err);
                });
            });
        });
      });
    });
    it('it should return no match', (done) => {
      const user = userDataTest.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookDataTest.validBook1;
          const bookb = bookDataTest.validBook2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAll())
            .then(() => {
              request.get('/api/v1/books?search=everything')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message)
                    .to.eql('No book matches your search. Try some other combinations');
                  expect(res.body.books).to.be.an('array');
                  done(err);
                });
            });
        });
      });
    });
    it('it should successfully get all books by search term', (done) => {
      const user = userDataTest.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookDataTest.validBook1;
          const bookb = bookDataTest.validBook2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAll())
            .then((books) => {
              request.get('/api/v1/books?search=There')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body).to.be.an('array');
                  expect(res.body[0].title).to.eql(books[1].title);
                  done(err);
                });
            });
        });
      });
    });
  });
});

