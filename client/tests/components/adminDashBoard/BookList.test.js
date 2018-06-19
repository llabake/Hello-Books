import React from 'react';

import {
  BookList,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/adminDashBoard/BookList';

import BookListRow from '../../../components/adminDashBoard/BookListRow'
import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';
import NothingFound from '../../../components/common/NothingFound';
import { Pagination } from 'react-materialize';

function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    handleShowBookList: jest.fn(),
    fetchAllBooks: jest.fn(),
    handleShowBorrowRequestList: jest.fn(),
    errors: {},
    handleSelectedPage: jest.fn(),
    loading: false,
    bookCount: 0,
    allBooks: [{
      aboutAuthor: 'Great Author',
      author: 'Imaseun Egbosa',
      borrowCount: 0, 
      createdAt: "2018-06-07T15:08:48.835Z",
      description: 'Youth juvenile deliquency',
      downVotes: 0,
      favorited: [],
      id: 5,
      image: '',
      isbn: '7698102987364',
      publishedYear: '2012',
      quantity: 7,
      reviews: [],
      title: 'Fine Boys',
      upVotes: 0,
      updatedAt: '2018-06-07T15:08:48.835Z',
      votes: []
    }],
  };

  const state = {
    maxItems: 2,
    showPagination: false,
    activePage: 1,

  };
  const wrapper = shallow(<BookList {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
  };
}

describe('The Book list tab', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should call componentDidMount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    spy = jest.spyOn(BookList.prototype, 'componentDidMount')
    const { wrapper, props, state } = setup();
    expect(BookList.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  })

  test('should render the book list', () => {
    const { wrapper, props, state } = setup();
    expect(wrapper.find(BookListRow).length).toBe(1);
    expect(wrapper.find(Pagination).length).toBe(0);
  })

  test('should render nothing found component', () => {
    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      allBooks: [],
      bookCount: 0,
      fetchAllBooks: jest.fn(() => Promise.resolve(1)),
    }
    const wrapper = shallow(<BookList {...props} />);

    expect(wrapper.find(NothingFound).length).toBe(1)

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
      allBooks: [],
      bookCount: 0,
      fetchAllBooks: jest.fn(() => Promise.resolve(1)),
    }

    const nextProps = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      allBooks: [],
      bookCount: 0,
      fetchAllBooks: jest.fn(() => Promise.resolve(1)),
    }
    spy = jest.spyOn(BookList.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<BookList {...props} />)
    wrapper.setProps(nextProps);
    expect(BookList.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalled();
  })

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchAllBooks');

    const { fetchAllBooks } = mapDispatchToProps(dispatch);
    fetchAllBooks();
    expect(dispatch).toHaveBeenCalled();
  });

  test('mapStateToProps', () => {
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('allBooks');
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('loading');
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('bookCount');
  });

})