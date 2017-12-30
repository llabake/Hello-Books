import axios from 'axios';
import { USER_SIGNUP_REQUEST, CHECK_USER_EXISTS, CREATE_USER_SUCCESS, CREATE_USER_FAILURE, SET_CURRENT_USER, } from './actionTypes';

export function getUrl() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://myhellobooks.herokuapp.com'
  } else {
    return 'http://localhost:5000'
  }
}

const userSignUpRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST,
        
  }
}

const userExist = (field, error) => {
  return {
    type: CHECK_USER_EXISTS,
    payload: { 
      [field]: error 
    }
  }
}



/**
 * 
 * 
 * @export
 * @param {any} field 
 * @param {any} userInput 
 * @returns {Object} user response object
 */
export const checkUserExist = (field, userInput) => (dispatch) => {
  return axios.get(`${getUrl()}/api/v1/users/signup/?${field}=${userInput}`)
}

export const signUpUser = userData => (dispatch) => {
  return axios.post(`${getUrl()}/api/v1/users/signup/`, userData)

}



