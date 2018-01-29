import axios from 'axios';
import { FETCH_BOOK_SUCCESS, FETCH_BOOK_ERROR,
        ADD_BOOK_SUCCESS, ADD_BOOK_ERROR, ADD_BOOK,
        FETCH_SINGLE_BOOK_SUCCESS, FETCH_SINGLE_BOOK_ERROR,
        FAVORITE_BOOK, FAVORITE_BOOK_ERROR, FAVORITE_BOOK_SUCCESS,
        UPVOTE, UPVOTE_SUCCESS, UPVOTE_ERROR, DOWNVOTE,
        DOWNVOTE_SUCCESS, DOWNVOTE_ERROR, REVIEW, 
        REVIEW_ERROR, REVIEW_SUCCESS, BORROW, 
        BORROW_SUCCESS, BORROW_ERROR,
        SHOWALLREVIEWS, SHOWREVIEWTEXTAREA,
        SEARCH_ALL_BOOKS, SEARCH_ALL_BOOKS_SUCCESS,
        SEARCH_ALL_BOOKS_ERROR,
      } from './actionTypes'
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

const fetchSingleBookSuccess = (book) => {
  return {
    type: FETCH_SINGLE_BOOK_SUCCESS,
    book
  }
}

const fetchSingleBookError = (error) => {
  return {
    type: FETCH_SINGLE_BOOK_ERROR,
    error
  }
}
export const fetchSingleBook = (bookId) => dispatch => {
  return axios.get(`${hostUrl}/api/v1/books/${bookId}`, axiosDefaultOptions)
    .then((response) => {
      dispatch(fetchSingleBookSuccess(response.data.book))
    })
    .catch((error) => {
      dispatch(fetchSingleBookError(error.response.data))
    })
}


const favoriteBook = () => {
  return {
    type: FAVORITE_BOOK
  }
}

const favoriteBookSuccess = (favoritedBook) => {
  return {
    type: FAVORITE_BOOK_SUCCESS,
    favoritedBook
  }
}

const favoriteBookError = (error) => {
  return {
    type: FAVORITE_BOOK_ERROR,
    error
  }
}

export const favoriteABook = (bookId) => dispatch => {
  dispatch(favoriteBook());
  return axios.post(`${hostUrl}/api/v1/books/fav/${bookId}`, {}, axiosDefaultOptions)
  .then((response) => {
    dispatch(favoriteBookSuccess(response.data))
    toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(favoriteBookError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}

const upVote = () => {
  return {
    type: UPVOTE
  }
}

const upVoteSuccess = (upvotedBook) => {
  return {
    type: UPVOTE_SUCCESS,
    upvotedBook
  }
}

const upVoteError = (error) => {
  return {
    type: UPVOTE_ERROR,
    error
  }
}

export const upVoteBook = (bookId) => dispatch => {
  dispatch(upVote());
  return axios.post(`${hostUrl}/api/v1/books/${bookId}/upvote`, {}, axiosDefaultOptions)
  .then((response) => {
    dispatch(upVoteSuccess(response.data.book))
    toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(upVoteError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}

const downVote = () => {
  return {
    type: DOWNVOTE
  }
}

const downVoteSuccess = (downvotedBook) => {
  return {
    type: DOWNVOTE_SUCCESS,
    downvotedBook
  }
}

const downVoteError = (error) => {
  return {
    type: DOWNVOTE_ERROR,
    error
  }
}

export const downVoteBook = (bookId) => dispatch => {
  dispatch(downVote());
  return axios.post(`${hostUrl}/api/v1/books/${bookId}/downvote`, {}, axiosDefaultOptions)
  .then((response) => {
    dispatch(downVoteSuccess(response.data.book))
    toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(downVoteError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}

const showReviewTextAreaAction = () => {
  return {
    type: SHOWREVIEWTEXTAREA
  }
}

const showAllReviewsAction = () => {
  return {
    type: SHOWALLREVIEWS
  }
}

const review = () => {
  return {
    type: REVIEW
  }
}

const reviewBookSuccess = (reviewedBook) => {
  return {
    type: REVIEW_SUCCESS,
    reviewedBook
  }
}

const reviewBookError = (error) => {
  return {
    type: REVIEW_ERROR,
    error
  }
}

export const showReviewTextArea = () => dispatch => {
  dispatch(showReviewTextAreaAction())
}

export const showAllReviews = () => dispatch => {
  dispatch(showAllReviewsAction())
}

export const reviewBook = (bookId, reviewData) => dispatch => {
  dispatch(review());
  return axios.post(`${hostUrl}/api/v1/books/${bookId}/review`, reviewData, axiosDefaultOptions)
  .then((response) => {
    dispatch(reviewBookSuccess(response.data.book))
    toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(reviewBookError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}

const borrow = () => {
  return {
    type: BORROW
  }
}

const borrowBookSuccess = (borrowedBook) => {
  return {
    type: BORROW_SUCCESS,
    borrowedBook
  }
}

const borrowBookError = (error) => {
  return {
    type: BORROW_ERROR,
    error
  }
}

export const borrowBook = (bookId) => dispatch => {
  dispatch(borrow());
  return axios.post(`${hostUrl}/api/v1/users/borrow/${bookId}`, {}, axiosDefaultOptions)
  .then((response) => {
    dispatch(borrowBookSuccess(response.data))
    toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(borrowBookError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}


const searchBooks = () => {
  return {
    type: SEARCH_ALL_BOOKS
  }
}

const searchBooksSuccess = (books) => {
  return {
    type: SEARCH_ALL_BOOKS_SUCCESS,
    books
  }
}

const searchBooksError = (error) => {
  return {
    type: SEARCH_ALL_BOOKS_ERROR,
    error
  }
}

export const fetchSearchedBooks = (searchTerm) => dispatch => {
  dispatch(searchBooks());
  return axios.get(`${hostUrl}/api/v1/books/?search=${searchTerm}`, axiosDefaultOptions)
  .then((response) => {
    dispatch(searchBooksSuccess(response.data.books))
    toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(searchBooksError(error))
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

export const deleteBookAction = (bookId) => dispatch => {
  dispatch(deleteBook());
    return axios.delete(`${hostUrl}/api/v1/books/${bookId}`,  axiosDefaultOptions)
    .then(() => {
      dispatch(deleteBookSuccess(bookId))
    })
    .catch((error) => {
      dispatch(deleteBookError(error))
      toastMessage(error.response.data.message, 'failure')
    })

}

const deleteBookReview = () => {

}
