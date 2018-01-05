import axios from 'axios';
import { FETCH_BOOK_SUCCESS, FETCH_BOOK_ERROR,
        ADD_BOOK_SUCCESS, ADD_BOOK_ERROR, ADD_BOOK,
        FETCH_SINGLE_BOOK_SUCCESS, FETCH_SINGLE_BOOK_ERROR } from './actionTypes'
import toastMessage from '../helpers/toastMessage';
import { hostUrl } from '../helpers/utils';
import axiosDefaultOptions from '../helpers/axiosDefaultOptions';

const fetchBookSuccess = (books) => {
  return {
    type: FETCH_BOOK_SUCCESS,
    books
  }
}

const fetchBookError = (error) => {
  return {
    type: FETCH_BOOK_ERROR,
    error
  }
}

export const fetchAllBooks = () => dispatch => {
  return axios.get(`${hostUrl}/api/v1/books/`, axiosDefaultOptions)
    .then((response) => {
      dispatch(fetchBookSuccess(response.data.books))
    })
    .catch((error) => {
      dispatch(fetchBookError(error.response.data))
    })
}

const addBook = () => {
  return {
    type: ADD_BOOK
  }
}
const addBookSuccess = (book) => {
  return {
    type: ADD_BOOK_SUCCESS,
    book
  }
}

const addBookError = (error) => {
  return {
    type: ADD_BOOK_ERROR,
    error
  }
}

export const checkIsbnExist = (field, userInput) => (dispatch) => {
  return axios.get(`${hostUrl}/api/v1/books/add/validate?${field}=${userInput}`)
}

export const saveBook = bookData => dispatch => {
  dispatch(addBook());
  return axios.post(`${hostUrl}/api/v1/books/`, bookData, axiosDefaultOptions)
    .then((response) => {
      dispatch(addBookSuccess(response.data.book));
      toastMessage(response.data.message, 'success');
    })
    .catch((error) => {
      dispatch(addBookError(error))
      toastMessage(error.response.data.message, 'failure')
    })
}
