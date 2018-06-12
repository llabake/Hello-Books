import React from 'react';

import {
  AllBooks,
  mapStateToProps,
  mapDispatchToProps
} from '../../../components/main/AllBooks';

import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';
import {Pagination} from 'react-materialize'
import NothingFound from '../../../components/common/NothingFound'

function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    fetchAllBooks: jest.fn(),
    handleLogout: jest.fn(),
    handleShowAllBooks: jest.fn(),
    handleShowReturnRequestList: jest.fn(),
    handleShowBorrowRequestList: jest.fn(),
    errors: {},
    books: [userData.book1, userData.book2],
    bookCount: 2
  };

  const state = {
    redirect: false,
    maxItems: 2,
    showPagination: false,
  };
  const wrapper = shallow(<AllBooks {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
  };
}

describe('All books page', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should call component did mount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    spy = jest.spyOn(AllBooks.prototype, 'componentDidMount')
    const { wrapper, props } = setup();
    expect(wrapper).toBeDefined();
    expect(AllBooks.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  })

  test('should render the book list', () => {
    const { wrapper, props, state } = setup();
    expect(wrapper.find(Pagination).length).toBe(0);
  })

  test('should render nothing found component', () => {
    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      books: [],
      bookCount: 0,
      fetchAllBooks: jest.fn(() => Promise.resolve(1)),
    }
    const wrapper = shallow(<AllBooks {...props} />);

    expect(wrapper.find(NothingFound).length).toBe(1)

  })

  test('should call handle selected page', () => {
    const { wrapper, props, state } = setup();
    const page = 2
    // wrapper.setState({
    //   activePage: page,
    // });
    wrapper.instance().handleSelectedPage(page)
    // expect(wrapper.instance().state.activePage).toBe(2);
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
      books: [],
      bookCount: 0,
      fetchAllBooks: jest.fn(() => Promise.resolve(1)),
    }

    const nextProps = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      books: [],
      bookCount: 0,
      fetchAllBooks: jest.fn(() => Promise.resolve(1)),
    }
    spy = jest.spyOn(AllBooks.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<AllBooks {...props} />)
    wrapper.setProps(nextProps);
    expect(AllBooks.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalled();
  })


  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchAllBooks');

    const { fetchAllBooks } = mapDispatchToProps(dispatch);
    fetchAllBooks();
    expect(dispatch).toHaveBeenCalled();
  });

}) 

