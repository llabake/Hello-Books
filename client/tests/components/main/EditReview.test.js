import React from 'react';

import {
  EditReview,
  mapDispatchToProps,
}
  from '../../../components/main/EditReview';

import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';


function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    handleModifyReview: jest.fn(),
    handleChange: jest.fn(),
    review: {
      "id":6,
      "content":"content",
      "bookId":3,
      "userId":6,
      "caption":"caption",
      "createdAt":"2018-03-19T16:32:57.605Z",
      "updatedAt":"2018-03-19T16:32:57.605Z"
    },
    errors: {},
    modifyReviewAction: jest.fn().mockImplementation(() => Promise.resolve()),
    handleCancelClick: jest.fn().mockImplementation(() => Promise.resolve())
  };

  const state = {
    content: '',
    caption: '',
    errors: {},
    isValid: false,
    saving: false,
  };

  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'content',
      value: 'well content'
    }
  };
  const wrapper = shallow(<EditReview {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
    event
  };
}



describe('Modify Profile page', () => {
  test('should render with the right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should change state for content', () => {
    const { wrapper, props, event, state } = setup();
    wrapper.find('#content').simulate('change', event);
    wrapper.instance().handleChange(event)
    expect(wrapper.instance().state.content).toBe('well content');
  });

  test('should call handle change', () => {
    const { wrapper, props, state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {
        content: 'another content'
      }
    }
    wrapper.setState({
      content: 'another content',
    });
    props.modifyReviewAction.mockReset();
    wrapper.instance().handleChange(event)
    expect(wrapper.instance().state.content).toBe('another content');
  });


  test('should call componentWillMount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });

    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      handleModifyReview: jest.fn(),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      review: {
        "id":6,
        "content":"content",
        "bookId":3,
        "userId":6,
        "caption":"caption",
        "createdAt":"2018-03-19T16:32:57.605Z",
        "updatedAt":"2018-03-19T16:32:57.605Z"
      },
      errors: {},
      modifyReviewAction: jest.fn().mockImplementation(() => Promise.resolve()),
      handleCancelClick: jest.fn().mockImplementation(() => Promise.resolve())
    };
    spy = jest.spyOn(EditReview.prototype, 'componentWillMount');
    const wrapper = shallow(<EditReview {...props} />)
    wrapper.setState({
      content: 'content',
      caption: 'caption'
    });
    expect(EditReview.prototype.componentWillMount).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalled();
  })

  test('should handle form submission when the form inputs are valid', () => {

    const { wrapper, event, props } = setup();
    wrapper.setState({
      content: 'content',
    });
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    props.modifyReviewAction.mockReset();
    wrapper.instance().handleModifyReview(event);
    expect(wrapper.instance().state.content).toBe('content');
  });

  test('should handle cancel click', () => {
    const { wrapper, props } = setup();
    wrapper.setState({
      content: 'content',
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        content: 'another content'
      }
    }
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    props.handleCancelClick.mockReset();
    wrapper.instance().handleCancelClick(event);
  });


  test('should dispatch needed actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toHaveProperty('modifyReviewAction')
    expect(mapDispatchToProps(dispatch)).toHaveProperty('handleCancelClick')
    const { modifyReviewAction, handleCancelClick } = mapDispatchToProps(dispatch);
    modifyReviewAction();
    handleCancelClick();
    expect(dispatch).toHaveBeenCalled();
  })

})
