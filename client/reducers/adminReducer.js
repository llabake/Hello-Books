import initialState from './initialState';
import { FETCH_BOOK_SUCCESS,
  FETCH_BOOK_ERROR,
  PENDING_BORROW_REQUEST_SUCCESS,
  PENDING_BORROW_REQUEST_ERROR,
  PENDING_RETURN_REQUEST_SUCCESS,
  PENDING_RETURN_REQUEST_ERROR,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_ERROR,
} from '../actions/actionTypes';

export default (state = initialState.admin, action) => {
  switch(action.type) {
    case FETCH_BOOK_SUCCESS:
      return {...state, allBooks: action.books }

    case FETCH_BOOK_ERROR:
      return { ...state, error: action.error}

    case PENDING_BORROW_REQUEST_SUCCESS:
      return {
        ...state,
        pendingBorrowedBookRequest: action.pendingBorrowList
      }

    case PENDING_BORROW_REQUEST_ERROR:
      return { ...state, error: action.error}
    
    case PENDING_RETURN_REQUEST_SUCCESS:
      return {
        ...state,
        pendingReturnedBookRequest: action.pendingAcceptList
      }
  
    case PENDING_RETURN_REQUEST_ERROR:
      return { ...state, error: action.error }
    
    case DELETE_BOOK_SUCCESS:
      const newBookList = 
      state.allBooks.filter(book => book.id !== action.bookId);
      return { ...state, allBooks:newBookList }
    
    case DELETE_BOOK_ERROR:
      return { ...state, error: action.error }

    default :
      return state
  }
}






