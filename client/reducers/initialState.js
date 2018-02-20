
export default {
  user: {
    authenticated: false,
    authUser: {},
    borrowedBookHistory: [],
    favoriteBooks: [],
    loading: false,
    profile: {},
  },
  books: {
    books: [],
    book: {},
    addfavbook: [],
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