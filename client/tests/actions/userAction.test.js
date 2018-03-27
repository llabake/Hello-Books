import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import jwt from 'jsonwebtoken';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/userAction';
import userData from './../mocks/userData'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetch user actions', () => {
  beforeEach(function () {
    moxios.install();
  });
  afterEach(function ()  {
    moxios.uninstall();
  });
  it('checks that CHECK_USER_EXISTS is dispatched', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      });
    });
    const expectedActions = [
      { type: types.CHECK_USER_EXISTS, }
    ];
    const store = mockStore({ user: {} })
    return store.dispatch(actions.checkUserExist('username', 'idrees')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should sign up a user when USER_SIGNUP_SUCCESS is dispatched', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: userData.signUpResponse
      });
    });
    const expectedActions = [
      { type: types.USER_SIGNUP_REQUEST },
      { type: types.USER_SIGNUP_SUCCESS, user: userData.signUpResponse.user },
      { type: types.SET_CURRENT_USER, user: jwt.decode(userData.signUpResponse.token) }
    ];
    const store = mockStore({ user: {} })
    return store.dispatch(actions.signUpUser(userData.validUser1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should sign in a user when USER_SIGNIN_SUCCESS is dispatched', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.signInResponse
      });
    });
    const expectedActions = [
      { type: types.USER_SIGNIN_REQUEST },
      { type: types.USER_SIGNIN_SUCCESS, user: jwt.decode(userData.signInResponse.token).user  },
      { type: types.SET_CURRENT_USER, user: jwt.decode(userData.signInResponse.token).user }
    ];
    const store = mockStore({ user: {} })
    return store.dispatch(actions.signInUser(userData.signInData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('should dispatch USER_SIGNIN_ERROR when a user give invalid credentials', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          success: false,
          message: 'Authentication failed. Incorrect credentials.'
        }
      });
    });
    const expectedActions = [
      { type: types.USER_SIGNIN_REQUEST },
      { type: types.USER_SIGNIN_ERROR, error: {} },
    ];
    const store = mockStore({ user: {} })
    return store.dispatch(actions.signInUser(userData.invalidSignInData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should fetch a user\'s borrowed book history when USER_BORROW_LIST_SUCCESS is dispatched', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
            message: 'BorrowedBooks history fetched successfully',
            borrowedBooks: userData.borrowedBookList
        }
      });
    });
    const expectedActions = [
      { type: types.USER_BORROW_LIST },
      { type: types.USER_BORROW_LIST_SUCCESS, borrowedBookList: userData.borrowedBookList },
    ];
    const store = mockStore({ borrowedBookHistory: [] })
    return store.dispatch(actions.fetchUserBorrowedBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('should fetch a user\'s borrowed book history when USER_BORROW_LIST_ERROR is dispatched', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        error: {
          response: userData.userBorrowedBookListError
        } 
        });
    });
    const expectedActions = [
      { type: types.USER_BORROW_LIST },
      { type: types.USER_BORROW_LIST_ERROR, error: userData.userBorrowedBookListError },
    ];
    const store = mockStore({ borrowedBookList: [] })
    return store.dispatch(actions.fetchUserBorrowedBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch RETURN_SUCCESS when book is returned by a user', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.returnBookResponse
      });
    });
    const expectedActions = [
      { type: types.RETURN },
      { type: types.RETURN_SUCCESS, borrowedBook: userData.returnBookResponse.borrowedBook },
    ];
    const store = mockStore({ borrowedBookHistory: [] })
    return store.dispatch(actions.returnBookAction(userData.book2.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('should dispatch RETURN_ERROR when book is returned by a user errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.returnBookResponse
      });
    });
    const expectedActions = [
      { type: types.RETURN },
      { type: types.RETURN_SUCCESS, borrowedBook: userData.returnBookResponse.borrowedBook },
    ];
    const store = mockStore({ borrowedBookHistory: [] })
    return store.dispatch(actions.returnBookAction(userData.book2.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch USER_FAVORITE_LIST_SUCCESS when fetching user favorite books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.userFavoriteResponse
      });
    });
    const expectedActions = [
      { type: types.USER_FAVORITE_LIST },
      { type: types.USER_FAVORITE_LIST_SUCCESS, favoriteBooks: userData.userFavoriteResponse.favorites },
    ];
    const store = mockStore({ favoriteBooks: [] })
    return store.dispatch(actions.fetchUserFavoriteBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('should dispatch USER_FAVORITE_LIST_ERROR when fetching user favorite books errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.unFavoriteResponse
      });
    });
    const bookId = userData.userFavoriteResponse.favorites[0].book.id
    const expectedActions = [
      { type: types.REMOVE_FROM_FAVORITES },
      { type: types.REMOVE_FROM_FAVORITES_SUCCESS, bookId },
    ];
    const store = mockStore({ favoriteBooks: [] })
    return store.dispatch(actions.removeFromFavorite(bookId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('should dispatch LOGOUT_REQUEST when a user logs out', () => {
    // moxios.wait(() => {
    //   const request = moxios.requests.mostRecent();
      // request.respondWith({
      //   status: 200,
      //   response: userData.unFavoriteResponse
      // });
    // });
    const expectedActions = [
      { type: types.LOGOUT_REQUEST },
      { type: types.UNSET_CURRENT_USER, user: {} }
    ];
    const store = mockStore({ user: {} })
    return store.dispatch(actions.logout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch FETCH_USER_PROFILE_SUCCESS to fetch a profile', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.userProfileResponse
      });
    });
    const expectedActions = [
      { type: types.FETCH_USER_PROFILE },
      { type: types.FETCH_USER_PROFILE_SUCCESS, profile: userData.userProfileResponse.profile },
    ];
    const store = mockStore({ profile: {} })
    return store.dispatch(actions.getUserProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('should dispatch EDIT_USER_PROFILE_SUCCESS to edit a user profile', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.editProfileResponse
      });
    });
    const expectedActions = [
      { type: types.EDIT_USER_PROFILE },
      { type: types.EDIT_USER_PROFILE_SUCCESS, user: userData.editProfileResponse.profile },
    ];
    const store = mockStore({ profile: {} })
    return store.dispatch(actions.editProfile(userData.editData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});