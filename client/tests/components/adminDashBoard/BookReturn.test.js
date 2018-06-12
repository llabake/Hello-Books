import React from 'react';

import {
  BookReturn,
  mapStateToProps,
  mapDispatchToProps
} from '../../../components/adminDashBoard/BookReturn';

import BookReturnListRow from '../../../components/adminDashBoard/BookReturnListRow'
import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';
import NothingFound from '../../../components/common/NothingFound';
import { Pagination } from 'react-materialize';


function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    errors: {},
    handleSelectedPage: jest.fn(),
    loading: false,
    returnedBookCount: 0,
    borrowedBooks: [
      {
        "message": "Borrowed books retrieved successfully",
        "borrowedBooks": [
          {
            "id": 15,
            "borrowDate": "2018-03-25T16:41:57.255Z",
            "expectedReturnDate": "2018-04-08T16:41:57.255Z",
            "actualReturnDate": null,
            "borrowStatus": "accepted",
            "returnStatus": "pending",
            "bookId": 2,
            "userId": 2,
            "user": {
              "username": "mama",
              "id": 2
            },
            "book": {
              "id": 2,
              "title": "dont be sad ",
              "author": "Aaidh ibn Abdullah al-Qarni",
              "quantity": 1,
              "borrowCount": 6
            }
          }
        ]
      }
    ],
    pendingAcceptReturnRequest: jest.fn(),
  };

  const state = {
    maxItems: 2,
    showPagination: false,
    activePage: 1,

  };
  const wrapper = shallow(<BookReturn {...props} {...state} />);

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
    spy = jest.spyOn(BookReturn.prototype, 'componentDidMount')
    const { wrapper, props, state } = setup();
    expect(BookReturn.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  })

  test('should render the book borrowed list', () => {
    const { wrapper, props, state } = setup();
    expect(wrapper.find(BookReturnListRow).length).toBe(1);
    expect(wrapper.find(Pagination).length).toBe(0);
  })

  test('should render nothing found component', () => {
    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      handleSelectedPage: jest.fn(),
      loading: false,
      returnedBookCount: 0,
      borrowedBooks: [],
      pendingAcceptReturnRequest: jest.fn(),
    }
    const wrapper = shallow(<BookReturn {...props} />);

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
      handleSelectedPage: jest.fn(),
      loading: false,
      returnedBookCount: 0,
      borrowedBooks: [],
      pendingAcceptReturnRequest: jest.fn(),
    }

    const nextProps = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      handleSelectedPage: jest.fn(),
      loading: false,
      returnedBookCount: 1,
      borrowedBooks: [
        {
          "message": "Borrowed books retrieved successfully",
          "borrowedBooks": [
            {
              "id": 15,
              "borrowDate": "2018-03-25T16:41:57.255Z",
              "expectedReturnDate": "2018-04-08T16:41:57.255Z",
              "actualReturnDate": null,
              "borrowStatus": "accepted",
              "returnStatus": "pending",
              "bookId": 2,
              "userId": 2,
              "user": {
                "username": "mama",
                "id": 2
              },
              "book": {
                "id": 2,
                "title": "dont be sad ",
                "author": "Aaidh ibn Abdullah al-Qarni",
                "quantity": 1,
                "borrowCount": 6
              }
            }
          ]
        }
      ],
      pendingAcceptReturnRequest: jest.fn(),
    }
    spy = jest.spyOn(BookReturn.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<BookReturn {...props} />)
    wrapper.setProps(nextProps);
    expect(BookReturn.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalled();
  })

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('pendingAcceptReturnRequest');

    const { pendingAcceptReturnRequest } = mapDispatchToProps(dispatch);
    pendingAcceptReturnRequest();
    expect(dispatch).toHaveBeenCalled();
  });

  test('mapStateToProps', () => {
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('borrowedBooks');
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('loading');
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('returnedBookCount');
  });

})