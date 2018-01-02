import axios from 'axios';
import { FETCH_BOOK_SUCCESS, FETCH_BOOK_ERROR } from './actionTypes'

const hostUrl = process.env.NODE_ENV === 'production' ?
  'https://myhellobooks.herokuapp.com' :
  'http://localhost:5000';

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


export const fetchAllBooksRequest = () => (dispatch) => {
  return axios.get(`${hostUrl}/api/v1/books/`)
}

export const fetchAllBooks = () => dispatch => {
  return axios.get(`${hostUrl}/api/v1/books/`)
    .then((response) => {
      dispatch(fetchBookSuccess(response.data.books))
    })
    .catch((error) => {
      dispatch(fetchBookError(error.response.data))
    })
}