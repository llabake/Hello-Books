import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';
import userData from '../tests/mocks/userData';
import bookData from '../tests/mocks/bookData';

const { Book, User } = models;
const request = supertest(app);
const { expect } = chai;

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
    it('should return an array of errors to validate book input', (done) => {
      User.create(userData.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send({})
            .end((err, res) => {
              expect(400);
              expect(res.body).to.eql({
                errors: {
                  title: 'title is required',
                  author: 'author is required',
                  publishedYear: 'publishedYear is required',
                  isbn: 'isbn is required',
                  quantity: 'quantity is required',
                  description: 'description is required',
                  aboutAuthor: 'aboutAuthor is required'
                }
              });
              done(err);
            });
        });
      });
    });
    it('should check PublishedYear and isbn are numbers', (done) => {
      User.create(userData.adminUser1).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(bookData.stringIsbnAndPublishedYear)
            .end((err, res) => {
              expect(400);
              expect(res.body).to.eql({
                errors: {
                  publishedYear: "PublishedYear can only be a number",
                  isbn: "ISBN can only be a number"
                }
              });
              done(err);
            });
        });
      });
    });
    it('should check that quantity is greater than zero', (done) => {
      User.create(userData.adminUser2).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(bookData.zeroQuantity)
            .end((err, res) => {
              expect(400);
              expect(res.body).to.eql({
                errors: {
                  quantity: 'Quantity must be a number greater than zero'
                }
              });
              done(err);
            });
        });
      });
    });
    it('should check that quantity is a number', (done) => {
      User.create(userData.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(bookData.stringQuantity)
            .end((err, res) => {
              expect(400);
              expect(res.body).to.eql({
                errors: {
                  quantity: 'Quantity can only be a number'
                }
              });
              done(err);
            });
        });
      });
    });
    it('should not allow a normal user add a book', (done) => {
      User.create(userData.normalUser1).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.post('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send(bookData.validBook1)
            .end((err, res) => {
              expect(403);
              expect(res.body.message).to.eql('Permission denied, only an admin can access this route');
              done(err);
            });
        });
      });
    });
    it('should successfully add a book', (done) => {
      User.create(userData.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookData.validBook2;
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
    it('should not add two books with same isbn', (done) => {
      User.create(userData.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookData.validBook2;
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
      User.create(userData.normalUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookData.validBook2;
          Book.create(book).then(() => {
            const bookId = 586065;
            request.get(`/api/v1/books/${bookId}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(404);
                expect(res.body.message).to.eql(`Book with id: ${bookId} not found`);
                done(err);
              });
          });
        });
      });
    });
    it('it should successfully get a book', (done) => {
      User.create(userData.normalUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookData.validBook2;
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
                expect(res.body.book).to.have.own.property('favorited');
                expect(res.body.book.id).to.eql(createdBook.id);
                expect(res.body.book.title).to.eql(createdBook.title);
                done(err);
              });
          });
        });
      });
    });
    it('it should not allow a normal user modify a book', (done) => {
      User.create(userData.normalUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookData.validBook2;
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
      User.create(userData.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          const book = bookData.validBook2;
          Book.create(book).then((createdBook) => {
            request.put(`/api/v1/books/${createdBook.id}`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .send(bookData.bookUpdate)
              .end((err, res) => {
                expect(200);
                expect(res.body.book.title).to.eql(bookData.bookUpdate.title);
                expect(res.body.book.author).to.eql(bookData.bookUpdate.author);
                expect(res.body.message).to.eql('Your book has been updated');
                done(err);
              });
          });
        });
      });
    });
    it('it should not modify a book isbn number to an existing book isbn number', (done) => {
      User.create(userData.adminUser).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook3;
          const bookb = bookData.validBook2;
          const bookIsbnUpdate = { isbn: booka.isbn };
          const token = generateToken(createdUser);
          Book.create(booka).then(() => {
            Book.create(bookb).then((createdBook) => {
              request.put(`/api/v1/books/${createdBook.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send(bookIsbnUpdate)
                .end((err, res) => {
                  expect(409);
                  expect(res.body.message).to.eql(`Operation disallowed, Book with isbn: ${booka.isbn} already exist`);
                  done(err);
                });
            });
          });
        });
      });
    });
    it('it should successfully get all books in the library', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook1;
          const bookb = bookData.validBook2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAndCountAll())
            .then((result) => {
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
                  expect(res.body.books[0]).to.have.own.property('favorited');
                  expect(res.body.books).to.be.an('array');
                  expect(res.body.count).to.equal(result.count)
                  expect(res.body.next).to.equal(null)
                  expect(res.body.previous).to.equal(null)
                  done(err);
                });
            });
        });
      });
    });
    // check the returned message it is returning the message for book search
    xit('it should return books unavailable', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const token = generateToken(createdUser);
          request.get('/api/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              // console.log(res, 'ehhdfhfhf')
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
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const secondInOrder = Object.assign(bookData.validBook1, { upVotes: 10 });
          const lastInOrder = Object.assign(bookData.validBook2, { upVotes: 8 });
          const firstInOrder = Object.assign(bookData.validBook3, { upVotes: 20 });
          const token = generateToken(createdUser);
          Book.bulkCreate([secondInOrder, lastInOrder, firstInOrder])
            .then(() => Book.findAndCountAll())
            .then((result) => {
              request.get('/api/v1/books?sort=upvotes&order=descending')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message).to.eql('Books retrieved successfully')
                  expect(res.body.books).to.be.an('array').to.have.lengthOf(3);
                  expect(res.body.books[0].upVotes).to.eql(firstInOrder.upVotes);
                  expect(res.body.books[1].upVotes).to.eql(secondInOrder.upVotes);
                  expect(res.body.books[2].upVotes).to.eql(lastInOrder.upVotes);
                  expect(res.body.count).to.equal(result.count)
                  expect(res.body.next).to.equal(null)
                  expect(res.body.previous).to.equal(null)
                  done(err);
                });
            });
        });
      });
    });
    // check the count
    xit('should return no match', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook1;
          const bookb = bookData.validBook2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAndCountAll())
            .then((result) => {
              request.get('/api/v1/books?search=everything')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  console.log(result.count, 'count')
                  console.log(result, 'result')
                  expect(200);
                  expect(res.body.message)
                    .to.eql('No book matches your search. Try some other combinations');
                  expect(res.body.books).to.be.an('array').to.have.length(0);
                  // expect(res.body.count).to.equal(result.count)
                  expect(res.body.next).to.equal(null)
                  expect(res.body.previous).to.equal(null)
                  done(err);
                });
            });
        });
      });
    });
    it('it should successfully get all books by search term', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook1;
          const bookb = bookData.validBook2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAndCountAll())
            .then((result) => {
              request.get('/api/v1/books?search=There')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.books).to.be.an('array').to.have.length(1);
                  expect(res.body.books[0].title).to.eql(result.rows[1].title);
                  expect(res.body).to.have.own.property('books');
                  expect(res.body.next).to.equal(null)
                  expect(res.body.previous).to.equal(null)
                  done(err);
                });
            });
        });
      });
    });
    it('it should return isbn expected in query', (done) => {
      request.get('/api/v1/books/add/validate')
      .end((err, res) => {
        expect(400);
        expect(res.body).to.eql({
          message: "ISBN expected in query"
        });
        done(err);
      });
    });

    it('it should return ISBN is valid', (done) => {
      request.get('/api/v1/books/add/validate?isbn=576737')
      .end((err, res) => {
        expect(200);
        expect(res.body).to.eql({
          message: "ISBN is valid"
        });
        done(err);
      });
    });
    it('it should check if a ISBN already exist', (done) => {
      const book = bookData.book2;
      Book.create(book).then((createdBook) => {
        request.get(`/api/v1/books/add/validate?isbn=${book.isbn}`)
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            message: `Book with isbn: ${createdBook.isbn} already exist`
          });
          done(err);
        });
      })
    });
    // check delete
    xit('it should successfully delete a book', (done) => {
      const user = userData.adminUser2;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.delete(`/api/v1/books/${createdBook.id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              // console.log(res, 'ghhd')
              expect(200);
              expect(res.body.message).to.eql('Book deleted successfully');
              done(err);
            });
        });
      });
    });
    it('it should get most popular books ', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook1;
          const bookb = bookData.validBook2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAll())
            .then(() => {
              request.get('/api/v1/users/books/popular-books')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message)
                    .to.eql('Popular books retrieved successfully');
                  expect(res.body).to.have.own.property('books');
                  expect(res.body.books[0]).to.have.own.property('downVotes');
                  expect(res.body.books[0]).to.have.own.property('upVotes');
                  expect(res.body.books[0]).to.have.own.property('reviews');
                  expect(res.body.books[0]).to.have.own.property('borrowCount');
                  expect(res.body.books[0]).to.have.own.property('favorited');
                  expect(res.body.books).to.be.an('array');
                  done(err);
                });
            });
        });
      });
    });
    it('it should get top favorite books ', (done) => {
      const user = userData.normalUser;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const booka = bookData.validBook1;
          const bookb = bookData.validBook2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAll())
            .then(() => {
              request.get('/api/v1/books/fav/top-favorite')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message)
                    .to.eql('Top favorited books retrieved successfully');
                  expect(res.body).to.have.own.property('books');
                  expect(res.body.books).to.be.an('array');
                  done(err);
                });
            });
        });
      });
    });
  });
});

