import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import jwt from 'jsonwebtoken';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/adminAction';
import adminData from './../mocks/adminData'
import { uploadImageToCloudinary } from '../../actions/bookAction';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetch admin actions', () => {
  beforeEach(function () {
    moxios.install();
  });
  afterEach(function () {
    moxios.uninstall();
  });
  it('should dispatch FETCH_BOOK_SUCCESS after successfully fetching books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Books retrieved successfully',
          books: [adminData.book2, adminData.book1, adminData.book3],
          count: adminData.bookCount
        }
      });
    });
    const expectedActions = [
      { type: types.FETCH_BOOK },
      {
        type: types.FETCH_BOOK_SUCCESS,
        books: [adminData.book2, adminData.book1, adminData.book3]
      },
      { type: types.SET_BOOK_COUNT, bookCount: adminData.bookCount }
    ];
    const store = mockStore({ allBooks: [] })
    return store.dispatch(actions.fetchAllBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch PENDING_BORROW_REQUEST_SUCCESS after successfully fetching borrowed books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'successfully accepted borrow request',
          borrowedBooks: adminData.pendingAcceptBorrowedBookList.borrowedBook,
          count: 1
        }
      });
    });
    const expectedActions = [
      { type: types.PENDING_BORROW_REQUEST },
      {
        type: types.PENDING_BORROW_REQUEST_SUCCESS,
        pendingBorrowList: adminData.pendingAcceptBorrowedBookList.borrowedBook
      },
      { type: types.SET_BORROWED_BOOK_COUNT, bookCount: 1 }

    ];
    const store = mockStore({ pendingBorrowedBookRequest: [] })
    return store.dispatch(actions.pendingAcceptBorrowRequest()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch PENDING_RETURN_REQUEST_SUCCESS after successfully fetching returned books', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'successfully accepted return request',
          borrowedBooks: adminData.pendingAcceptReturnBookList.borrowedBook,
          count: 1
        }
      });
    });
    const expectedActions = [
      { type: types.PENDING_RETURN_REQUEST },
      {
        type: types.PENDING_RETURN_REQUEST_SUCCESS,
        pendingAcceptList: adminData.pendingAcceptReturnBookList.borrowedBook
      },
      { type: types.SET_RETURNED_BOOK_COUNT, bookCount: 1 }
    ];
    const store = mockStore({ pendingReturnedBookRequest: [] })
    return store.dispatch(actions.pendingAcceptReturnRequest()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('should dispatch DELETE_BOOK_SUCCESS after a successful book deletion', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Book deleted successfully',
        }
      });
    });
    const bookId = adminData.book2.id
    const expectedActions = [
      { type: types.DELETE_BOOK },
      { type: types.DELETE_BOOK_SUCCESS, bookId },
      { type: types.SET_BOOK_COUNT, bookCount: adminData.bookCount - 1 }
    ];
    const store = mockStore(
      {
        allBooks: [adminData.book2, adminData.book1, adminData.book3],
        bookCount: 3
      })
    return store.dispatch(actions.deleteBookAction(bookId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('should dispatch UPDATE_SUCCESS after a successfully updating a book', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          book: adminData.book3Updated,
          message: 'Your book has been updated',
        }
      });
    });
    const bookId = adminData.book1.id
    const bookData = adminData.bookUpdateData
    const expectedActions = [
      { type: types.UPDATE },
      { type: types.UPDATE_SUCCESS, book: adminData.book3Updated }
    ];
    const store = mockStore({ allBooks: [adminData.book1] })
    return store.dispatch(actions.updateBook(bookId, bookData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('ACCEPT_BOOK_BORROW_SUCCESS should be dispatched after accepting a borrow request', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      const borrowedBook = adminData.acceptBorrowRequest.borrowedBook
      request.respondWith({
        status: 200,
        response: {
          message: 'successfully accepted borrow request',
          borrowedBook
        }
      });
    });
    const expectedActions = [
      { type: types.ACCEPT_BOOK_BORROW },
      {
        type: types.ACCEPT_BOOK_BORROW_SUCCESS,
        borrowedBook: adminData.acceptBorrowRequest.borrowedBook
      }
    ];
    const store = mockStore({ pendingBorrowedBookRequest: [] })
    const bookId = adminData.book1.id
    const userId = adminData.user.id
    return store.dispatch(actions.acceptBookBorrowRequest(bookId, userId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  xit('ACCEPT_BOOK_RETURN_SUCCESS should be dispatched after accepting a return request', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      const borrowedBook = adminData.acceptReturnRequest.borrowedBook
      request.respondWith({
        status: 200,
        response: {
          message: 'successfully accepted return request',
          borrowedBook
        }
      });
    });
    const expectedActions = [
      { type: types.ACCEPT_BOOK_RETURN },
      {
        type: types.ACCEPT_BOOK_RETURN_SUCCESS,
        returnedBook: adminData.acceptReturnRequest.borrowedBook
      }
    ];
    const store = mockStore({ pendingReturnededBookRequest: [] })
    const bookId = adminData.book1.id
    const userId = adminData.user.id
    return store.dispatch(actions.acceptBookReturnRequest(bookId, userId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should dispatch FETCH_SUGGESTED_BOOKS_SUCCESS after a successful fetch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Books retrieved successfully',
          books: [
            adminData.suggestion2,
            adminData.suggestion1,
            adminData.suggestion3
          ],
          count: adminData.bookCount
        }
      });
    });
    const expectedActions = [
      { type: types.FETCH_SUGGESTED_BOOKS },
      {
        type: types.FETCH_SUGGESTED_BOOKS_SUCCESS,
        books: [
          adminData.suggestion2,
          adminData.suggestion1,
          adminData.suggestion3
        ]
      },
      {
        type: types.SET_SUGGESTED_BOOK_COUNT,
        bookCount: adminData.bookCount
      }
    ];
    const store = mockStore({ suggestedBooks: [] })
    return store.dispatch(actions.fetchSuggestedBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});


describe('ImageUpload', () => {
  it('should upload image files to cloudinary and return image url', (done) => {
    const files = ['book.png'];
    uploadImageToCloudinary(files[0])
      .then((res) => {
        expect(res.data.secure_url).toBeUndefined
      })
      .catch((error) => {
        expect(error.response.data.error.message).toEqual('Upload preset must be specified when using unsigned upload')
        done()
      })
  });
  it('upload', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        response: {
          data: {
            secure_url: 'secureurllsllsll'
          }
        }
      })
      const files = ['book.png'];
      return uploadImageToCloudinary(files[0]).then((result) => {
        expect(result.data.secure_url).toEqual('secureurllsllsll')

      })
    })
  })

});

