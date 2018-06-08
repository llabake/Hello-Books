import initialState from './initialState';
import {
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_ERROR,
  PENDING_BORROW_REQUEST_SUCCESS,
  PENDING_BORROW_REQUEST_ERROR,
  PENDING_RETURN_REQUEST_SUCCESS,
  PENDING_RETURN_REQUEST_ERROR,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_ERROR,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  ACCEPT_BOOK_BORROW_SUCCESS,
  ACCEPT_BOOK_BORROW_ERROR,
  ACCEPT_BOOK_RETURN_SUCCESS,
  ACCEPT_BOOK_RETURN_ERROR,
  FETCH_BOOK,
  PENDING_BORROW_REQUEST,
  PENDING_RETURN_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_ERROR,
  SET_BOOK_COUNT,
  SET_BORROWED_BOOK_COUNT,
  SET_RETURNED_BOOK_COUNT,
  FETCH_SUGGESTED_BOOKS,
  FETCH_SUGGESTED_BOOKS_SUCCESS,
  FETCH_SUGGESTED_BOOKS_ERROR,
  SET_SUGGESTED_BOOK_COUNT
} from '../actions/actionTypes';

export default (state = initialState.admin, action) => {
  switch (action.type) {
    case FETCH_BOOK:
      return { ...state, loading: true };
    case FETCH_BOOK_SUCCESS:
      return { ...state, allBooks: action.books, loading: false };

    case SET_BOOK_COUNT:
      return { ...state, bookCount: action.bookCount }
    case FETCH_BOOK_ERROR:
      return { ...state, error: action.error, loading: false };
    case PENDING_BORROW_REQUEST:
      return { ...state, loading: true }
    case PENDING_BORROW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        pendingBorrowedBookRequest: action.pendingBorrowList
      }
    case SET_BORROWED_BOOK_COUNT:
      return {
        ...state,
        borrowedBookCount: action.bookCount
      }

    case PENDING_BORROW_REQUEST_ERROR:
      return { ...state, error: action.error, loading: false }

    case PENDING_RETURN_REQUEST:
      return { ...state, loading: true }
    case PENDING_RETURN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        pendingReturnedBookRequest: action.pendingAcceptList
      }
    case SET_RETURNED_BOOK_COUNT:
      return {
        ...state,
        returnedBookCount: action.bookCount
      }
    case PENDING_RETURN_REQUEST_ERROR:
      return { ...state, error: action.error, loading: false }

    case DELETE_BOOK_SUCCESS: {
      const newBookList =
        state.allBooks.filter(book => book.id !== action.bookId);
      return { ...state, allBooks: newBookList }
    }
    case DELETE_BOOK_ERROR:
      return { ...state, error: action.error }

    case UPDATE_SUCCESS: {
      const newBooks =
        state.allBooks.map((book) => {
          return book.id == action.book.id ? action.book : book
        })
      return {
        ...state,
        allBooks: newBooks
      }
    }

    case UPDATE_ERROR:
      return { ...state, error: action.error }

    case ACCEPT_BOOK_BORROW_SUCCESS: {
      const newBorrowedBookList =
        state.pendingBorrowedBookRequest.filter(borrowedBookRequest =>
          borrowedBookRequest.id !== action.borrowedBook.id)
      return {
        ...state,
        pendingBorrowedBookRequest: newBorrowedBookList
      }
    }

    case ACCEPT_BOOK_BORROW_ERROR:
      return { ...state, error: action.error }

    case ACCEPT_BOOK_RETURN_SUCCESS: {
      const newReturnedBookList =
        state.pendingReturnedBookRequest.filter(returnedBookRequest =>
          returnedBookRequest.id !== action.returnedBook.id)
      return {
        ...state,
        pendingReturnedBookRequest: newReturnedBookList
      }
    }

    case ACCEPT_BOOK_RETURN_ERROR:
      return {
        ...state,
        error: action.error
      }

    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        book: action.book
      }

    case ADD_BOOK_ERROR:
      return {
        ...state,
        error: action.error
      }

    case FETCH_SUGGESTED_BOOKS:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUGGESTED_BOOKS_SUCCESS:
      return {
        ...state,
        suggestedBooks: action.books,
        loading: false
      };

    case SET_SUGGESTED_BOOK_COUNT:
      return {
        ...state,
        suggestedBookCount: action.bookCount
      }
    case FETCH_SUGGESTED_BOOKS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    default:
      return state
  }
}






