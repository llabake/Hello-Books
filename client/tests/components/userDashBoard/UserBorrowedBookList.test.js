import React from 'react';

import {
  UserBorrowedBookList,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/userDashBoard/UserBorrowedBookList';

import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';
import NothingFound from '../../../components/common/NothingFound';
import { Pagination } from 'react-materialize';
import { UserBorrowedBookListRow } from '../../../components/userDashBoard/UserBorrowedBookListRow';

function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    handleShowBookList: jest.fn(),
    fetchUserBorrowedBooks: jest.fn(),
    errors: {},
    handleSelectedPage: jest.fn(),
    userBorrowedBookCount: 0,
    borrowedBooks: [],
  };

  const state = {
    maxItems: 2,
    showPagination: false,
    activePage: 1,

  };
  const wrapper = shallow(<UserBorrowedBookList {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
  };
}

describe('The User Borrowed Book List table', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should call componentDidMount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    spy = jest.spyOn(UserBorrowedBookList.prototype, 'componentDidMount')
    const { wrapper, props, state } = setup();
    expect(UserBorrowedBookList.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  })

  test('should render the user borrowed list', () => {
    const { wrapper, props, state } = setup();
    expect(wrapper.find(Pagination).length).toBe(0);
  })

  test('should render nothing found component', () => {
    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      borrowedBooks: [],
      userBorrowedBookCount: 0,
      fetchUserBorrowedBooks: jest.fn(() => Promise.resolve(1)),
    }
    const wrapper = shallow(<UserBorrowedBookList {...props} />);

    expect(wrapper.find(NothingFound).length).toBe(1)

  })

  test('should render UserBorrowedBookList component', () => {
    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      borrowedBooks: userData.borrowedBookList,
      userBorrowedBookCount: 2,
      fetchUserBorrowedBooks: jest.fn(() => Promise.resolve(1)),
    }
    const wrapper = shallow(<UserBorrowedBookList {...props} />);

    expect(wrapper.find(UserBorrowedBookListRow)).toBeDefined();

  })
  test('should call handle selected page', () => {
    const { wrapper, props, state } = setup();
    const page = 2
    wrapper.setState({
      activePage: page,
    });
    wrapper.instance().handleSelectedPage(page)
    expect(wrapper.instance().state.activePage).toBe(2);
  });

  test('should call componentWillReceiveProps', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });

    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      borrowedBooks: [],
      userBorrowedBookCount: 0,
      fetchUserBorrowedBooks: jest.fn(() => Promise.resolve(1)),
    }

    const nextProps = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      borrowedBooks: [],
      userBorrowedBookCount: 0,
      fetchUserBorrowedBooks: jest.fn(() => Promise.resolve(1)),
    }
    spy = jest.spyOn(UserBorrowedBookList.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<UserBorrowedBookList {...props} />)
    wrapper.setProps(nextProps);
    expect(UserBorrowedBookList.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalled();
  })

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchUserBorrowedBooks');

    const { fetchUserBorrowedBooks } = mapDispatchToProps(dispatch);
    fetchUserBorrowedBooks();
    expect(dispatch).toHaveBeenCalled();
  });

  test('mapStateToProps', () => {
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('borrowedBooks');
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('userBorrowedBookCount');
  });

})