import { FETCH_BOOK_SUCCESS, FETCH_BOOK_ERROR, FETCH_SINGLE_BOOK_SUCCESS,
         FETCH_SINGLE_BOOK_ERROR, FAVORITE_BOOK_ERROR, FAVORITE_BOOK_SUCCESS,
         UPVOTE_SUCCESS, UPVOTE_ERROR, DOWNVOTE_SUCCESS, DOWNVOTE_ERROR,
         SHOWREVIEWTEXTAREA, REVIEW_SUCCESS, REVIEW_ERROR, BORROW_SUCCESS,
         BORROW_ERROR,
         SHOWALLREVIEWS,
         
         
        } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.books, action) => {
  switch(action.type) {
    case FETCH_BOOK_SUCCESS:
      return {...state, books: action.books }

    case FETCH_BOOK_ERROR:
      return action.error
    
    case FETCH_SINGLE_BOOK_SUCCESS:
      return {...state, book: action.book, }

    case FETCH_SINGLE_BOOK_ERROR:
      return { ...state, error: action.error }
    
      case FAVORITE_BOOK_SUCCESS:
      return {...state, addfavbook: action.favoritedBook }

    case FAVORITE_BOOK_ERROR:
      return {...state, error: action.error}
  
    case UPVOTE_SUCCESS: 
    
    const updatedBook = {...state.book, ...action.upvotedBook}
      return {
        ...state,
        book:updatedBook,
        upvotedBook: action.upvotedBook
      }
    
    case UPVOTE_ERROR:
      return { ...state, error: action.error}

    case DOWNVOTE_SUCCESS:
    const newupdatedBook = {...state.book, ...action.downvotedBook}
      return {
        ...state,
        book: newupdatedBook,
        downvotedBook: action.downvotedBook
      }
    
    case DOWNVOTE_ERROR:
      return { ...state, error: action.error}
    
    case SHOWREVIEWTEXTAREA: 
      return { ...state, loadAllReview: false, loadTextArea: true }
    
    case SHOWALLREVIEWS:
      return { ...state, loadAllReview: true, loadTextArea: false,}

    case REVIEW_SUCCESS:
      return { ...state, loadTextArea: false, book: action.reviewedBook }
    
    case REVIEW_ERROR: 
      return { ...state, error: action.error}

    case BORROW_SUCCESS:
      return { ...state, borrowedBook: action.borrowedBook }
    
    case BORROW_ERROR:
      return { ...state, error: action.error }
    
    default :
    return state
  }
}