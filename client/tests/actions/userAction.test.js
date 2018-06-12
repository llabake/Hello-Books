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
      { type: types.SET_CURRENT_USER, user: jwt.decode(userData.signUpResponse.token).user }
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
      { type: types.SET_CURRENT_USER, user: jwt.decode(userData.signInResponse.token).user }
    ];
    const store = mockStore({ user: {} })
    return store.dispatch(actions.signInUser(userData.signInData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch USER_SIGNIN_ERROR when a user gives invalid credentials', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        error: {
          success: false,
          message: 'Authentication failed. Incorrect credentials.'
        }
      });
    });
    const expectedActions = [
      { type: types.USER_SIGNIN_REQUEST },
      { type: types.USER_SIGNIN_ERROR, error: '' },
    ];
    const store = mockStore({ user: {} })
    return store.dispatch(actions.signInUser(userData.invalidSignInData)).
    then(() => {
      // expect(store.getActions()).toEqual(expectedActions);
    })
    .catch(() => {
      // expect(store.getActions()).toEqual(expectedActions);
      expect(error.response.message)
        .toEqual('Authentication failed. Incorrect credentials.')
    })
    });
  it('should fetch a user\'s borrowed book history when USER_BORROW_LIST_SUCCESS is dispatched', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
            message: 'BorrowedBooks history fetched successfully',
            borrowedBooks: userData.borrowedBookList,
            count: userData.bookCount
        }
      });
    });
    const expectedActions = [
      { type: types.USER_BORROW_LIST },
      { type: types.USER_BORROW_LIST_SUCCESS, borrowedBookList: userData.borrowedBookList },
      { type: types.SET_BORROWED_BOOK_COUNT, bookCount: userData.bookCount }
    ];
    const store = mockStore({ borrowedBookHistory: [] })
    return store.dispatch(actions.fetchUserBorrowedBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('should dispatch USER_BORROW_LIST_ERROR when the request errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
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
      console.log(store.getActions(), 'lsksjdfjd')
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
  xit('should dispatch RETURN_ERROR when book return by a user errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        error: userData.returnBookError
      });
    });
    const expectedActions = [
      { type: types.RETURN },
      { 
        type: types.RETURN_ERROR,
        borrowedBook: userData.returnBookError 
      },
    ];
    const store = mockStore({ borrowedBookHistory: [] })
    return store.dispatch(actions.returnBookAction(userData.book2.id)).then(() => {
      console.log(store.getActions(), 'lkldhfhjh')
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch USER_FAVORITE_LIST_SUCCESS when fetching user favorite books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.userFavoriteResponse,
      });
    });
    const expectedActions = [
      { type: types.USER_FAVORITE_LIST },
      { type: types.USER_FAVORITE_LIST_SUCCESS, favoriteBooks: userData.userFavoriteResponse.favorites },
      { type: types.SET_FAVORITE_BOOK_COUNT, favoriteCount: userData.userFavoriteResponse.count }
    ];
    const store = mockStore({ favoriteBooks: [] })
    return store.dispatch(actions.fetchUserFavoriteBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch REMOVE_FROM_FAVORITES_SUCCESS when a user unfavorite a book', () => {
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
  it('should dispatch LOGOUT_REQUEST when a user logs out', () => {
    const expectedActions = [
      { type: types.LOGOUT_REQUEST },
      { type: types.UNSET_CURRENT_USER, user: {} }
    ];
    const store = mockStore({ user: {} })
    store.dispatch(actions.logout())
    expect(store.getActions()).toEqual(expectedActions);
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
      { 
        type: types.EDIT_USER_PROFILE_SUCCESS, 
        user: userData.editProfileResponse.profile 
      },
    ];
    const store = mockStore({ profile: {} })
    return store.dispatch(actions.editProfile(userData.editData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});