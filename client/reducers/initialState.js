import jwt from 'jsonwebtoken';

const token = localStorage.getItem('token');
const user = token ? jwt.decode(token) : {}

export default {
  user: {
    authenticated: Boolean(token),
    authUser: user,
    borrowedBookHistory: [],
    favoriteBooks: [],
    loading: false,
    profile: {},
  },
  books: {
    books: [],
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
    loading: false
  },
  admin: {
    book: {},
    allBooks: [],
    pendingBorrowedBookRequest: [],
    pendingReturnedBookRequest: [],
    loading: false    
  }

}