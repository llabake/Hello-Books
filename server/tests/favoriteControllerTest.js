import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';

const { Favorite, Book, User } = models;
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
    title: 'zero to hero',
    author: 'eric reis',
    isbn: 8752626,
    quantity: 55,
    publishedYear: 2012,
    description: '8752626',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41mbSg-W6-L._SY344_BO1,204,203,200_.jpg'
  },
};
describe('Favorite Endpoint Functionality', () => {
  // beforeEach((done) => {
  //   Favorite.destroy({ where: {} })
  //     .then(() => {
  //     }); User.destroy({ where: {} })
  //     .then(() => {
  //     });
  //   Book.destroy({ where: {} })
  //     .then(() => {
  //       done();
  //     });
  // });
  describe('User signs in to add a book as a favorite', () => {
    beforeEach((done) => {
      Favorite.destroy({ where: {} })
        .then(() => {
        }); User.destroy({ where: {} })
        .then(() => {
        });
      Book.destroy({ where: {} })
        .then(() => {
          done();
        });
    });
    it('it should not allow a logged out user mark book as favorite', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        const book = bookDataTest.book1;
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
    it('it should not add a book that does not exist as favorite', (done) => {
      const user = userDataTest.user1;
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
    it('it should not allow a user that does not exist add book as favorite', (done) => {
      const user = userDataTest.user1;
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
    it('it should successfully mark a book as favorite', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/books/fav/${createdBook.id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(201);
              expect(res.body.message).to.eql('Book has been added to your favorite list');
              expect(Object.prototype.hasOwnProperty
                .call(res.body, 'favorite')).to.eql(true);
              done(err);
            });
        });
      });
    });
    it('it should not add a book as favorite twice', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          Favorite.create({
            bookId: createdBook.id,
            userId: createdUser.id
          });
          request.post(`/api/v1/books/fav/${createdBook.id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(409);
              expect(res.body.message).to.eql('Book already on your favorite list');
              done(err);
            });
        });
      });
    });
    it('it should successfully get a single favorite list item', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          Favorite.create({
            bookId: createdBook.id,
            userId: createdUser.id
          });
          request.get('/api/v1/books/favbooks/')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(201);
              expect(res.body.message).to.eql('Favorite Book(s) retrieved successfully');
              expect(Object.prototype.hasOwnProperty
                .call(res.body, 'favorites')).to.eql(true);
              done(err);
            });
        });
      });
    });
    it('it should return an empty array if no books on the favorite list', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookDataTest.book1;
        const token = generateToken(createdUser);
        Book.create(book).then(() => {
          request.get('/api/v1/books/favbooks/')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(200);
              expect(res.body.message).to.eql('There are no Books on your Favorite List');
              expect(Object.prototype.hasOwnProperty
                .call(res.body, 'favorites')).to.eql(true);
              done(err);
            });
        });
      });
    });
    it('it should successfully get a list of users favorite books', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const userId = createdUser.id;
          const booka = bookDataTest.book1;
          const bookb = bookDataTest.book2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAll())
            .then((books) => {
              Favorite.bulkCreate([
                { bookId: books[0].id, userId },
                { bookId: books[1].id, userId },
              ]).then(() => {
                request.get('/api/v1/books/favbooks/')
                  .set('Accept', 'application/json')
                  .set('Authorization', token)
                  .end((err, res) => {
                    expect(201);
                    expect(res.body.message)
                      .to.eql('Favorite Book(s) retrieved successfully');
                    expect(Object.prototype.hasOwnProperty
                      .call(res.body, 'favorites')).to.eql(true);
                    done(err);
                  });
              });
            });
        });
      });
    });
    it('it should return book not found on favorite list', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const userId = createdUser.id;
        const booka = bookDataTest.book1;
        const bookb = bookDataTest.book2;
        const token = generateToken(createdUser);
        Book.bulkCreate([booka, bookb]).then(() => Book.findAll()).then((books) => {
          Favorite.bulkCreate([
            { bookId: books[0].id, userId },
            { bookId: books[1].id, userId },
          ]);
          const bookId = 500;
          request.delete(`/api/v1/books/fav/${bookId}/`)
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
    it('it should successfully delete book from a user favorite list', (done) => {
      const user = userDataTest.user1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const userId = createdUser.id;
          const booka = bookDataTest.book1;
          const bookb = bookDataTest.book2;
          const token = generateToken(createdUser);
          Book.bulkCreate([booka, bookb])
            .then(() => Book.findAll())
            .then((books) => {
              Favorite.bulkCreate([
                { bookId: books[0].id, userId },
                { bookId: books[1].id, userId },
              ]);
              request.delete(`/api/v1/books/fav/${books[0].id}/`)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message)
                    .to.eql(`${booka.title} has been removed from your favorite list`);
                  done(err);
                });
            });
        });
      });
    });
  });
});
