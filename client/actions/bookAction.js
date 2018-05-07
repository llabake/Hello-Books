import axios from 'axios';
import {
  FETCH_BOOK_SUCCESS, FETCH_BOOK_ERROR,
  ADD_BOOK_SUCCESS, ADD_BOOK_ERROR, ADD_BOOK, FETCH_SINGLE_BOOK,
  FETCH_SINGLE_BOOK_SUCCESS, FETCH_SINGLE_BOOK_ERROR,
  FAVORITE_BOOK, FAVORITE_BOOK_ERROR, FAVORITE_BOOK_SUCCESS,
  UPVOTE, UPVOTE_SUCCESS, UPVOTE_ERROR, DOWNVOTE,
  DOWNVOTE_SUCCESS, DOWNVOTE_ERROR, REVIEW,
  REVIEW_ERROR, REVIEW_SUCCESS, BORROW,
  BORROW_SUCCESS, BORROW_ERROR,
  SHOW_ALL_REVIEWS, SHOW_REVIEW_TEXT_AREA,
  SEARCH_ALL_BOOKS, SEARCH_ALL_BOOKS_SUCCESS,
  SEARCH_ALL_BOOKS_ERROR,
  DELETE_BOOK_REVIEW,
  DELETE_BOOK_REVIEW_SUCCESS,
  DELETE_BOOK_REVIEW_ERROR,
  MODIFY_REVIEW,
  MODIFY_REVIEW_SUCCESS,
  MODIFY_REVIEW_ERROR,
  LOAD_REVIEW_FOR_EDIT,
  POPULAR_BOOK,
  FETCH_POPULAR_BOOK_SUCCESS,
  FETCH_POPULAR_BOOK_ERROR,
  TOP_FAVORITED_BOOKS, 
  FETCH_TOP_FAVORITED_BOOKS_SUCCESS, 
  FETCH_TOP_FAVORITED_BOOKS_ERROR,
  FETCH_BOOK,
  HANDLE_CANCEL_CLICK,
  SET_BOOK_COUNT
} from './actionTypes'
import toastMessage from '../helpers/toastMessage';
import { hostUrl, maxPageLimit } from '../helpers/utils';
import axiosDefaultOptions from '../helpers/axiosDefaultOptions';

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
  const axiosOptions = {
    headers: {
      Authorization: localStorage.getItem('token')
    },
  };  
  return axios.get(`${hostUrl}/api/v1/books?page=${page}&limit=${limit}`, axiosOptions)
    .then((response) => {
      dispatch(fetchBookSuccess(response.data.books));
      dispatch(setBookCount(response.data.count))
    })
    .catch((error) => {
      dispatch(fetchBookError(error.response.data))
    })
};

const popularBooks = () => {
  return {
    type: POPULAR_BOOK
  }
}

const fetchPopularBooksSuccess = (popularBooks) => {
  return {
    type: FETCH_POPULAR_BOOK_SUCCESS,
    popularBooks
  }
};

const fetchPopularBooksError = (error) => {
  return {
    type: FETCH_POPULAR_BOOK_ERROR,
    error
  }
}


export const fetchPopularBooks = () => dispatch => {
  dispatch(popularBooks());
  return axios.get(`${hostUrl}/api/v1/users/books/popular-books`)
    .then((response) => {
      dispatch(fetchPopularBooksSuccess(response.data.books))
    })
    .catch((error) => {
      dispatch(fetchPopularBooksError(error.response.data))
    })
}

const topFavoritedBooks = () => {
  return {
    type: TOP_FAVORITED_BOOKS
  }
}

const fetchTopFavoriteBooksSuccess = (topFavoriteBooks) => {
  return {
    type: FETCH_TOP_FAVORITED_BOOKS_SUCCESS,
    topFavoriteBooks

  }
}

const fetchTopFavoriteBooksError = (error) => {
  return {
    type: FETCH_TOP_FAVORITED_BOOKS_ERROR,
    error
  }
}

export const fetchTopFavoriteBooks = () => dispatch => {
  dispatch(topFavoritedBooks());
  return axios.get(`${hostUrl}/api/v1/books/fav/top-favorite`)
    .then((response) => {
    dispatch(fetchTopFavoriteBooksSuccess(response.data.books))
    })
    .catch((error) => {
    dispatch(fetchTopFavoriteBooksError(error.response.data))
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

export const uploadImageToCloudinary = (image) => {
  const Cloudinary_URL = `https://api.cloudinary.com/v1_1/sardaunan/image/upload`
  const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", 'pwkzs5mq');
    formData.append("api_key", '928722593279314');
    formData.append("timestamp", (Date.now() / 1000) | 0);
    
    // Make an AJAX upload request using Axios
    return new Promise ((resolve, reject) => {
      return axios.post(Cloudinary_URL, formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const fileUrl = response.data.secure_url
        resolve(fileUrl)
      }).catch(error => reject(error))
    })
    
}

export const saveBookData = bookData => dispatch => {
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

export const saveBook = bookData => dispatch => {
  dispatch(addBook());
  if (bookData.uploadedImage) {
    return uploadImageToCloudinary(bookData.uploadedImage)
    .then((fileUrl) => {
      bookData.image = fileUrl;
      return dispatch(saveBookData(bookData))
      }).catch(() => {
        toastMessage('An error occurred, please try uploading your image again', 'failure')
      })
  } else {
    return dispatch(saveBookData(bookData))
  }
}


const singleBook = () => {
  return {
    type: FETCH_SINGLE_BOOK
  }
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
  dispatch(singleBook());
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
    dispatch(favoriteBookSuccess(response.data.book))
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
    type: SHOW_REVIEW_TEXT_AREA
  }
}

const showAllReviewsAction = () => {
  return {
    type: SHOW_ALL_REVIEWS
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
    dispatch(borrowBookSuccess(response.data.book))
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


const deleteReview = () => {
  return {
    type: DELETE_BOOK_REVIEW
  }
}

const deleteReviewSuccess = (reviewId) => {
  return {
    type: DELETE_BOOK_REVIEW_SUCCESS,
    reviewId
  }
}

const deleteReviewError = error => {
  return {
    type: DELETE_BOOK_REVIEW_ERROR,
    error
  }
}

export const deleteBookReview = reviewId => dispatch => {
  dispatch(deleteReview());
  return axios.delete(`${hostUrl}/api/v1/books/review/${reviewId}`, axiosDefaultOptions)
  .then(() => {
    dispatch(deleteReviewSuccess(reviewId))
  })
  .catch((error) => {
    dispatch(deleteReviewError(error))
    toastMessage(error.response.data.message, 'failure')
  })
}

const loadReviewToEdit = (reviewToEdit) => {
  return {
    type: LOAD_REVIEW_FOR_EDIT,
    reviewToEdit
  }
}

export const loadReviewToEditAction = (reviewToEdit) => dispatch => {
  dispatch(loadReviewToEdit(reviewToEdit))
}

const modifyReview = () => {
  return {
    type: MODIFY_REVIEW
  }
}

const modifyReviewSuccess = (editedReview) => {
  return {
    type: MODIFY_REVIEW_SUCCESS,
    editedReview
  }
}

const modifyReviewError = (error) => {
  return {
    type: MODIFY_REVIEW_ERROR,
    error
  }
}

export const modifyReviewAction = (reviewId, reviewData) => dispatch => {
  dispatch(modifyReview());
  return axios.put(`${hostUrl}/api/v1/book/review/${reviewId}`, reviewData, axiosDefaultOptions)
  .then((response) => {
    dispatch(modifyReviewSuccess(response.data.review))
    toastMessage(response.data.message, 'success')
  })
  .catch((error) => {
    dispatch(modifyReviewError(error));
    toastMessage(error.response.data.message, 'failure')
  })
}

const handleCancel = () => {
  return {
    type: HANDLE_CANCEL_CLICK
  }
}

export const handleCancelClick = () => dispatch => {
  console.log('got here')
  dispatch(handleCancel())
}