import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/bookAction';
import { books, popularBooks, topFavoriteBooks} from './../mocks/bookData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetch books actions', () => {
  beforeEach(function () {
    moxios.install();
  });
  afterEach(function ()  {
    moxios.uninstall();
  });
  it('creates FETCH_BOOK_SUCCESS after successfully fetching books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Most Popular books retrieved successfully',
          books
        }
      });
    });
    const expectedActions = [
      { type: types.FETCH_BOOK },
      { type: types.FETCH_BOOK_SUCCESS, books }
    ];
    const store = mockStore({ books: [] })
    return store.dispatch(actions.fetchAllBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates FETCH_POPULAR_BOOK_SUCCESS after successfully fetching popular books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Books retrieved successfully',
          popularBooks
        }
      });
    });
    const expectedActions = [
      { type: types.POPULAR_BOOK },
      { type: types.FETCH_POPULAR_BOOK_SUCCESS, popularBooks }
    ];
    const store = mockStore({ popularBooks: [] })
    return store.dispatch(actions.fetchPopularBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates FETCH_TOP_FAVORITED_BOOKS_SUCCESS after successfully fetching popular books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Top favorite books retrieved successfully',
          topFavoriteBooks
        }
      });
    });
    const expectedActions = [
      { type: types.TOP_FAVORITED_BOOKS },
      { type: types.FETCH_TOP_FAVORITED_BOOKS_SUCCESS, popularBooks }
    ];
    const store = mockStore({ topFavoriteBooks: [] })
    return store.dispatch(actions.fetchTopFavoriteBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  
});
