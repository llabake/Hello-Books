import React from 'react';

import {
  BookListRow,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/adminDashBoard/BookListRow';
import adminData from '../../mocks/userData';

function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    handleEdit: jest.fn(),
    handleDelete: jest.fn(),
    deleteBookAction: jest.fn(),
    errors: {},
    book: {
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
    },
  };

  const wrapper = shallow(<BookListRow {...props} />);

  return {
    wrapper,
    props,
  };
}
describe('Book list row', () => {
  test('should render correctely', () => {
    const { wrapper, props } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('deleteBookAction');

    const { deleteBookAction } = mapDispatchToProps(dispatch);
    deleteBookAction();
    expect(dispatch).toHaveBeenCalled();
  });

  test('should handle book delete action', () => {
    const { wrapper, props, state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {}
    }
    wrapper.instance().handleEdit(event)
    // expect(props.handleEdit).toHaveBeenCalled()
  });

  test('should handle book edit action', () => {
    const { wrapper, props, state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {}
    }
    wrapper.instance().handleDelete(event)
    // expect(props.handleDelete).toHaveBeenCalled()
  });
  test('mapStateToProps', () => {
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('errors');
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('allBooks');
  });
})