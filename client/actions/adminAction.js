import axios from 'axios';
import bluebird, { Promise } from 'bluebird';
import toastMessage from '..//helpers/toastMessage';
import { hostUrl, maxPageLimit } from '../helpers/utils';
import axiosDefaultOptions from '../helpers/axiosDefaultOptions';
import {
  FETCH_BOOK,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_ERROR,
  PENDING_BORROW_REQUEST,
  PENDING_BORROW_REQUEST_SUCCESS,
  PENDING_BORROW_REQUEST_ERROR, 
  PENDING_RETURN_REQUEST,
  PENDING_RETURN_REQUEST_SUCCESS,
  PENDING_RETURN_REQUEST_ERROR,
  DELETE_BOOK,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_ERROR,
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  ACCEPT_BOOK_BORROW,
  ACCEPT_BOOK_BORROW_SUCCESS,
  ACCEPT_BOOK_BORROW_ERROR,
  ACCEPT_BOOK_RETURN,
  ACCEPT_BOOK_RETURN_SUCCESS,
  ACCEPT_BOOK_RETURN_ERROR,
  SET_BOOK_COUNT,
  SET_BORROWED_BOOK_COUNT,
  SET_RETURNED_BOOK_COUNT
} from './actionTypes';



const fetchBook = () => {
  return {
    type: FETCH_BOOK
  }
}
const fetchBookSuccess = (books) => {
  return {
    type: FETCH_BOOK_SUCCESS,
    books
  }
}

const setBookCount = (bookCount) => {
  return {
    type: SET_BOOK_COUNT,
    bookCount
  }
}

const fetchBookError = (error) => {
  return {
    type: FETCH_BOOK_ERROR,
    error
  }
}

export const fetchAllBooks = (page=1, limit=maxPageLimit) => dispatch => {
  dispatch(fetchBook());
  return axios.get(`${hostUrl}/api/v1/books?page=${page}&limit=${limit}`, axiosDefaultOptions())
    .then((response) => {
      dispatch(fetchBookSuccess(response.data.books))
      dispatch(setBookCount(response.data.count))      
    })
    .catch((error) => {
      dispatch(fetchBookError(error.response.data))
    })
}

const pendingAcceptBorrow = () => {
  return {
    type: PENDING_BORROW_REQUEST
  }
}

const pendingAcceptBorrowSuccess = (pendingBorrowList) => {
  return {
    type: PENDING_BORROW_REQUEST_SUCCESS,
    pendingBorrowList
  }
}


const setBorrowedBookCount = (bookCount) => {
  return {
    type: SET_BORROWED_BOOK_COUNT,
    bookCount
  }
}
const pendingAcceptBorrowError = (error) => {
  return {
    type: PENDING_BORROW_REQUEST_ERROR,
    error
  }
}

export const pendingAcceptBorrowRequest = (page=1, limit=maxPageLimit) => dispatch => {
  dispatch(pendingAcceptBorrow());
  return axios.get(`${hostUrl}/api/v1/admin/books/borrowed-books/?borrowStatus=pending&page=${page}&limit=${limit}`, axiosDefaultOptions())
  .then((response) => {
    dispatch(pendingAcceptBorrowSuccess(response.data.borrowedBooks))
    dispatch(setBorrowedBookCount(response.data.count))
    // toastMessage('Book fetch successful', 'success')
  })
  .catch((error) => {
    dispatch(pendingAcceptBorrowError(error))
    toastMessage('book fetch failed', 'failure')
  })
}

const pendingAcceptReturn = () => {
  return {
    type:PENDING_RETURN_REQUEST
  }
}

const pendingAcceptReturnSuccess = (pendingAcceptList) => {
  return {
    type: PENDING_RETURN_REQUEST_SUCCESS,
    pendingAcceptList
  }
}


const setReturnedBookCount = (bookCount) => {
  return {
    type: SET_RETURNED_BOOK_COUNT,
    bookCount
  }
}
const pendingAcceptReturnError = (error) => {
  return {
    type: PENDING_RETURN_REQUEST_ERROR,
    error
  }
}

export const pendingAcceptReturnRequest = (page=1, limit=maxPageLimit) => dispatch => {
  dispatch(pendingAcceptReturn());
  return axios.get(`${hostUrl}/api/v1/admin/books/borrowed-books/?returnStatus=pending&page=${page}&limit=${limit}`, axiosDefaultOptions())
  .then((response) => {
    dispatch(pendingAcceptReturnSuccess(response.data.borrowedBooks))
    dispatch(setReturnedBookCount(response.data.count))    
    // toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(pendingAcceptReturnError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}
 

const deleteBook = () => {
  return {
    type: DELETE_BOOK
  }
}

const deleteBookSuccess = (bookId) => {
  return {
    type:DELETE_BOOK_SUCCESS,
    bookId
  }
}

const deleteBookError = (error) => {
  return {
    type: DELETE_BOOK_ERROR,
    error
  }
}

export const deleteBookAction = (bookId) => (dispatch, getState) => {
  dispatch(deleteBook());
    return axios.delete(`${hostUrl}/api/v1/books/${bookId}`,  axiosDefaultOptions())
    .then(() => {
      dispatch(deleteBookSuccess(bookId))
      dispatch(setBookCount(getState().adminReducer.bookCount - 1));
    })
    .catch((error) => {
      dispatch(deleteBookError(error))
      toastMessage(error.response.data.message, 'failure')
    })

}


const update = () => {
  return {
    type: UPDATE
  }
}

const updateSuccess = (book) => {
  return {
    type: UPDATE_SUCCESS,
    book
  }
}

const updateError = (error) => {
  return {
    type: UPDATE_ERROR,
    error
  }
}


export const updateBook = (bookId, bookData) => dispatch => {
  dispatch(update());
  return new Promise((resolve, reject) => {
    return axios.put(`${hostUrl}/api/v1/books/${bookId}`, bookData, axiosDefaultOptions())
    .then((response) => {
      dispatch(updateSuccess(response.data.book))
      toastMessage(response.data.message, 'success')
      resolve(response)
    })
    .catch((error) => {
      dispatch(updateError(error));
      toastMessage(error.response.data.message, 'failure')
      reject(error)
    })
  })
}

const acceptBookBorrow = () => {
  return {
    type: ACCEPT_BOOK_BORROW
  }
}

const acceptBookBorrowSuccess = (borrowedBook,) => {
  return {
    type: ACCEPT_BOOK_BORROW_SUCCESS,
    borrowedBook,
    
  }
}

const acceptBookBorrowError = (error) => {
  return {
    type: ACCEPT_BOOK_BORROW_ERROR,
    error
  }
}

export const acceptBookBorrowRequest = (bookId, userId) => (dispatch, getState) => {
  dispatch(acceptBookBorrow());
  return axios.put(`${hostUrl}/api/v1/admin/users/${userId}/borrow/${bookId}`, {},  axiosDefaultOptions())
  .then((response) => {
    dispatch(acceptBookBorrowSuccess(response.data.borrowedBook))
    dispatch(setBorrowedBookCount(getState().adminReducer.borrowedBookCount - 1));
    toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(acceptBookBorrowError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}

const acceptBookReturn = () => {
  return {
    type: ACCEPT_BOOK_RETURN
  }
}

const acceptBookReturnSuccess = (returnedBook) => {
  return {
    type: ACCEPT_BOOK_RETURN_SUCCESS,
    returnedBook
  }
}

const acceptBookReturnError = (error) => {
  return {
    type: ACCEPT_BOOK_RETURN_ERROR,
    error
  }
}

export const acceptBookReturnRequest = (bookId, userId) => (dispatch, getState) => {
  dispatch(acceptBookReturn());
  return axios.put(`${hostUrl}/api/v1/admin/users/${userId}/return/${bookId}`, {},  axiosDefaultOptions())
  .then((response) => {
    dispatch(acceptBookReturnSuccess(response.data.borrowedBook))
    dispatch(setReturnedBookCount(getState().adminReducer.returnedBookCount - 1));
    toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(acceptBookReturnError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}