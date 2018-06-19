
import React from 'react';

import { SearchBar, mapStateToProps} from '../../../components/common/SearchBar.jsx';


const setup = () => {
  const props = {
    searchedBooks: [],
    handleSearch: jest.fn(),
    handleChange: jest.fn(),
  };
  const event = {
    preventDefault: jest.fn(),
    target: {
      value: 'blink',
      name: 'searchTerm'
    }
  };
  const wrapper = shallow(<SearchBar {...props} />);
  return {
    wrapper,
    props, 
    event
  };
}

test('<SearchBar />', () => {
const { wrapper, props } = setup();
  expect(wrapper).toBeDefined();
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('input').length).toBe(1);
})

test('<SearchBar /> should simulate change event', () => {
  const { wrapper, props, event } = setup();
  wrapper.find('input').simulate('change', event);
  expect(wrapper.instance().state.searchTerm).toEqual('blink');
});

test('<SearchBar /> should simulate search form submission', () => {
  const event = {
    preventDefault: jest.fn(),
    target: {
      value: ''
    }
  };
  const { wrapper, props } = setup();
  const handleSearchSpy = jest.spyOn(SearchBar.prototype, 'handleSearch')
  const instance = wrapper.instance();
  const newWrapper = shallow(<SearchBar {...props}/>)
  const redirectToSearch = jest.fn()
   
  newWrapper.find('form').simulate('submit', event);
  expect(SearchBar.prototype.handleSearch).toHaveBeenCalled();
});

test('mapStateToProps', () => {
  expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('searchedBooks');
});