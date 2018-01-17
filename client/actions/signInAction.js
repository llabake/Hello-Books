import axios from 'axios';
import jwt from 'jsonwebtoken';
import bluebird from 'bluebird';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
         USER_SIGNIN_ERROR, SET_CURRENT_USER 
        } from './actionTypes';
import toastMessage from '../helpers/toastMessage';
import { hostUrl } from '../helpers/utils';



const userSignIn = () => {
  return {
    type: USER_SIGNIN_REQUEST,
  }
}

const userSignInSuccess = (response) => {
  return {
    type: USER_SIGNIN_SUCCESS,
    payload: response
  }
}

const userSignInError = (error) => {
  return {
    type: USER_SIGNIN_ERROR,
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
 * @param {any} userData 
 * @returns {message} sign in operation message
 */
const signInUser = userData => (dispatch) => {
  dispatch(userSignIn());
  return new Promise((resolve, reject) => {
    return axios.post(`${hostUrl}/api/v1/users/signin/`, userData)
      .then((response) => {
        dispatch(userSignInSuccess(response))
        const { token } = response.data;
        localStorage.setItem('token', token)
        const user = jwt.decode(token).user
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(setCurrentUser(user));
        toastMessage(response.data.message, 'success');
        resolve(response)
      })
      .catch((error) => {
        dispatch(userSignInError(error))
        toastMessage('Username or Password incorrect', 'failure')
        reject(error)
      })
  
  })
  
}


export default signInUser;
