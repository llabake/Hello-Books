import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/bookAction';
import { 
  books, 
  popularBooks, 
  topFavoriteBooks, 
  bookData, 
  addedBook, 
  addedBookAfterFavoriteAction, 
  bookAfterUpvoteAction, 
  bookBeforeUpvoteAction, 
  bookAfterDownvoteAction, 
  bookAfterReviewAction, 
  bookAfterBorrowAction, 
  bookAfterEditReviewAction, 
  reviewData,
  bookCount,
  searchResult
} from './../mocks/bookData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetch books actions', () => {
  beforeEach(function () {
    moxios.install();
  });
  afterEach(function ()  {
    moxios.uninstall();
  });
  it('creates FETCH_BOOK_SUCCESS after successfully fetching books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Most Popular books retrieved successfully',
          books,
          count: bookCount
        }
      });
    });
    const expectedActions = [
      { type: types.FETCH_BOOK },
      { type: types.FETCH_BOOK_SUCCESS, books },
      { type: types.SET_BOOK_COUNT, bookCount }
    ];
    const store = mockStore({ books: [], bookCount: 0 })
    return store.dispatch(actions.fetchAllBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates FETCH_POPULAR_BOOK_SUCCESS after successfully fetching popular books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Books retrieved successfully',
          books: popularBooks
        }
      });
    });
    const expectedActions = [
      { type: types.POPULAR_BOOK },
      { type: types.FETCH_POPULAR_BOOK_SUCCESS, popularBooks }
    ];
    const store = mockStore({ popularBooks: [] })
    return store.dispatch(actions.fetchPopularBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates FETCH_TOP_FAVORITED_BOOKS_SUCCESS after successfully fetching top books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Top favorite books retrieved successfully',
          books: topFavoriteBooks
        }
      });
    });
    const expectedActions = [
      { type: types.TOP_FAVORITED_BOOKS },
      { type: types.FETCH_TOP_FAVORITED_BOOKS_SUCCESS, topFavoriteBooks }
    ];
    const store = mockStore({ topFavoriteBooks: [] })
    return store.dispatch(actions.fetchTopFavoriteBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates ADD_BOOK_SUCCESS after successfully adding a new book', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: `Book with title: ${addedBook.title} has been added`,
          book: addedBook
        }
      });
    });
    const expectedActions = [
      { type: types.ADD_BOOK },
      { type: types.ADD_BOOK_SUCCESS, book: addedBook }
    ];
    const store = mockStore({ book: {} })
    return store.dispatch(actions.saveBook(bookData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates FETCH_SINGLE_BOOK_SUCCESS after successfully fetching a book', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          book: addedBook
        }
      });
    });
    const expectedActions = [
      { type: types.FETCH_SINGLE_BOOK },
      { type: types.FETCH_SINGLE_BOOK_SUCCESS, book: addedBook }
    ];
    const store = mockStore({ book: {} })
    return store.dispatch(actions.fetchSingleBook(addedBook.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates FAVORITE_BOOK_SUCCESS after successfully favoriting a book', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: `${addedBookAfterFavoriteAction.title} has been added to your favorite list`,
          book: addedBookAfterFavoriteAction
        }
      });
    });
    const expectedActions = [
      { type: types.FAVORITE_BOOK },
      { type: types.FAVORITE_BOOK_SUCCESS, 
        favoritedBook: addedBookAfterFavoriteAction
      }
    ];
    const store = mockStore({ favoritedBook: {} })
    return store.dispatch(actions.favoriteABook(addedBook.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates UPVOTE_SUCCESS after successfully upvoting a book', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: `You have successfully upvoted ${bookAfterUpvoteAction.title}`,
          book: bookAfterUpvoteAction
        }
      });
    });
    const expectedActions = [
      { type: types.UPVOTE },
      { type: types.UPVOTE_SUCCESS, 
        upvotedBook: bookAfterUpvoteAction
      }
    ];
    const store = mockStore({ upvotedBook: {} })
    return store.dispatch(actions.upVoteBook(bookBeforeUpvoteAction.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates DOWNVOTE_SUCCESS after successfully downvoting a book', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: `You have successfully downvoted ${bookAfterUpvoteAction.title}`,
          book: bookAfterDownvoteAction
        }
      });
    });
    const expectedActions = [
      { type: types.DOWNVOTE },
      { type: types.DOWNVOTE_SUCCESS, 
        downvotedBook: bookAfterDownvoteAction
      }
    ];
    const store = mockStore({ upvotedBook: {} })
    return store.dispatch(actions.downVoteBook(bookAfterUpvoteAction.id))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates REVIEW_SUCCESS after successfully reviewing a book', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "Review has been posted",
          book: bookAfterReviewAction
        }
      });
    });
    const expectedActions = [
      { type: types.REVIEW },
      { type: types.REVIEW_SUCCESS, 
        reviewedBook: bookAfterReviewAction
      }
    ];
    const store = mockStore({ review: {} })
    return store.dispatch(actions.reviewBook(bookBeforeUpvoteAction.id))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates SHOW_ALL_REVIEWS after clicking write review', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          loadingReviewArea: true
        }
      });
    });
    const expectedActions = [
      { type: types.SHOW_REVIEW_TEXT_AREA },
    ];
    const store = mockStore({ loadingReviewArea: false })
    store.dispatch(actions.showReviewTextArea())
      expect(store.getActions()).toEqual(expectedActions);
    });
  xit('creates BORROW_SUCCESS after successfully borrowing a book', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: `borrow request has been made on ${bookBeforeUpvoteAction.title} and it is being processed`,
          book: bookAfterBorrowAction
        }
      });
    });
    const expectedActions = [
      { type: types.BORROW },
      { type: types.BORROW_SUCCESS, 
        borrowedBook: bookAfterBorrowAction
      }
    ];
    const store = mockStore({ borrowedBook: [] })
    return store.dispatch(actions.borrowBook(bookBeforeUpvoteAction.id))
    .then(() => {
      // console.log(store.getActions(), 'mashjjf')
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('creates SEARCH_ALL_BOOKS_SUCCESS after successfully searching a book', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Books retrieved successfully',
          books: searchResult
        }
      });
    });
    const expectedActions = [
      { type: types.SEARCH_ALL_BOOKS },
      { type: types.SEARCH_ALL_BOOKS_SUCCESS, 
        books: searchResult
      }
    ];
    const store = mockStore({ books: [] })
    return store.dispatch(actions.fetchSearchedBooks("Lola"))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates DELETE_BOOK_REVIEW_SUCCESS after successfully deleting a book review', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          reviewId: bookAfterReviewAction.reviews[0].id
        }
      });
    });
    const expectedActions = [
      { type: types.DELETE_BOOK_REVIEW },
      { type: types.DELETE_BOOK_REVIEW_SUCCESS, 
        reviewId: bookAfterReviewAction.reviews[0].id
      }
    ];
    const store = mockStore({ books: [] })
    return store.dispatch(actions.deleteBookReview(bookAfterReviewAction.id, bookAfterReviewAction.reviews[0].id))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates MODIFY_REVIEW_SUCCESS after successfully modifying a book review', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          review: bookAfterEditReviewAction.reviews[0]
        }
      });
    });
    const expectedActions = [
      { type: types.MODIFY_REVIEW },
      { type: types.MODIFY_REVIEW_SUCCESS, 
        editedReview: bookAfterEditReviewAction.reviews[0]
      }
    ];
    const store = mockStore({ books: [] })
    return store.dispatch(actions.modifyReviewAction(bookAfterReviewAction.reviews[0].id, reviewData))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
