import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';
import userDataTest from '../tests/mocks/userData';

const { User, } = models;
const request = supertest(app);
const { expect } = chai;


describe('User Endpoint Functionality', () => {
  beforeEach((done) => {
    User.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    })
      .then(() => {
        done();
      });
  });
  describe('User account creation', () => {
    it('should return an array of errors to validate user input', (done) => {
      request.post('/api/v1/users/signup')
        .send({})
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            errors: {
              username: "username is required",
              lastName: "lastName is required",
              email: "email is required",
              password: "password is required",
              firstName: "firstName is required"
            }
          });
          done(err);
        });
    });
    it('should return error for wrong field input type', (done) => {
      request.post('/api/v1/users/signup')
        .send(userDataTest.userWithWrongFieldFormat)
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            errors: {
              username: "Username can only contain alphabets and numbers",
              email: "Please enter a valid email",
              firstName: "Firstname can not be blank"
            }
          });
          done(err);
        });
    });
    it('should create a user and return status code of 201', (done) => {
      const user = userDataTest.validUser1;
      request.post('/api/v1/users/signup')
        .send(user)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(201);
          expect(res.body.message)
            .to.eql(`Your Signup was successful ${user.username}`);
          expect(res.body.user).to.have.own.property('id');
          expect(res.body.user.id).to.be.a('number');
          expect(res.body.user.username).to.eql(user.username);
          expect(res.body.user.email).to.eql(user.email);
          expect(res.body.token).to.be.a('string');
          done(err);
        });
    });
    it('should raise validation error for unique email', (done) => {
      const user = userDataTest.validUser1;
      User.create(user).then(() => {
        request.post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(409);
            expect(res.body).to.eql({
              errors: [
                {
                  message: "Email already exist",
                  path: "email"
                }
              ]
            });
            expect(res.status).to.eql(409);
            done(err);
          });
      });
    });
  });
  describe('User sign in operation', () => {
    it('should return an array of errors to validate user input', (done) => {
      const user = userDataTest.userWithBlankUsernameAndPassword;
      request.post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            errors: {
              username: "Username can not be blank",
              password: "Password can not be blank"
            }
          });
          done(err);
        });
    });

    it('should return error for wrong field input type', (done) => {
      request.post('/api/v1/users/signup')
        .send(userDataTest.userWithWrongSignInFormat)
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            errors: {
              email: "email is required",
              firstName: "firstName is required",
              lastName: "lastName is required"
            }
          });
          done(err);
        });
    });
    it('should return authentication failed for username not found', (done) => {
      const user = userDataTest.wrongUserSignInCredentials1;
      request.post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          expect(401);
          expect(res.body.success).to.eql(false);
          expect(res.body.message)
            .to.eql('Authentication failed. Incorrect credentials.');
          done(err);
        });
    });
    it('should return authentication failed for password incorrect', (done) => {
      const user = userDataTest.invalidUserSignIn3;
      request.post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          expect(401);
          expect(res.body.message)
            .to.eql('Authentication failed. Incorrect credentials.');
          expect(res.body.success).to.eql(false);
          done(err);
        });
    });
    it('should sign a user in', (done) => {
      const user = userDataTest.validUser1;
      User.create(user).then(() => {
        request.post('/api/v1/users/signin')
          .send({ username: user.username, password: user.password })
          .end((err, res) => {
            expect(200);
            expect(res.body.message)
              .to.eql(`Welcome ${user.username}, you're logged in`);
            expect(res.body.token).to.be.a('string');
            done(err);
          });
      });
    });
  });
  describe('User sign out operation', () => {
    it('should sign a user out', (done) => {
      const user = userDataTest.validUser1;
      User.create(user).then((createdUser) => {
        const token = generateToken(createdUser);
        request.post('/api/v1/users/signout')
          .send({})
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .end((err, res) => {
            expect(200);
            expect(res.body.message)
              .to.eql(`You have successfully logged out ${user.username}`);
            done(err);
          });
      });
    });
  });
  describe('User Exist Operation', () => {
    
    it('should return email or username expected in query', (done) => {
        request.get('/api/v1/users/signup/validate')
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            message: "Email or Username expected in query"
          });
          done(err);
        });
    });

    it('should return username is valid', (done) => {
      request.get('/api/v1/users/signup/validate?username=andela')
      .end((err, res) => {
        expect(200);
        expect(res.body).to.eql({
          message: "Username is valid"
        });
        done(err);
      });
    });
    it('should return email is valid', (done) => {
      request.get('/api/v1/users/signup/validate?email=damolawuraola@gmail.com')
      .end((err, res) => {
        expect(200);
        expect(res.body).to.eql({
          message: "Email is valid"
        });
        done(err);
      });
    });
    it('should check if a username already exist', (done) => {
      const user = userDataTest.validUser2;
      User.create(user).then(() => {
        request.get('/api/v1/users/signup/validate?username=solape')
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            message: "Username already taken"
          });
          done(err);
        });
      })
    });
    it('should check if an email already exist', (done) => {
      const user = userDataTest.validUser2;
      User.create(user).then(() => {
        request.get('/api/v1/users/signup/validate?email=damywuraola@gmail.com')
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            message: "Email already taken"
          });
          done(err);
        });
      })
    });
  });

  describe('User Profile Operation', () => {
    it('should edit user\'s profile successfully', (done) => {
      const user = userDataTest.validUser1;
      const editDetail = userDataTest.editDetail
      User.create(user).then((createdUser) => {
        const token = generateToken(createdUser);
        request.put('/api/v1/users/profile')
          .send(editDetail)
          .set('Accept', 'application/json')
          .set("Authorization" , token)
          .end((err, res) => {
            expect(200);
            expect(res.body.message).to.eql("Your profile has been updated");
            expect(res.body.profile.userId).to.be.a("number");
            expect(res.body.profile.firstName).to.eql(editDetail.firstName);
            expect(res.body.profile.lastName).to.eql(editDetail.lastName);
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
    it('should  get user profile successfully', (done) => {
      const user = userDataTest.validUser1;
      User.create(user).then((createdUser) => {
        const token = generateToken(createdUser);
        request.get('/api/v1/users/profile')
          .set('Accept', 'application/json')
          .set("Authorization" , token)
          .end((err, res) => {
            expect(200);
            expect(res.body.message).to.eql("Profile retrieved successfully");
            expect(res.body.profile).to.have.own.property('id');
            expect(res.body.profile.id).to.be.a("number");
            expect(res.body.profile.firstName).to.eql(createdUser.firstName);
            expect(res.body.profile.lastName).to.eql(createdUser.lastName);
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });
});
