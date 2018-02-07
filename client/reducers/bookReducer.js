import { FETCH_BOOK_SUCCESS, FETCH_BOOK_ERROR,FETCH_SINGLE_BOOK_SUCCESS,
         FETCH_SINGLE_BOOK_ERROR, FAVORITE_BOOK_ERROR,
         FAVORITE_BOOK_SUCCESS,
         UPVOTE_SUCCESS, UPVOTE_ERROR,
         DOWNVOTE_SUCCESS, DOWNVOTE_ERROR,
         SHOW_REVIEW_TEXT_AREA, REVIEW_SUCCESS, 
         REVIEW_ERROR, BORROW_SUCCESS,
         BORROW_ERROR,
         SHOW_ALL_REVIEWS,
         SEARCH_ALL_BOOKS_SUCCESS,
         SEARCH_ALL_BOOKS_ERROR,
         DELETE_BOOK_REVIEW_SUCCESS,
         DELETE_BOOK_REVIEW_ERROR,
         LOAD_REVIEW_FOR_EDIT,
         MODIFY_REVIEW_SUCCESS,
         MODIFY_REVIEW_ERROR,
        } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.books, action) => {
  switch(action.type) {
    case FETCH_BOOK_SUCCESS:
      return {...state, books: action.books }

    case FETCH_BOOK_ERROR:
      return { ...state, error: action.error}
    
    case FETCH_SINGLE_BOOK_SUCCESS:
      return {...state, book: action.book, }

    case FETCH_SINGLE_BOOK_ERROR:
      return { ...state, error: action.error }
    
      case FAVORITE_BOOK_SUCCESS:
      return {...state, addfavbook: action.favoritedBook }

    case FAVORITE_BOOK_ERROR:
      return {...state, error: action.error}
  
    case UPVOTE_SUCCESS: {
      const updatedBook = { ...state.book, ...action.upvotedBook }
        return {
          ...state,
          book:updatedBook,
          upvotedBook: action.upvotedBook
        }
    }
    
    case UPVOTE_ERROR:
      return { ...state, error: action.error}

    case DOWNVOTE_SUCCESS: {
      const newupdatedBook = { ...state.book, ...action.downvotedBook }
        return {
          ...state,
          book: newupdatedBook,
          downvotedBook: action.downvotedBook
        }
    }
    
    case DOWNVOTE_ERROR:
      return { ...state, error: action.error}
    
    case SHOW_REVIEW_TEXT_AREA: 
      return { ...state, loadAllReview: false, loadTextArea: true }
    
    case SHOW_ALL_REVIEWS:
      return { ...state, loadAllReview: true, loadTextArea: false,}

    case REVIEW_SUCCESS:
      return { ...state, loadTextArea: false, book: action.reviewedBook }
    
    case REVIEW_ERROR: 
      return { ...state, error: action.error}

    case BORROW_SUCCESS:
      return { ...state, borrowedBook: action.borrowedBook }
    
    case BORROW_ERROR:
      return { ...state, error: action.error }

    case SEARCH_ALL_BOOKS_SUCCESS: 
      return { ...state, searchResult: action.books }

    case SEARCH_ALL_BOOKS_ERROR: 
      return { ...state, error: action.error}
    
    case DELETE_BOOK_REVIEW_SUCCESS: {
      const newBookReviewList = state.book.reviews.filter(review => review.id !== action.reviewId )
      return { ...state, book: newBookReviewList}
    }

    case DELETE_BOOK_REVIEW_ERROR: 
      return { ...state, error: action.error }

    case LOAD_REVIEW_FOR_EDIT:
      return { ...state, editReview: true, reviewToEdit: action.reviewToEdit  }

    case MODIFY_REVIEW_SUCCESS: {
      const updatedBookReviews = 
      state.book.reviews.map((review) => {
        return review.id == action.editedReview.id ? { ...action.editedReview, user:review.user }: review
      })
      const updatedBook = { ...state.book, reviews: updatedBookReviews }
      return {
        ...state,
        book: updatedBook,
        editReview: false,
        loadAllReview: true
      }
    }

    case MODIFY_REVIEW_ERROR: 
      return { ...state, error: action.error}

    default :
    return state
  }
}