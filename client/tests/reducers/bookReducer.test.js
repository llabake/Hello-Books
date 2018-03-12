import expect from 'expect';
import reducer from '../../reducers/bookReducer';
import * as types from '../../actions/actionTypes';
import initialState from '../../reducers/initialState'
import {books, error, book2, book3, addfavbook, upvotedBook, downvotedBook } from '../reducers/mocks/booksData';

describe('Book reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.books)
  });
  it('should handle FETCH_BOOK', () => {
    const fetchAllBooksAction = {
      type: types.FETCH_BOOK
    };
    expect(reducer({}, fetchAllBooksAction)).toEqual({loading: true})
  });
  it('should handle FETCH_BOOK_SUCCESS', () => {
    const fetchAllBooksSuccess = {
      type: types.FETCH_BOOK_SUCCESS,
      books
    };
    expect(reducer({}, fetchAllBooksSuccess)).toEqual({books, loading: false})
  });
  it('should handle FETCH_BOOK_ERROR', () => {
    const fetchAllBooksSuccess = {
      type: types.FETCH_BOOK_ERROR,
      error
    };
    expect(reducer({}, fetchAllBooksSuccess)).toEqual({error, loading: false})
  });
  it('should handle FETCH SINGLE BOOK', () => {
    const fetchSingleBook = {
      type: types.FETCH_SINGLE_BOOK
    }
    expect(reducer({}, fetchSingleBook)).toEqual({loading: true})
  });
  it('should handle FETCH_SINGLE_BOOK_SUCCESS', () => {
    const fetchSingleBookSuccess = {
      type: types.FETCH_SINGLE_BOOK_SUCCESS,
      book: book3
    };
    expect(reducer({}, fetchSingleBookSuccess)).toEqual({book: book3, loading: false})
  });
  it('should handle FETCH_SINGLE_BOOK_ERROR', () => {
    const fetchSingleBookError = {
      type: types.FETCH_SINGLE_BOOK_ERROR,
      error
    };
    expect(reducer({}, fetchSingleBookError)).toEqual({error, loading: false})
  });
  it('should handle FAVORITE_BOOK_SUCCESS', () => {
    const favoriteBookSuccess = {
      type: types.FAVORITE_BOOK_SUCCESS,
      favoritedBook: book2
    };
    expect(reducer({}, favoriteBookSuccess)).toEqual({addfavbook:book2})
  });
  it('should handle FAVORITE_BOOK_ERROR', () => {
    const favoriteBookError = {
      type: types.FAVORITE_BOOK_ERROR,
      error
    };
    expect(reducer({}, favoriteBookError)).toEqual({ error })
  });
  it('should handle UPVOTE_SUCCESS', () => {
    const upvoteBookSuccess = {
      type: types.UPVOTE_SUCCESS,
      upvotedBook: book2
    };
    expect(reducer({}, upvoteBookSuccess)).toEqual({book:book2, upvotedBook: book2})
  });
  it('should handle UPVOTE_ERROR', () => {
    const upvoteBookError = {
      type: types.UPVOTE_ERROR,
      error
    };
    expect(reducer({}, upvoteBookError)).toEqual({ error })
  });
  it('should handle DOWNVOTE_SUCCESS', () => {
    const downvoteBookSuccess = {
      type: types.DOWNVOTE_SUCCESS,
      downvotedBook: book2
    };
    expect(reducer({}, downvoteBookSuccess)).toEqual({book:book2, downvotedBook: book2})
  });
  it('should handle DOWNVOTE_ERROR', () => {
    const downvoteBookError = {
      type: types.DOWNVOTE_ERROR,
      error
    };
    expect(reducer({}, downvoteBookError)).toEqual({ error })
  });

  
})