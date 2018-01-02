import { USER_SIGNUP_REQUEST,  SET_CURRENT_USER } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.signUpUser, action) => {
  switch(action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.user,
        authenticated: true
      } 

    default :
    return state
  }
}