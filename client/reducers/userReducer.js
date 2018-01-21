import initialState from './initialState';
import { USER_SIGNUP_REQUEST,  SET_CURRENT_USER,
  USER_BORROW_LIST_SUCCESS, 
  USER_BORROW_LIST_ERROR,
  USER_FAVORITE_LIST_SUCCESS} from '../actions/actionTypes';

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
    default :
      return state
  }
}