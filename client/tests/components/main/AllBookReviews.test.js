import React from 'react';

import {
  AllBookReviews,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/main/AllBookReviews';

import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';

function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    deleteBookReview: jest.fn().mockImplementation(() => Promise.resolve()),
    handleDelete: jest.fn(),
    handleLoadReviewToEdit: jest.fn(),
    loadReviewToEditAction: jest.fn(),
    errors: {},
    reviews: [{
      id: 6,
      content: "updatedAtupdatedAt",
      userId: 6,
      caption: "updatedAtupdatedAt",
      createdAt: "2018-03-19T16:32:57.605Z",
      updatedAt: "2018-03-19T16:32:57.605Z",
      user: {
        id: 2,
        image: "IMAGE",
        username: "mama"
      }
    }]
  };

  const wrapper = shallow(<AllBookReviews {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('<AllBookReview /> component', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup();


    expect(wrapper).toMatchSnapshot();
  })

  test('should handle review deletion', () => {
    const { wrapper, props } = setup();

    props.deleteBookReview.mockReset();
    wrapper.instance().handleDelete(1, 1)
    expect(props.deleteBookReview).toHaveBeenCalled()
  });


  test('should load review to be edited', () => {
    const { wrapper, props } = setup();

    props.loadReviewToEditAction.mockReset();
    wrapper.instance().handleLoadReviewToEdit(1)
    expect(props.loadReviewToEditAction).toHaveBeenCalled()
  });

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('loadReviewToEditAction');
    expect(mapDispatchToProps(dispatch)).toHaveProperty('deleteBookReview');

    const { deleteBookReview, loadReviewToEditAction } = mapDispatchToProps(dispatch);
    deleteBookReview();
    loadReviewToEditAction();
    expect(dispatch).toHaveBeenCalled();
  });

})