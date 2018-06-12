import React from 'react';

import {
  ReviewArea,
  mapDispatchToProps,
  mapStateToProps
}
  from '../../../components/main/ReviewArea';

import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';


function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    handleAddReview: jest.fn(),
    handleChange: jest.fn(),
    errors: {},
    reviewBook: jest.fn().mockImplementation(() => Promise.resolve())
  };

  const state = {
    errors: {},
    isValid: false,
    saving: false,
    content: '',
    caption: ''
  };
  const wrapper = shallow(<ReviewArea {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
  };
}

describe('Review area component', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot();

  })


  test('should call handleAddReview when the form is submitted', () => {
    const { wrapper, props, state } = setup()
    const event = {
      preventDefault: jest.fn(),
      target: {}
    }

    wrapper.instance().handleAddReview(event)
    expect(props.reviewBook).toHaveBeenCalled()
  });


  test(
    'should show validation errors when required form fields are empty',
    () => {
      const { wrapper, props, state } = setup();
      const event = {
        preventDefault: jest.fn(),
        target: {
          name: 'content',
          value: ''
        }
      };
      wrapper.setState({
        content: '',
        caption: 'v'
      });
      wrapper.instance().handleChange(event)
      expect(wrapper.instance().state.saving)
      .toEqual(false);
      expect(wrapper.instance().state.errors.content)
        .toEqual(   ["content is required"]);
    }
  );

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('reviewBook');

    const { reviewBook } = mapDispatchToProps(dispatch);
    reviewBook();
    expect(dispatch).toHaveBeenCalled();
  });


  test('mapStateToProps', () => {
    expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('errors');
  });
})