// import jwt from 'jsonwebtoken';
import { authenticateUser } from '../helpers/utils';

const { isAuthenticated, user } = authenticateUser();
export default {
  user: {
    authenticated: isAuthenticated,
    authUser: user,
    borrowedBookHistory: [],
    favoriteBooks: [],
    loading: false,
    profile: {},
    error: '',
    updated: false
  },
  books: {
    books: [],
    bookCount: 0,
    book: {},
    favoritedBook: {},
    upvotedBook: {},
    downvotedBook: {},
    review: {},
    loadReviewArea: false,
    loadAllReview: false,
    borrowedBook: [],
    searchResult: [],
    editReview: false,
    reviewToEdit: {},
    popularBooks: [],
    loadingPopularBooks: false,
    loadingTopFavoritedBooks: false,
    topFavoriteBooks: [],
    loading: false,
    resourceNotFound: false
  },
  admin: {
    book: {},
    allBooks: [],
    pendingBorrowedBookRequest: [],
    pendingReturnedBookRequest: [],
    loading: false    
  }
}

