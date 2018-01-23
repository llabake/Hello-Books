import initialState from './initialState';
import { USER_SIGNUP_REQUEST,  SET_CURRENT_USER,
  USER_BORROW_LIST_SUCCESS, 
  USER_BORROW_LIST_ERROR,
  USER_FAVORITE_LIST_SUCCESS,
  REMOVE_FROM_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_ERROR} from '../actions/actionTypes';

export default (state = initialState.user, action) => {
  switch(action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
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
    
    case USER_FAVORITE_LIST_SUCCESS:
      return { ...state, favoriteBooks: action.favoriteBooks}

    case REMOVE_FROM_FAVORITES_SUCCESS: {
      const newFavoriteBooksList = 
      state.favoriteBooks.filter(favoriteBook => favoriteBook.book.id !== action.bookId)
      return { ...state, favoriteBooks: newFavoriteBooksList}
    }
    
    case REMOVE_FROM_FAVORITES_ERROR: 
      return { ...state, error: action.error }
    default :
      return state
    
  }
}