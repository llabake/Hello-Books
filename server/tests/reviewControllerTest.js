import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';
import reviewData from '../tests/mocks/reviewData';
import bookData from '../tests/mocks/bookData';
import userData from '../tests/mocks/userData';

const { Review, Book, User } = models;
const request = supertest(app);
const { expect } = chai;

describe('Review Endpoint Functionality', () => {
  describe('User signs in to post a review', () => {
    beforeEach((done) => {
      Review.destroy({
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
    
    it('should return an array of errors to validate empty input', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const review = reviewData.emptyReview;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            request.post(`/api/v1/books/${createdBook.id}/review`)
              .send(review)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(400);
                expect(res.body).to.eql({
                  errors: {
                    content: 'Content can not be blank',
                    caption: 'Caption can not be blank'
                  }
                });
                done(err);
              });
          });
        });
      });
    });
    it('should return an array of errors to validate short review content', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const review = reviewData.shortReview;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            request.post(`/api/v1/books/${createdBook.id}/review`)
              .send(review)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(400);
                expect(res.body).to.eql({
                  errors: {
                    content: "Minimum of 10 character and Maximum of 1000 characters required"
                  }
                });
                done(err);
              });
          });
        });
      });
    });
    it('should not allow a logged out user post a review', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        const book = bookData.book1;
        const review = reviewData.validReview1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          request.post(`/api/v1/books/${createdBook.id}/review`)
            .send(review)
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
    it('should not allow a post of review if a book does not exist', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const bookId = 200;
          const review = reviewData.validReview1;
          const token = generateToken(createdUser);
          request.post(`/api/v1/books/${bookId}/review`)
            .send(review)
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
    it('should not allow a post of review by a user that does not exist', (done) => {
      const user = userData.validUser7;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const bookId = 200;
          const review = reviewData.validReview1;
          const token = generateToken(createdUser);
          createdUser.destroy().then(() => {
            request.post(`/api/v1/books/${bookId}/review`)
            .send(review)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end((err, res) => {
              expect(404);
              expect(res.body.message)
                .to.eql(`User with id: ${createdUser.id} not found`);
              done(err);
            });
          })
        });
      });
    });
    it('should successfully post a review', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const review = reviewData.validReview1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            request.post(`/api/v1/books/${createdBook.id}/review`)
              .send(review)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(201);
                expect(res.body.message).to.eql('Review has been posted');
                expect(res.body).to.have.own.property('review');
                expect(res.body).to.have.own.property('book');
                done(err);
              });
          });
        });
      });
    });
    it('should not allow users delete others reviews', (done) => {
      const userA = userData.validUser1;
      const userB = userData.validUser2;
      User.bulkCreate([userA, userB])
        .then(() => User.update({ active: true }, { where: {} }))
        .spread(() => User.findAll()).then((users) => {
          const book = bookData.book1;
          const token = generateToken(users[1]);
          Book.create(book).then((createdBook) => {
            Review.create({
              bookId: createdBook.id,
              userId: users[0].id,
              content: reviewData.reviewToBeDeleted.content,
              caption: reviewData.reviewToBeDeleted.caption
            }).then((createdReview) => {
              request.delete(`/api/v1/books/${createdBook.id}/reviews/${createdReview.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(403);
                  expect(res.body.message)
                    .to.eql('You did not post this Review, hence can not delete it');
                  done(err);
                });
            });
          });
        });
    });
    it('should return review not found', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          Review.create({
            bookId: createdBook.id,
            userId: createdUser.id,
            content: reviewData.reviewToBeDeleted.content,
            caption: reviewData.reviewToBeDeleted.caption
          }).then(() => {
            const reviewId = 5000;
            request.delete(`/api/v1/books/${createdBook.id}/reviews/${reviewId}`)
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
    it('should successfully delete a review', (done) => {
      const user = userData.validUser1;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true });
        const book = bookData.book1;
        const token = generateToken(createdUser);
        Book.create(book).then((createdBook) => {
          Review.create({
            bookId: createdBook.id,
            userId: createdUser.id,
            content: reviewData.reviewToBeDeleted.content,
            caption: reviewData.reviewToBeDeleted.caption
          }).then((createdReview) => {
            request.delete(`/api/v1/books/${createdBook.id}/reviews/${createdReview.id}`)
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
    it('should return be the first to post a review', (done) => {
      const user = userData.validUser3;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            request.get(`/api/v1/books/${createdBook.id}/reviews`)
              .set('Accept', 'application/json')
              .set('Authorization', token)
              .end((err, res) => {
                expect(200);
                expect(res.body.message)
                  .to.eql('Be the first to post a review...');
                expect(res.body).to.have.own.property('reviews');
                expect(res.body.reviews).to.be.an('array');
                expect(res.body.reviews).to.have.length(0);                
                done(err);
              });
          })
        });
      });
    });
    it('should successfully get all reviews for a book', (done) => {
      const userA = userData.validUser1;
      const userB = userData.validUser2;
      User.bulkCreate([userA, userB])
        .then(() => User.update({ active: true }, { where: {} }))
        .spread(() => User.findAll()).then((createdUsers) => {
          const book = bookData.book2
          const token = generateToken(createdUsers[0]);
          Book.create(book).then((createdBook) => {
            const reviewA = {
              content: 'mesmerising read and grest lessons',
              caption: 'read the caption',
              userId: createdUsers[0].id,
              bookId: createdBook.id
            }
            const reviewB = {
              content: 'suspense filled and thrilling',
              caption: 'suspense filled',
              userId: createdUsers[1].id,
              bookId: createdBook.id
            }
            Review.bulkCreate([reviewA, reviewB])
            .then(() => Review.findAll())
            .then(() => {
              request.get(`/api/v1/books/${createdBook.id}/reviews`)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message)
                    .to.eql('Reviews retrieved successfully');
                  expect(res.body).to.have.own.property('reviews');
                  expect(res.body.reviews).to.be.an('array');
                  expect(res.body.reviews).to.have.length(2);
                  done(err);
                });
            });
          });
        });
    });
    it ('should return caption cannot be blank', (done) => {
      const user = userData.validUser4;
      const reviewWithNoCaption = reviewData.reviewWithNoCaption;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            Review.create({
              bookId: createdBook.id,
              userId: createdUser.id,
              content: 'suspense filled',
              caption: "what was there before is fine"
            }).then((createdReview) => {
              request.put(`/api/v1/books/${createdBook.id}/reviews/${createdReview.id}`)
                .send(reviewWithNoCaption)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(400);
                  expect(res.body).to.eql({
                    errors: {
                      caption: 'Caption can not be blank'
                    }
                  });
                  done(err);
                });
            });
          });
        })
      });
    });
    // FIX ME: what happens when review is null
    it('should successfully edit a review', (done) => {
      const user = userData.validUser4;
      const newReview = reviewData.editReviewObject;
      User.create(user).then((createdUser) => {
        createdUser.update({ active: true }).then(() => {
          const book = bookData.book1;
          const token = generateToken(createdUser);
          Book.create(book).then((createdBook) => {
            Review.create({
              bookId: createdBook.id,
              userId: createdUser.id,
              content: 'suspense filled',
              caption: "test caption"
            }).then((createdReview) => {
              request.put(`/api/v1/books/${createdBook.id}/reviews/${createdReview.id}`)
                .send(newReview)
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .end((err, res) => {
                  expect(200);
                  expect(res.body.message).to.eql('Your review has been updated');
                  expect(res.body.review.content).to.eql(newReview.content);
                  expect(res.body.review.caption).to.eql(newReview.caption);
                  expect(res.body).to.have.own.property('review')
                  done(err);
                });
            });
          });
        })
      });
    });
  });
});
