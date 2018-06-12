import React from 'react';

import {
  BookBorrowListRow,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/adminDashBoard/BookBorrowListRow';
import adminData from '../../mocks/userData';

function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    handleAccept: jest.fn(),
    acceptBookBorrowRequest: jest.fn(),
    errors: {},
    borrowedBook: {
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
      user: {
        username: adminData.admin.username,
        id: 3
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
  };

  const wrapper = shallow(<BookBorrowListRow {...props} />);

  return {
    wrapper,
    props,
  };
}
describe('Book Borrow list row', () => {
  test('should render correctely', () => {
    const { wrapper, props } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('acceptBookBorrowRequest');

    const { acceptBookBorrowRequest } = mapDispatchToProps(dispatch);
    acceptBookBorrowRequest();
    expect(dispatch).toHaveBeenCalled();
  });

  test('should borrow request accept action', () => {
    const { wrapper, props, state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {}
    }
    props.acceptBookBorrowRequest.mockReset();
    wrapper.instance().handleAccept(event)
    expect(props.acceptBookBorrowRequest).toHaveBeenCalled()
  });
  test('mapStateToProps', () => {
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('errors');
  });
})