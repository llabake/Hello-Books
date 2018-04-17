import axios from 'axios';
import bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import {
  USER_SIGNUP_REQUEST, CHECK_USER_EXISTS,
  USER_SIGNUP_SUCCESS, USER_SIGNUP_ERROR,
  SET_CURRENT_USER, USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS, USER_SIGNIN_ERROR,
  USER_BORROW_LIST,
  USER_BORROW_LIST_SUCCESS,
  USER_BORROW_LIST_ERROR,
  RETURN,
  RETURN_SUCCESS,
  RETURN_ERROR,
  USER_FAVORITE_LIST,
  USER_FAVORITE_LIST_SUCCESS,
  USER_FAVORITE_LIST_ERROR,
  REMOVE_FROM_FAVORITES,
  REMOVE_FROM_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_ERROR,
  LOGOUT_REQUEST,
  UNSET_CURRENT_USER,
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ERROR,
  EDIT_USER_PROFILE,
  EDIT_USER_PROFILE_SUCCESS,
  EDIT_USER_PROFILE_ERROR
} from './actionTypes';
import toastMessage from '../helpers/toastMessage';
import { hostUrl } from '../helpers/utils';
import axiosDefaultOptions from '../helpers/axiosDefaultOptions';
import { uploadImageToCloudinary } from './bookAction';



const userSignUpRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST,
  }
}

const userExist = () => {
  return {
    type: CHECK_USER_EXISTS,
  }
}

const userSignUpSuccess = (user) => {
  return {
    type: USER_SIGNUP_SUCCESS,
    user
  }
}

const userSignUpError = (error) => {
  return {
    type: USER_SIGNUP_ERROR,
    error
  }
}

export const setCurrentUser = (user) => {
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
  // return new Promise((resolve, reject) => {
    return axios.post(`${hostUrl}/api/v1/users/signup/`, userData)
      .then((response) => {
        dispatch(userSignUpSuccess(response.data.user))
        const { token } = response.data;
        localStorage.setItem('token', token)
        dispatch(setCurrentUser(jwt.decode(token)));
        toastMessage(response.data.message, 'success');
        // resolve(response)
      })
      .catch((error) => {
        dispatch(userSignUpError(error))
        toastMessage('Signup failed. Please try again', 'failure')
        // reject(error)
      })

  // })

}


const userSignIn = () => {
  return {
    type: USER_SIGNIN_REQUEST,
  }
}

const userSignInSuccess = (user) => {
  return {
    type: USER_SIGNIN_SUCCESS,
    user
  }
}

const userSignInError = (error) => {
  return {
    type: USER_SIGNIN_ERROR,
    error
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
  return axios.post(`${hostUrl}/api/v1/users/signin/`, userData)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem('token', token) 
      const decodedToken = jwt.decode(token)
      const authUser = decodedToken.user
      // localStorage.setItem('user', JSON.stringify(authUser))
      dispatch(userSignInSuccess(authUser))
      dispatch(setCurrentUser(authUser));
      toastMessage(response.data.message, 'success');
    })
    .catch((error) => {
      dispatch(userSignInError(error))
      toastMessage('Username or Password incorrect', 'failure')
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
      dispatch(returnBookSuccess(response.data.borrowedBook))
      toastMessage(response.data.message, 'success')
    })
    .catch((error) => {
      dispatch(returnBookError(error))
      toastMessage(error.response.data.message, 'failure')
    })
}

const userFavoriteList = () => {
  return {
    type: USER_FAVORITE_LIST
  }
}

const userFavoriteListSuccess = (favoriteBooks) => {
  return {
    type: USER_FAVORITE_LIST_SUCCESS,
    favoriteBooks
  }
}

const userFavoriteListError = (error) => {
  return {
    type: USER_FAVORITE_LIST_ERROR,
    error
  }
}

export const fetchUserFavoriteBooks = () => dispatch => {
  dispatch(userFavoriteList());
  return axios.get(`${hostUrl}/api/v1/books/favbooks`, axiosDefaultOptions)
    .then((response) => {
      dispatch(userFavoriteListSuccess(response.data.favorites))
    })
    .catch((error) => {
      dispatch(userFavoriteListError(error))
      toastMessage(error.response.data.message, 'failure')
    })
}

const unFavorite = () => {
  return {
    type: REMOVE_FROM_FAVORITES
  }
}

const unFavoriteSuccess = (bookId) => {
  return {
    type: REMOVE_FROM_FAVORITES_SUCCESS,
    bookId
  }
}

const unFavoriteError = (error) => {
  return {
    type: REMOVE_FROM_FAVORITES_ERROR,
    error
  }
}

export const removeFromFavorite = bookId => dispatch => {
  dispatch(unFavorite());
  return axios.delete(`${hostUrl}/api/v1/books/fav/${bookId}`, axiosDefaultOptions)
    .then((response) => {
      dispatch(unFavoriteSuccess(bookId));
      toastMessage(response.data.message, 'success')
    })
    .catch((error) => {
      dispatch(unFavoriteError(error));
      toastMessage(error.response.data.message, 'failure')
    })
}


const userLogoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  }
}

const unSetCurrentUser = (user) => {
  return {
    type: UNSET_CURRENT_USER,
    user
  }
}
export const logout = () => dispatch => {
  dispatch(userLogoutRequest());
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  const user = {};
  return dispatch(unSetCurrentUser(user));
}


const fetchUserProfile = () => {
  return {
    type: FETCH_USER_PROFILE
  }
}

const fetchUserProfileSuccess = (profile) => {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    profile
  }
}

const fetchUserProfileError = (error) => {
  return {
    type: FETCH_USER_PROFILE_ERROR,
    error
  }
}

export const getUserProfile = () => dispatch => {
  dispatch(fetchUserProfile());
  return new Promise((resolve, reject) => {
    return axios.get(`${hostUrl}/api/v1/users/profile`, axiosDefaultOptions)
      .then((response) => {
        dispatch(fetchUserProfileSuccess(response.data.profile))
        resolve()
      })
      .catch((error) => {
        dispatch(fetchUserProfileError(error));
        toastMessage(error.response.data.message, 'failure')
        reject(error)
      })
  })
}

const editUserProfile = () => {
  return {
    type: EDIT_USER_PROFILE
  }
}

const editUserProfileSuccess = (user) => {
  return {
    type: EDIT_USER_PROFILE_SUCCESS,
    user
  }
}

const editUserProfileError = (error) => {
  return {
    type: EDIT_USER_PROFILE_ERROR,
    error
  }
}


export const editProfileData = userData => dispatch => {
  return axios.put(`${hostUrl}/api/v1/users/profile`, userData, axiosDefaultOptions)
    .then((response) => {
      dispatch(editUserProfileSuccess(response.data.profile))
      toastMessage(response.data.message, 'success')

    })
    .catch((error) => {
      dispatch(editUserProfileError(error));
      toastMessage(error.response.data.message, 'failure')
    })
}
export const editProfile = userData => dispatch => {
  dispatch(editUserProfile());
  if (userData.uploadedImage) {
    return uploadImageToCloudinary(userData.uploadedImage).then((fileUrl) => {
      userData.image = fileUrl;
      dispatch(editProfileData(userData))
    }).catch(() => {
      toastMessage('An error occurred, please try uploading your image again', 'failure')
    })
  } else {
    dispatch(editProfileData(userData))
  }
}

