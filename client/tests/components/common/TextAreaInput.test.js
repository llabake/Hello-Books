import React from 'react';

import TextAreaInput from '../../../components/common/TextAreaInput';

test('Text area input field component renders correctly', () => {
  const props = {
    id: '',
    type: '',
    icon: '',
    placeholder: '',
    name: '',
    errors: [],
    value: '',
    onChange: jest.fn(),
  }
  const wrapper = mount(<TextAreaInput {...props} />);
  expect(wrapper).toBeDefined();
  expect(wrapper).toMatchSnapshot();
})

test('Text input field component show error when they occur', () => {
  const props = {
    id: '',
    type: '',
    icon: '',
    placeholder: '',
    name: '',
    errors: [
      'content is required'
    ],
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn()
  }
  const wrapper = mount(<TextAreaInput {...props} />);
  expect(wrapper).toBeDefined();
  expect(wrapper.find('div.red-text').exists()).toBeTruthy();
  expect(wrapper).toMatchSnapshot();
})