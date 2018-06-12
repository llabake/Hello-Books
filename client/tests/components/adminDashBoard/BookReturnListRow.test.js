import React from 'react';

import {
  BookReturnListRow,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/adminDashBoard/BookReturnListRow';
import adminData from '../../mocks/userData';

function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    handleReturn: jest.fn(),
    acceptBookReturnRequest: jest.fn(),
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
        "borrowDate": '2018-03-14T17:02:38.102Z',
        "expectedReturnDate": '2018-03-14T17:02:38.102Z',
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

  const wrapper = shallow(<BookReturnListRow {...props} />);

  return {
    wrapper,
    props,
  };
}
describe('Book Return list row', () => {
  test('should render correctely', () => {
    const { wrapper, props } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('acceptBookReturnRequest');

    const { acceptBookReturnRequest } = mapDispatchToProps(dispatch);
    acceptBookReturnRequest();
    expect(dispatch).toHaveBeenCalled();
  });

  test('should handle return request accept action', () => {
    const { wrapper, props, state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {}
    }
    props.acceptBookReturnRequest.mockReset();
    wrapper.instance().handleReturn(event)
    expect(props.acceptBookReturnRequest).toHaveBeenCalled()
  });
  test('mapStateToProps', () => {
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('errors');
  });
})