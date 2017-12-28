import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import { generateToken } from '../helpers/utils';

const { User, } = models;
const request = supertest(app);
const { expect } = chai;

const userDataTest = {
  validUser1: {
    username: 'keinzy',
    email: 'oyebola.otin@gmail.com',
    password: 'password',
    firstName: 'oyebola',
    lastName: 'ayinla',
    confirmpassword: 'password'
  },
  validUser2: {
    username: 'solape',
    email: 'damywuraola@gmail.com',
    password: 'damola',
    confirmpassword: 'damola',
    firstName: 'adedamola',
    lastName: 'wuraola'
  },
  validUser3: {
    username: 'flakky',
    firstName: 'Folake',
    lastName: 'Okoya',
    email: 'flakykitchen@hotmail.com',
    password: 'tobi',
    confirmpassword: 'tobi',
    role: 'admin',
  },
  validUser4: {
    username: 'mama',
    firstName: 'Anne',
    lastName: 'Oriola',
    email: 'olamideoriola@gmail.com',
    password: 'yomi',
    confirmpassword: 'yomi',
    role: 'admin',
  },
  userWithWrongFieldFormat: {
    username: 'mama@',
    firstName: ' ',
    lastName: 'Oriola',
    email: 'olamideoriola.com',
    password: 'yomi',
    confirmpassword: 'yomi'
  },
  userWithNoFields: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  misMatchPassword: {
    username: 'mama',
    firstName: 'Anne',
    lastName: 'Oriola',
    email: 'olamideoriola@gmail.com',
    password: 'yomi',
    confirmpassword: 'yoomi',
    role: 'admin',
  },
  validUserSignIn1: {
    username: 'mama',
    password: 'yomi'
  },
  validUserSignIn2: {
    username: 'flakky',
    password: 'tobi'
  },
  validUserSignIn3: {
    username: 'keinzy',
    password: 'password'
  },
  validUserSignIn4: {
    username: 'solape',
    password: 'damola'
  },
  invalidUserSignIn1: {
    username: '',
    password: 'password'
  },
  invalidUserSignIn2: {
    username: 'solape',
    password: ''
  },
  invalidUserSignIn3: {
    username: 'solape',
    password: 'incorrect'
  },
  userWithBlankUsernameAndPassword: {
    username: '',
    password: '',
  },
  wrongUserSignInCredentials1: {
    username: 'desmond',
    password: 'password'
  },
  wrongUserSignInCredentials2: {
    username: 'keinzy',
    password: 'tobi'
  }
};

describe('User Endpoint Functionality', () => {
  beforeEach((done) => {
    User.destroy({ where: {} })
      .then(() => {
        done();
      });
  });
  describe('User account creation', () => {
    it('it should return an array of errors to validate user input', (done) => {
      request.post('/api/v1/users/signup')
        .send({})
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            errors: [
              {
                path: 'username',
                message: 'username is required'
              },
              {
                path: 'lastName',
                message: 'lastName is required'
              },
              {
                path: 'firstName',
                message: 'firstName is required'
              },
              {
                path: 'email',
                message: 'email is required'
              },
              {
                path: 'password',
                message: 'password is required'
              },
              {
                path: 'email',
                message: 'Please enter a valid email'
              },
            ]
          });
          done(err);
        });
    });
    xit('it should return please ensure the Password match', (done) => {
      request.post('/api/v1/users/signup')
        .send(userDataTest.misMatchPassword)
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            errors: [
              {
                path: 'password',
                message: 'Please ensure the passwords match'
              }
            ]
          });
          done(err);
        });
    });
    it('it should return error with the path and message for wrong field input type', (done) => {
      request.post('/api/v1/users/signup')
        .send(userDataTest.userWithWrongFieldFormat)
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            errors: [
              {
                path: 'email',
                message: 'Please enter a valid email'
              },
              {
                path: 'username',
                message: 'Username can only contain alphabets and numbers'
              },
            ]
          });
          done(err);
        });
    });
    it('it should create a user and return status code of 201', (done) => {
      const user = userDataTest.validUser1;
      request.post('/api/v1/users/signup')
        .send(user)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(201);
          expect(res.body.message)
            .to.eql(`Your Signup was successful ${user.username}`);
          expect(Object.prototype.hasOwnProperty
            .call(res.body.user, 'id')).to.eql(true);
          expect(res.body.user.id).to.be.an('number');
          expect(res.body.user.username).to.eql(user.username);
          expect(res.body.user.email).to.eql(user.email);
          expect(res.body.token).to.be.a('string');
          done(err);
        });
    });
    it('it should raise validation error for unique username', (done) => {
      const user = userDataTest.validUser1;
      User.create(user).then(() => {
        request.post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(409);
            expect(res.body).to.eql({
              'errors': [
                {
                  'path': 'username',
                  'message': 'Username already exist'
                },
                {
                  'path': 'email',
                  'message': 'Email already exist'
                },
              ]
            });
            expect(res.status).to.eql(409);
            done(err);
          });
      });
    });
  });
  describe('User sign in operation', () => {
    it('it should return an array of errors to validate user input', (done) => {
      const user = userDataTest.userWithBlankUsernameAndPassword;
      request.post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          expect(400);
          expect(res.body).to.eql({
            errors: [
              {
                path: 'username',
                message: 'username is required'
              },
              {
                path: 'password',
                message: 'password is required'
              },
            ]
          });
          done(err);
        });
    });
    it('it should return authentication failed for username not found', (done) => {
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
    it('it should return authentication failed for password incorrect', (done) => {
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
    it('it should sign a user in', (done) => {
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
    it('it should sign a user out', (done) => {
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
});
