import React from 'react';

import { SearchResult, mapStateToProps, mapDispatchToProps } from '../../../components/common/SearchResult';
import BookCard from '../../../components/common/BookCard';


const setup = () => {
  const props = {
    searchedBooks: [],
    fetchSearchedBooks: jest.fn(),
    match: {
      params: {
        searchTerm: 'blink'
      }
    }

  }
  const wrapper = shallow(<SearchResult {...props} />);
  return {
    wrapper,
    props,
  };
}
test('The Search Result component mounts correctly if all props it needs are passed into it.', () => {
  const { wrapper, props } = setup();
  expect(wrapper).toMatchSnapshot()
})

test('The Search Result component mounts correctly  and return the book results', () => {
  const props = {
    searchedBooks: [{
      aboutAuthor: "Canadian journalist and writer.",
      author: "Malcolm Gladwell",
      borrowCount: 1,
      description: "Malcolm Gladwell redefined how we understand the world around us.",
      downVotes: 0,
      favorited: [],
      id: 3,
      image: "book.jpg",
      isbn: "7301294701859",
      publishedYear: "2005",
      quantity: 7,
      reviews: [],
      title: "Blink",
      upVotes: 0,
      votes: [],
    }],
    fetchSearchedBooks: jest.fn(),
    match: {
      params: {
        searchTerm: 'blink'
      }
    }
  }
  const wrapper = shallow(<SearchResult {...props} />);
  
  expect(wrapper.find(BookCard).length).toBe(1);
})


test('<SearchResult />', () => {
  let spy;
  afterEach(() => {
    spy.mockClear();
  });
  spy = jest.spyOn(SearchResult.prototype, 'componentWillMount')
  const { wrapper, props } = setup();
  expect(wrapper).toBeDefined();
  expect(SearchResult.prototype.componentWillMount).toHaveBeenCalledTimes(1)
})


test('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchSearchedBooks');

  const { fetchSearchedBooks } = mapDispatchToProps(dispatch);
  fetchSearchedBooks();
  expect(dispatch).toHaveBeenCalled();
});

test('mapStateToProps', () => {
  expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('searchedBooks');
});