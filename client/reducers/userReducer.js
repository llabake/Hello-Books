import initialState from './initialState';
import { USER_SIGNUP_REQUEST,  SET_CURRENT_USER,
  USER_BORROW_LIST_SUCCESS, 
  USER_BORROW_LIST_ERROR,
  USER_FAVORITE_LIST,
  USER_FAVORITE_LIST_SUCCESS,
  USER_FAVORITE_LIST_ERROR,
  REMOVE_FROM_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_ERROR,
  UNSET_CURRENT_USER,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR} from '../actions/actionTypes';

export default (state = initialState.user, action) => {
  switch(action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
      }
    case USER_SIGNUP_SUCCESS: 
      return {
        ...state,
        authUser: action.response,
        authenticated: true
      }
    case USER_SIGNUP_ERROR:
      return {
        ...state,
        error: action.error
      }
    case USER_SIGNIN_REQUEST: 
      return {
        ...state
      }
    case USER_SIGNIN_SUCCESS: {
      return {
        ...state,
        authUser: action.response,
        authenticated: true
      }
    }

    case USER_SIGNIN_ERROR: 
      return {
        ...state,
        error: action.error
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        authUser: action.user,
        authenticated: true
      } 
    case USER_BORROW_LIST_SUCCESS:
      return {
        ...state,
        borrowedBookHistory: action.borrowedBookList
      }

    case USER_BORROW_LIST_ERROR:
      return { ...state, error: action.error}

    case USER_FAVORITE_LIST: 
      return { ...state, loading: true }
    
    case USER_FAVORITE_LIST_SUCCESS:
      return { ...state, favoriteBooks: action.favoriteBooks, loading: false }
    
    case USER_FAVORITE_LIST_ERROR:
      return { ...state, error: action.error, loading: false }

    case REMOVE_FROM_FAVORITES_SUCCESS: {
      const newFavoriteBooksList = 
      state.favoriteBooks.filter(favoriteBook => favoriteBook.book.id !== action.bookId)
      return { ...state, favoriteBooks: newFavoriteBooksList}
    }
    
    case REMOVE_FROM_FAVORITES_ERROR: 
      return { ...state, error: action.error }

    case UNSET_CURRENT_USER:
      return {
        ...state,
        authenticated: false,
        authUser: action.user
      };
    default :
      return state
    
  }
}