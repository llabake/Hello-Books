import { FETCH_BOOK_SUCCESS, FETCH_BOOK_ERROR } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.books, action) => {
  switch(action.type) {
    case FETCH_BOOK_SUCCESS:
      return {...state, books: action.books }

    case FETCH_BOOK_ERROR:
      return action.error

    default :
    return state
  }
}