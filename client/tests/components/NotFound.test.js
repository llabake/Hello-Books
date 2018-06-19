import React from 'react';

import  NotFound  from '../../components/NotFound';


describe('Test suite for 404 page', () => {
    const wrapper = shallow(<NotFound />);
  it('Should render without errors', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('#not-found').text()).toMatch('This is embarassing, something\'s missing.404: page not found');
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('ul').children().length).toBe(3);
    expect(wrapper.find('Link').length).toBe(3);

  });

  it('should mount correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});