import expect from 'expect';
import reducer from '../../reducers/adminReducer';
import * as types from '../../actions/actionTypes';
import initialState from '../../reducers/initialState'
import {
  allBooks,
  error,
  pendingBorrowedBookRequest,
  pendingReturnedBookRequest,
  book3,
  allBooksAfterABookDeletion,
  book1Modified,
  allBooksAfterABookModification,
  pendingBorrowedBookRequestList,
  acceptedPendingBorrowedBookRequestList,
  pendingReturnedBookRequestlist,
  acceptedPendingReturnedBookRequestList,
  pendingReturnedBookRequestList,
  book1,
  bookCount,
  suggestedBooks,
  suggestedBookCount
} from '../reducers/mocks/adminData';

describe('Admin reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.admin)
  });
  it('should handle FETCH_BOOK', () => {
    const fetchAllBooksAction = {
      type: types.FETCH_BOOK
    };
    expect(reducer({}, fetchAllBooksAction)).toEqual({ loading: true })
  });
  it('should handle FETCH_BOOK_SUCCESS', () => {
    const fetchAllBooksSuccess = {
      type: types.FETCH_BOOK_SUCCESS,
      books: allBooks
    };
    expect(reducer({}, fetchAllBooksSuccess)).toEqual({ allBooks, loading: false })
  });
  // it('should handle SET_BOOK_COUNT', () => {
  //   const setFetchedBooksCount = {
  //     type: types.SET_BOOK_COUNT,
  //     bookCount
  //   };
  //   expect(reducer({}, setFetchedBooksCount)).toEqual({bookCount })
  // });
  it('should handle FETCH_BOOK_ERROR', () => {
    const fetchAllBooksError = {
      type: types.FETCH_BOOK_ERROR,
      error
    };
    expect(reducer({}, fetchAllBooksError)).toEqual({ error, loading: false })
  });
  it('should handle PENDING_BORROW_REQUEST', () => {
    const fetchPendingBorrowRequest = {
      type: types.PENDING_BORROW_REQUEST,
    };
    expect(reducer({}, fetchPendingBorrowRequest)).toEqual({ loading: true })
  });
  it('should handle PENDING_BORROW_REQUEST_SUCCESS', () => {
    const fetchPendingBorrowRequestSuccess = {
      type: types.PENDING_BORROW_REQUEST_SUCCESS,
      pendingBorrowList: pendingBorrowedBookRequest
    };
    expect(reducer({}, fetchPendingBorrowRequestSuccess)).toEqual({ pendingBorrowedBookRequest, loading: false })
  });
  it('should handle PENDING_BORROW_REQUEST_ERROR', () => {
    const fetchPendingBorrowRequestError = {
      type: types.PENDING_BORROW_REQUEST_ERROR,
      error
    };
    expect(reducer({}, fetchPendingBorrowRequestError)).toEqual({ error, loading: false })
  });
  it('should handle PENDING_RETURN_REQUEST', () => {
    const fetchPendingReturnRequest = {
      type: types.PENDING_RETURN_REQUEST,
    };
    expect(reducer({}, fetchPendingReturnRequest)).toEqual({ loading: true })
  });
  it('should handle PENDING_RETURN_REQUEST_SUCCESS', () => {
    const fetchPendingReturnRequestSuccess = {
      type: types.PENDING_RETURN_REQUEST_SUCCESS,
      pendingAcceptList: pendingReturnedBookRequest
    };
    expect(reducer({}, fetchPendingReturnRequestSuccess)).toEqual({ pendingReturnedBookRequest, loading: false })
  });
  it('should handle PENDING_RETURN_REQUEST_ERROR', () => {
    const fetchPendingReturnRequestError = {
      type: types.PENDING_RETURN_REQUEST_ERROR,
      error
    };
    expect(reducer({}, fetchPendingReturnRequestError)).toEqual({ error, loading: false })
  });
  it('should handle DELETE_BOOK_SUCCESS', () => {
    const deleteBookSuccess = {
      type: types.DELETE_BOOK_SUCCESS,
      bookId: book3.id
    };
    expect(reducer({ allBooks }, deleteBookSuccess)).toEqual({ allBooks: allBooksAfterABookDeletion })
  });
  it('should handle DELETE_BOOK_ERROR', () => {
    const deleteBookError = {
      type: types.DELETE_BOOK_ERROR,
      error
    };
    expect(reducer({}, deleteBookError)).toEqual({ error })
  });
  it('should handle UPDATE_SUCCESS', () => {
    const modifyBookReviewSuccess = {
      type: types.UPDATE_SUCCESS,
      book: book1Modified
    };
    expect(reducer({ allBooks }, modifyBookReviewSuccess)).toEqual({ allBooks: allBooksAfterABookModification })
  });
  it('should handle UPDATE_ERROR', () => {
    const modifyBookReviewError = {
      type: types.UPDATE_ERROR,
      error
    };
    expect(reducer({}, modifyBookReviewError)).toEqual({ error })
  });
  it('should handle ACCEPT_BOOK_BORROW_SUCCESS', () => {
    const pendingBorrowRequestAcceptSuccess = {
      type: types.ACCEPT_BOOK_BORROW_SUCCESS,
      borrowedBook: pendingBorrowedBookRequestList[0]
    };
    expect(reducer(
      { pendingBorrowedBookRequest: pendingBorrowedBookRequestList },
      pendingBorrowRequestAcceptSuccess))
      .toEqual({
        pendingBorrowedBookRequest: acceptedPendingBorrowedBookRequestList
      })
  });
  it('should handle ACCEPT_BOOK_BORROW_ERROR', () => {
    const pendingBorrowRequestAcceptError = {
      type: types.ACCEPT_BOOK_BORROW_ERROR,
      error
    };
    expect(reducer({}, pendingBorrowRequestAcceptError)).toEqual({ error })
  });
  it('should handle ACCEPT_BOOK_RETURN_SUCCESS', () => {
    const pendingReturnRequestAcceptSuccess = {
      type: types.ACCEPT_BOOK_RETURN_SUCCESS,
      returnedBook: pendingReturnedBookRequestList[0]
    };
    expect(reducer(
      { pendingReturnedBookRequest: pendingReturnedBookRequestList },
      pendingReturnRequestAcceptSuccess))
      .toEqual({
        pendingReturnedBookRequest: acceptedPendingReturnedBookRequestList
      })
  });
  it('should handle ACCEPT_BOOK_RETURN_ERROR', () => {
    const fetchPendingReturnRequestError = {
      type: types.ACCEPT_BOOK_RETURN_ERROR,
      error
    };
    expect(reducer({}, fetchPendingReturnRequestError)).toEqual({ error })
  });
  it('should handle FETCH_SUGGESTED_BOOKS', () => {
    const fetchAllSuggestedBooksAction = {
      type: types.FETCH_SUGGESTED_BOOKS
    };
    expect(reducer({}, fetchAllSuggestedBooksAction)).toEqual({ loading: true })
  });
  it('should handle FETCH_SUGGESTED_BOOKS_SUCCESS', () => {
    const fetchAllSuggestedBooksSucces = {
      type: types.FETCH_SUGGESTED_BOOKS_SUCCESS,
      books: suggestedBooks
    };
    expect(reducer({}, fetchAllSuggestedBooksSucces)).toEqual({ suggestedBooks, loading: false })
  });
  it('should handle SET_SUGGESTED_BOOK_COUNT', () => {
    const setFetchedSuggestedBooksCount = {
      type: types.SET_SUGGESTED_BOOK_COUNT,
      bookCount: suggestedBookCount
    };
    expect(reducer({}, setFetchedSuggestedBooksCount)).toEqual({ suggestedBookCount })
  });
  it('should handle FETCH_SUGGESTED_BOOKS_ERROR', () => {
    const fetchAllSuggestedBooksError = {
      type: types.FETCH_SUGGESTED_BOOKS_ERROR,
      error
    };
    expect(reducer({}, fetchAllSuggestedBooksError)).toEqual({ error, loading: false })
  })
  it('should handle ADD_BOOK_SUCCESS', () => {
    const addBookSuccess = {
      type: types.ADD_BOOK_SUCCESS,
      book: book1
    };
    expect(reducer({}, addBookSuccess)).toEqual({ book: book1 })
  });
  it('should handle ADD_BOOK_ERROR', () => {
    const addBookError = {
      type: types.ADD_BOOK_ERROR,
      error
    };
    expect(reducer({}, addBookError)).toEqual({ error })
  });
})