import expect from 'expect';
import reducer from '../../reducers/userReducer';
import * as types from '../../actions/actionTypes';
import initialState from '../../reducers/initialState';
import { response, authUser, error, user, borrowedBookHistory,
  favoriteBooks, favoriteBooksAfterUnFavoriting, book3,
  profile, borrowedBook, borrowedBookHistoryAfterReturn, editedProfile } from '../reducers/mocks/userData';

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.user)
  });
  it('should handle USER_SIGNUP_REQUEST', () => {
    const userSignUpAction = {
      type: types.USER_SIGNUP_REQUEST
    };
    expect(reducer({}, userSignUpAction)).toEqual({})
  });
  it('should handle USER_SIGNUP_SUCCESS', () => {
    const userSignUpActionSuccess = {
      type: types.USER_SIGNUP_SUCCESS,
      user
    };
    expect(reducer({}, userSignUpActionSuccess)).toEqual({
      authUser: user, 
      authenticated: true
    })
  });
  it('should handle USER_SIGNUP_ERROR', () => {
    const userSignUpActionError = {
      type: types.USER_SIGNUP_ERROR,
      error
    };
    expect(reducer({}, userSignUpActionError)).toEqual({ error })
  });
  it('should handle USER_SIGNIN_REQUEST', () => {
    const userSignInAction = {
      type: types.USER_SIGNIN_REQUEST
    };
    expect(reducer({}, userSignInAction)).toEqual({})
  });
  it('should handle USER_SIGNIN_SUCCESS', () => {
    const userSignInActionSuccess = {
      type: types.USER_SIGNIN_SUCCESS,
      user
    };
    expect(reducer({}, userSignInActionSuccess)).toEqual({
      authUser: user, 
      authenticated: true
    })
  });
  it('should handle USER_SIGNIN_ERROR', () => {
    const userSignInActionError = {
      type: types.USER_SIGNIN_ERROR,
      error
    };
    expect(reducer({}, userSignInActionError)).toEqual({ error })
  });
  it('should handle SET_CURRENT_USER', () => {
    const setCurrentUserAction = {
      type: types.SET_CURRENT_USER,
      user
    };
    expect(reducer({}, setCurrentUserAction)).toEqual({
      authUser: user, 
      authenticated: true
    })
  });
  it('should handle USER_BORROW_LIST_SUCCESS', () => {
    const userBorrowListSuccess = {
      type: types.USER_BORROW_LIST_SUCCESS,
      borrowedBookList: borrowedBookHistory
    };
    expect(reducer({}, userBorrowListSuccess)).toEqual({
      borrowedBookHistory
    })
  });
  it('should handle USER_BORROW_LIST_ERROR', () => {
    const userBorrowListError = {
      type: types.USER_BORROW_LIST_ERROR,
      error
    };
    expect(reducer({}, userBorrowListError)).toEqual({ error })
  });
  it('should handle USER_FAVORITE_LIST', () => {
    const userFavoriteListAction = {
      type: types.USER_FAVORITE_LIST
    };
    expect(reducer({}, userFavoriteListAction)).toEqual({ loading:true })
  });
  it('should handle USER_FAVORITE_LIST_SUCCESS', () => {
    const userFavoriteListActionSuccess = {
      type: types.USER_FAVORITE_LIST_SUCCESS,
      favoriteBooks
    };
    expect(reducer({}, userFavoriteListActionSuccess)).toEqual({
      favoriteBooks, 
      loading: false
    })
  });
  it('should handle USER_FAVORITE_LIST_ERROR', () => {
    const userFavoriteListActionError = {
      type: types.USER_FAVORITE_LIST_ERROR,
      error
    };
    expect(reducer({}, userFavoriteListActionError)).toEqual({
      error,
      loading: false
    })
  });
  it('should handle REMOVE_FROM_FAVORITES_SUCCESS', () => {
    const userUnFavoriteBookActionSuccess = {
      type: types.REMOVE_FROM_FAVORITES_SUCCESS,
      bookId: book3.id
    };
    expect(reducer({ favoriteBooks }, userUnFavoriteBookActionSuccess)).toEqual({
      favoriteBooks: favoriteBooksAfterUnFavoriting, 
    })
  });
  it('should handle REMOVE_FROM_FAVORITES_ERROR', () => {
    const userUnFavoriteBookActionError = {
      type: types.REMOVE_FROM_FAVORITES_ERROR,
      error
    };
    expect(reducer({}, userUnFavoriteBookActionError)).toEqual({
      error,
    })
  });
  it('should handle UNSET_CURRENT_USER', () => {
    const unsetCurrentUserAction = {
      type: types.UNSET_CURRENT_USER,
      user
    };
    expect(reducer({}, unsetCurrentUserAction)).toEqual({
      authUser: user, 
      authenticated: false
    })
  });
  it('should handle FETCH_USER_PROFILE_SUCCESS', () => {
    const fetchUserProfileActionSuccess = {
      type: types.FETCH_USER_PROFILE_SUCCESS,
      profile
    };
    expect(reducer({}, fetchUserProfileActionSuccess)).toEqual({
      profile, 
    })
  });
  it('should handle FETCH_USER_PROFILE_ERROR', () => {
    const fetchUserProfileActionError = {
      type: types.FETCH_USER_PROFILE_ERROR,
      error
    };
    expect(reducer({}, fetchUserProfileActionError)).toEqual({
      error
    })
  });
  it('should handle EDIT_USER_PROFILE_SUCCESS', () => {
    const editUserProfileActionSuccess = {
      type: types.EDIT_USER_PROFILE_SUCCESS,
      user: editedProfile
    };
    expect(reducer({}, editUserProfileActionSuccess)).toEqual({
      profile: editedProfile,
      updated: true
    })
  });
  it('should handle EDIT_USER_PROFILE_ERROR', () => {
    const editUserProfileActionError = {
      type: types.EDIT_USER_PROFILE_ERROR,
      error
    };
    expect(reducer({}, editUserProfileActionError)).toEqual({
      error,
      updated: false
    })
  });
  it('should handle RETURN', () => {
    const userReturnAction = {
      type: types.RETURN
    };
    expect(reducer({}, userReturnAction)).toEqual({})
  });
  it('should handle RETURN_SUCCESS', () => {
    const userReturnActionSuccess = {
      type: types.RETURN_SUCCESS,
      borrowedBook
    };
    expect(reducer({ borrowedBookHistory }, userReturnActionSuccess)).toEqual({
      borrowedBookHistory: borrowedBookHistoryAfterReturn, 
    })
  });
  it('should handle RETURN_ERROR', () => {
    const userReturnActionError = {
      type: types.RETURN_ERROR,
      error
    };
    expect(reducer({}, userReturnActionError)).toEqual({
      error
    })
  });
})