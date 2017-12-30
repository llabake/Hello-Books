import { USER_SIGNUP_REQUEST, CHECK_USER_EXISTS } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.signUpUser, action) => {
  switch(action.type) {
    case CHECK_USER_EXISTS: 
      const newState = Object.assign({}, state)
      newState.errors.username.push(action.payload.error)
      return { ...newState}

    case USER_SIGNUP_REQUEST:
      return {
        ...state,
      }

    default :
    return state
  }
}