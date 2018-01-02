import axios from 'axios';
import bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import { USER_SIGNUP_REQUEST, CHECK_USER_EXISTS, USER_SIGNUP_SUCCESS, USER_SIGNUP_ERROR, SET_CURRENT_USER, } from './actionTypes';
import toastMessage from '../helpers/toastMessage';
import Authorization from '../helpers/authorization';




const hostUrl = process.env.NODE_ENV === 'production' ?
  'https://myhellobooks.herokuapp.com' :
  'http://localhost:5000';


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
const userSignUpSuccess = (response) => {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: response
  }
}

const userSignUpError = (error) => {
  return {
    type: USER_SIGNUP_ERROR,
    payload: error
  }
}

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
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
  return axios.get(`${hostUrl}/api/v1/users/signup/validate?${field}=${userInput}`)
}

// export const signUpUser = userData => (dispatch) => {
//   return axios.post(`${hostUrl}/api/v1/users/signup/`, userData)
// }

export const signUpUser = userData => (dispatch) => {
  dispatch(userSignUpRequest())
  return new Promise((resolve, reject) => {
    return axios.post(`${hostUrl}/api/v1/users/signup/`, userData)
    .then((response) => {
      dispatch(userSignUpSuccess(response))
      const { token } = response.data;
      localStorage.setItem('token', token)
      Authorization.setToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      toastMessage(response.data.message, 'success');
      resolve(response)
    })
    .catch((error) => {
      dispatch(userSignUpError(error))
      toastMessage('Signup failed. Please try again', 'failure')
      reject(error)
    })

  })
  
}

