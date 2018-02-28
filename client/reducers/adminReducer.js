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
  ACCEPT_BOOK_RETURN_ERROR, FETCH_BOOK,
  PENDING_BORROW_REQUEST,
} from '../actions/actionTypes';

export default (state = initialState.admin, action) => {
  switch(action.type) {
    case FETCH_BOOK:
      return { ...state, loading: true };
    case FETCH_BOOK_SUCCESS:
      return {...state, allBooks: action.books, loading: false };

    case FETCH_BOOK_ERROR:
      return { ...state, error: action.error, loading: false};
    case PENDING_BORROW_REQUEST:
      return { ...state, loading: true }
    case PENDING_BORROW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        pendingBorrowedBookRequest: action.pendingBorrowList
      }

    case PENDING_BORROW_REQUEST_ERROR:
      return { ...state, error: action.error, loading: false }
    
    case PENDING_RETURN_REQUEST_SUCCESS:
      return {
        ...state,
        pendingReturnedBookRequest: action.pendingAcceptList
      }
  
    case PENDING_RETURN_REQUEST_ERROR:
      return { ...state, error: action.error }
    
    case DELETE_BOOK_SUCCESS: {
      const newBookList = 
      state.allBooks.filter(book => book.id !== action.bookId);
      return { ...state, allBooks:newBookList }
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
        borrowedBookRequest.id !== action.borrowedBook.id )
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
      returnedBookRequest.id !== action.returnedBook.id )
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
      
    default :
      return state
  }
}






