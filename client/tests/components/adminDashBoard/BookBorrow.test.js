import React from 'react';

import {
  BookBorrow,
  mapStateToProps,
  mapDispatchToProps
} from '../../../components/adminDashBoard/BookBorrow';

import BookBorrowListRow from '../../../components/adminDashBoard/BookBorrowListRow'
import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';
import NothingFound from '../../../components/common/NothingFound';
import { Pagination } from 'react-materialize';


function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    handleShowBookList: jest.fn(),
    handleShowReturnRequestList: jest.fn(),
    handleShowBorrowRequestList: jest.fn(),
    errors: {},
    handleSelectedPage: jest.fn(),
    borrowedBooks: [
      {
        "message": "borrow request has been made on dont be sad  and it is being processed",
        "borrowedBook": {
          "borrowStatus": "pending",
          "returnStatus": "",
          "id": 15,
          "userId": 2,
          "bookId": 2,
          "updatedAt": "2018-03-25T16:05:46.426Z",
          "createdAt": "2018-03-25T16:05:46.426Z",
          "borrowDate": null,
          "expectedReturnDate": null,
          "actualReturnDate": null
        },
        "book": {
          "id": 2,
          "title": "dont be sad ",
          "author": "Aaidh ibn Abdullah al-Qarni",
          "publishedYear": "2000", "isbn": "298848",
          "quantity": 2,
          "description": "dont be sad life is good ",
          "image": "https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk",
          "upVotes": 2,
          "downVotes": 0,
          "borrowCount": 5,
          "aboutAuthor": "alrefi is a god writer ten ",
          "createdAt": "2018-03-12T14:51:55.457Z",
          "updatedAt": "2018-03-25T16:05:34.073Z",
          "book": [
            {
              "id": 15,
              "borrowDate": null,
              "expectedReturnDate": null,
              "actualReturnDate": null,
              "borrowStatus": "pending",
              "returnStatus": "",
              "createdAt": "2018-03-25T16:05:46.426Z",
              "updatedAt": "2018-03-25T16:05:46.426Z",
              "bookId": 2,
              "userId": 2
            }
          ]
        }
      }
    ],
    pendingAcceptBorrowRequest: jest.fn(),
  };

  const state = {
    maxItems: 2,
    showPagination: false,
    activePage: 1,

  };
  const wrapper = shallow(<BookBorrow {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
  };
}

describe('The Book borrow tab', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should call componentDidMount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    spy = jest.spyOn(BookBorrow.prototype, 'componentDidMount')
    const { wrapper, props, state } = setup();
    expect(BookBorrow.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  })

  test('should render the book borrowed list', () => {
    const { wrapper, props, state } = setup();
    expect(wrapper.find(BookBorrowListRow).length).toBe(1);
    expect(wrapper.find(Pagination).length).toBe(0);
  })

  test('should render nothing found component', () => {
    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      signInUser: jest.fn(),
      handleLogout: jest.fn(),
      handleShowBookList: jest.fn(),
      handleShowReturnRequestList: jest.fn(),
      handleShowBorrowRequestList: jest.fn(),
      errors: {},
      borrowedBooks: [],
      borrowedBookCount: 0,
      pendingAcceptBorrowRequest: jest.fn(() => Promise.resolve(1)),
    }
    const wrapper = shallow(<BookBorrow {...props} />);

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
      signInUser: jest.fn(),
      handleLogout: jest.fn(),
      handleShowBookList: jest.fn(),
      handleShowReturnRequestList: jest.fn(),
      handleShowBorrowRequestList: jest.fn(),
      errors: {},
      handleSelectedPage: jest.fn(),
      pendingAcceptBorrowRequest: jest.fn(),
      borrowedBookCount: 0,
      borrowedBooks: []
    }

    const nextProps = {
      dispatch: jest.fn(),
      user: adminData.admin,
      signInUser: jest.fn(),
      handleLogout: jest.fn(),
      handleShowBookList: jest.fn(),
      handleShowReturnRequestList: jest.fn(),
      handleShowBorrowRequestList: jest.fn(),
      errors: {},
      handleSelectedPage: jest.fn(),
      pendingAcceptBorrowRequest: jest.fn(),
      borrowedBookCount: 0,
      borrowedBooks: []
    }
    spy = jest.spyOn(BookBorrow.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<BookBorrow {...props} />)
    wrapper.setProps(nextProps);
    expect(BookBorrow.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalled();
  })

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('pendingAcceptBorrowRequest');

    const { pendingAcceptBorrowRequest } = mapDispatchToProps(dispatch);
    pendingAcceptBorrowRequest();
    expect(dispatch).toHaveBeenCalled();
  });

  test('mapStateToProps', () => {
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('borrowedBooks');
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('loading');
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('borrowedBookCount');
  });

})