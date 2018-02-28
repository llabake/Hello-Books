import expect from 'expect';
import reducer from '../../reducers/bookReducer';
import * as types from '../../actions/actionTypes';
import initialState from '../../reducers/initialState'
import {books, error, book2, book3, addfavbook,
  upvotedBook, downvotedBook, book3AfterReviewDeletion,
  reviewToEdit, book3AfterReviewUpdate, popularBooks,
  topFavoriteBooks, editedReview } from '../reducers/mocks/booksData';

describe('Book reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.books)
  });
  it('should handle FETCH_BOOK', () => {
    const fetchAllBooksAction = {
      type: types.FETCH_BOOK
    };
    expect(reducer({}, fetchAllBooksAction)).toEqual({loading: true})
  });
  it('should handle FETCH_BOOK_SUCCESS', () => {
    const fetchAllBooksSuccess = {
      type: types.FETCH_BOOK_SUCCESS,
      books
    };
    expect(reducer({}, fetchAllBooksSuccess)).toEqual({books, loading: false})
  });
  it('should handle FETCH_BOOK_ERROR', () => {
    const fetchAllBooksError = {
      type: types.FETCH_BOOK_ERROR,
      error
    };
    expect(reducer({}, fetchAllBooksError)).toEqual({error, loading: false})
  });
  it('should handle FETCH SINGLE BOOK', () => {
    const fetchSingleBook = {
      type: types.FETCH_SINGLE_BOOK
    }
    expect(reducer({}, fetchSingleBook)).toEqual({loading: true})
  });
  it('should handle FETCH_SINGLE_BOOK_SUCCESS', () => {
    const fetchSingleBookSuccess = {
      type: types.FETCH_SINGLE_BOOK_SUCCESS,
      book: book3
    };
    expect(reducer({}, fetchSingleBookSuccess)).toEqual({book: book3, loading: false})
  });
  it('should handle FETCH_SINGLE_BOOK_ERROR', () => {
    const fetchSingleBookError = {
      type: types.FETCH_SINGLE_BOOK_ERROR,
      error
    };
    expect(reducer({}, fetchSingleBookError)).toEqual({error, loading: false})
  });
  it('should handle FAVORITE_BOOK_SUCCESS', () => {
    const favoriteBookSuccess = {
      type: types.FAVORITE_BOOK_SUCCESS,
      favoritedBook: book2
    };
    expect(reducer({}, favoriteBookSuccess)).toEqual({addfavbook:book2})
  });
  it('should handle FAVORITE_BOOK_ERROR', () => {
    const favoriteBookError = {
      type: types.FAVORITE_BOOK_ERROR,
      error
    };
    expect(reducer({}, favoriteBookError)).toEqual({ error })
  });
  it('should handle UPVOTE_SUCCESS', () => {
    const upvoteBookSuccess = {
      type: types.UPVOTE_SUCCESS,
      upvotedBook: book2
    };
    expect(reducer({}, upvoteBookSuccess)).toEqual({book:book2, upvotedBook: book2})
  });
  it('should handle UPVOTE_ERROR', () => {
    const upvoteBookError = {
      type: types.UPVOTE_ERROR,
      error
    };
    expect(reducer({}, upvoteBookError)).toEqual({ error })
  });
  it('should handle DOWNVOTE_SUCCESS', () => {
    const downvoteBookSuccess = {
      type: types.DOWNVOTE_SUCCESS,
      downvotedBook: book2
    };
    expect(reducer({}, downvoteBookSuccess)).toEqual({book:book2, downvotedBook: book2})
  });
  it('should handle DOWNVOTE_ERROR', () => {
    const downvoteBookError = {
      type: types.DOWNVOTE_ERROR,
      error
    };
    expect(reducer({}, downvoteBookError)).toEqual({ error })
  });
  it('should handle SHOW_REVIEW_TEXT_AREA', () => {
    const showTextArea = {
      type: types.SHOW_REVIEW_TEXT_AREA
    }
    expect(reducer({}, showTextArea)).toEqual({ loadAllReview: false, loadTextArea: true })
  });
  it('should handle SHOW_ALL_REVIEWS', () => {
    const showTextArea = {
      type: types.SHOW_ALL_REVIEWS
    }
    expect(reducer({}, showTextArea)).toEqual({ loadAllReview: true, loadTextArea: false })
  });
  it('should handle REVIEW_SUCCESS', () => {
    const reviewBookSuccess = {
      type: types.REVIEW_SUCCESS,
      reviewedBook: book2
    };
    expect(reducer({}, reviewBookSuccess)).toEqual({ loadTextArea: false, book:book2 })
  });
  it('should handle REVIEW_ERROR', () => {
    const reviewBookError = {
      type: types.REVIEW_ERROR,
      error
    };
    expect(reducer({}, reviewBookError)).toEqual({ error })
  });
  it('should handle BORROW_SUCCESS', () => {
    const borrowBookSuccess = {
      type: types.BORROW_SUCCESS,
      borrowedBook: book2
    };
    expect(reducer({}, borrowBookSuccess)).toEqual({ borrowedBook:book2 })
  });
  it('should handle BORROW_ERROR', () => {
    const borrowBookError = {
      type: types.BORROW_ERROR,
      error
    };
    expect(reducer({}, borrowBookError)).toEqual({ error })
  });
  it('should handle SEARCH_ALL_BOOKS_SUCCESS', () => {
    const searchAllBooksSuccess = {
      type: types.SEARCH_ALL_BOOKS_SUCCESS,
      books
    };
    expect(reducer({}, searchAllBooksSuccess)).toEqual({ searchResult:books })
  });
  it('should handle SEARCH_ALL_BOOKS_ERROR', () => {
    const searchAllBooksError = {
      type: types.SEARCH_ALL_BOOKS_ERROR,
      error
    };
    expect(reducer({}, searchAllBooksError)).toEqual({ error })
  });
  it('should handle DELETE_BOOK_REVIEW_SUCCESS', () => {
    const deleteBookReviewSuccess = {
      type: types.DELETE_BOOK_REVIEW_SUCCESS,
      reviewId: book3.reviews[1].id
    };
    expect(reducer({ book: book3 }, deleteBookReviewSuccess)).toEqual({ book:book3AfterReviewDeletion, loadAllReview: true })
  });
  it('should handle DELETE_BOOK_REVIEW_ERROR', () => {
    const deleteBookReviewError = {
      type: types.DELETE_BOOK_REVIEW_ERROR,
      error
    };
    expect(reducer({}, deleteBookReviewError)).toEqual({ error })
  });
  it('should handle LOAD_REVIEW_FOR_EDIT', () => {
    const loadReviewToEdit = {
      type: types.LOAD_REVIEW_FOR_EDIT,
      reviewToEdit: book3.reviews[0]
    }
    expect(reducer({}, loadReviewToEdit)).toEqual({ editReview: true, reviewToEdit: book3.reviews[0]})
  });
  it('should handle MODIFY_REVIEW_SUCCESS', () => {
    const modifyBookReviewSuccess = {
      type: types.MODIFY_REVIEW_SUCCESS,
      editedReview
    };
    expect(reducer({ book: book3 }, modifyBookReviewSuccess)).toEqual({ book:book3AfterReviewUpdate, editReview: false, loadAllReview: true })
  });
  it('should handle MODIFY_REVIEW_ERROR', () => {
    const modifyBookReviewError = {
      type: types.MODIFY_REVIEW_ERROR,
      error
    };
    expect(reducer({}, modifyBookReviewError)).toEqual({ error })
  });
  it('should handle POPULAR_BOOK', () => {
    const fetchPopularBooksAction = {
      type: types.POPULAR_BOOK
    };
    expect(reducer({}, fetchPopularBooksAction)).toEqual({loadingPopularBooks: true})
  });
  it('should handle FETCH_POPULAR_BOOK_SUCCESS', () => {
    const fetchPopularBooksSuccess = {
      type: types.FETCH_POPULAR_BOOK_SUCCESS,
      popularBooks
    };
    expect(reducer({}, fetchPopularBooksSuccess))
    .toEqual({popularBooks, loadingPopularBooks: false})
  });
  it('should handle FETCH_POPULAR_BOOK_ERROR', () => {
    const fetchPopularBooksError = {
      type: types.FETCH_POPULAR_BOOK_ERROR,
      error
    };
    expect(reducer({}, fetchPopularBooksError))
    .toEqual({error, loadingPopularBooks: false})
  });
  it('should handle TOP_FAVORITED_BOOKS', () => {
    const fetchTopFavoriteBooksAction = {
      type: types.TOP_FAVORITED_BOOKS
    };
    expect(reducer({}, fetchTopFavoriteBooksAction))
    .toEqual({loadingTopFavoritedBooks: true})
  });
  it('should handle FETCH_TOP_FAVORITED_BOOKS_SUCCESS', () => {
    const fetchTopFavoriteBooksSuccess = {
      type: types.FETCH_TOP_FAVORITED_BOOKS_SUCCESS,
      topFavoriteBooks
    };
    expect(reducer({}, fetchTopFavoriteBooksSuccess))
    .toEqual({topFavoriteBooks, loadingTopFavoritedBooks: false})
  });
  it('should handle FETCH_TOP_FAVORITED_BOOKS_ERROR', () => {
    const fetchTopFavoriteBooksError = {
      type: types.FETCH_TOP_FAVORITED_BOOKS_ERROR,
      error
    };
    expect(reducer({}, fetchTopFavoriteBooksError))
    .toEqual({error, loadingTopFavoritedBooks: false})
  });
  it('should handle HANDLE_CANCEL_CLICK', () => {
    const handleCancelClick = {
      type: types.HANDLE_CANCEL_CLICK
    }
    expect(reducer({}, handleCancelClick))
    .toEqual({ loadAllReview: true, editReview: false })
  });
  
})