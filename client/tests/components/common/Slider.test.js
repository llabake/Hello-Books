import React from 'react';

import Slider from '../../../components/common/Slider';
import userData from '../../mocks/userData'

test('Slider component renders correctly', () => {
  const wrapper = shallow(<Slider />);
  expect(wrapper).toBeDefined();
})

test('Carousel should call componentDidUpdate', () => {
  let spy;
  afterEach(() => {
    spy.mockClear();
  });

  const props = {
    authenticated: false,
    user: {},
  };
  const nextProps = {
    authenticated: true,
    user: userData.user
  };
  spy = jest.spyOn(Slider.prototype, 'componentDidUpdate')
  const wrapper = shallow(<Slider {...props} />)
  wrapper.setProps(nextProps);
  expect(Slider.prototype.componentDidUpdate).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalled();
  expect(wrapper).toMatchSnapshot();
})