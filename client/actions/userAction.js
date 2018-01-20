import axios from 'axios';
import bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import { USER_SIGNUP_REQUEST, CHECK_USER_EXISTS,
  USER_SIGNUP_SUCCESS, USER_SIGNUP_ERROR, 
  SET_CURRENT_USER, USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS, USER_SIGNIN_ERROR, 
  USER_BORROW_LIST,
  USER_BORROW_LIST_SUCCESS,
  USER_BORROW_LIST_ERROR,
  RETURN,
  RETURN_SUCCESS,
  RETURN_ERROR, } from './actionTypes';
import toastMessage from '../helpers/toastMessage';
import { hostUrl } from '../helpers/utils';
import axiosDefaultOptions from '../helpers/axiosDefaultOptions';



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
  dispatch(userExist());
  return axios.get(`${hostUrl}/api/v1/users/signup/validate?${field}=${userInput}`)
}


export const signUpUser = userData => (dispatch) => {
  dispatch(userSignUpRequest())
  return new Promise((resolve, reject) => {
    return axios.post(`${hostUrl}/api/v1/users/signup/`, userData)
    .then((response) => {
      dispatch(userSignUpSuccess(response))
      const { token } = response.data;
      localStorage.setItem('token', token)
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



/**
 * 
 * 
 * @param {any} userData 
 * @returns {message} sign in operation message
 */
export const signInUser = userData => (dispatch) => {
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

const userBorrowList = () => {
  return {
    type: USER_BORROW_LIST
  }
}

const userBorrowListSuccess = (borrowedBookList) => {
  return {
    type: USER_BORROW_LIST_SUCCESS,
    borrowedBookList
  }
}

const userBorrowListError = (error) => {
  return {
    type: USER_BORROW_LIST_ERROR,
    error
  }
}

export const fetchUserBorrowedBooks = () => dispatch => {
  dispatch(userBorrowList());
  return axios.get(`${hostUrl}/api/v1/user/borrowed_books/`, axiosDefaultOptions)
  .then((response) => {
    dispatch(userBorrowListSuccess(response.data.borrowedBooks));
    // toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(userBorrowListError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}

const returnBook = () => {
  return {
    type: RETURN
  }
}

const returnBookSuccess = (borrowedBook) => {
  return {
    type: RETURN_SUCCESS,
    borrowedBook
  }
}

const returnBookError = (error) => {
  return {
    type: RETURN_ERROR,
    error
  }
}

export const returnBookAction = bookId => dispatch => {
  dispatch(returnBook());
  return axios.post(`${hostUrl}/api/v1/users/return/${bookId}`, {}, axiosDefaultOptions)
  .then((response) => {
    dispatch(returnBookSuccess(response.data))
    toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    console.log(error.response)
    dispatch(returnBookError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}
