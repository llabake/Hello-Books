import React from 'react';

import TextInput from '../../../components/common/TextInput';

test('Text input field component renders correctly', () => {
  const props = {
    id: '',
    type: '',
    icon: '',
    placeholder: '',
    name: '',
    errors: [],
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn()
  }
  const wrapper = mount(<TextInput {...props} />);
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
      'Username is required'
    ],
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn()
  }
  const wrapper = mount(<TextInput {...props} />);
  expect(wrapper).toBeDefined();
  expect(wrapper.find('div.red-text').exists()).toBeTruthy();
  expect(wrapper).toMatchSnapshot();
})