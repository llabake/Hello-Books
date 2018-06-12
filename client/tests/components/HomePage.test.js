import React from 'react';

import { HomePage, mapDispatchToProps, mapStateToProps } from '../../components/HomePage';
import reducer from '../../reducers'
import Loader from '../../components/common/Loader';
import Slider from '../../components/common/Slider';
import BookCard from '../../components/common/BookCard';

test('The HomePage component mounts correctly if all props it needs are passed into it.', () => {
  const props = {
    authenticated: false,
    user: {},
    errors: {},
    fetchPopularBooks: jest.fn(),
    popularBooks: [],
    loadingPopularBooks: false
  }

  const wrapper = shallow(<HomePage {...props} />)
  expect(wrapper).toBeDefined();
})

test('Homepage should call componentWillMount', () => {
  let spy;
  afterEach(() => {
    spy.mockClear();
  });

  const props = {
    authenticated: false,
    user: {},
    errors: {},
    fetchPopularBooks: jest.fn(),
    popularBooks: [],
    loadingPopularBooks: false
  }
  spy = jest.spyOn(HomePage.prototype, 'componentWillMount')
  const wrapper = shallow(<HomePage {...props} />)
  expect(HomePage.prototype.componentWillMount).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalled();
  expect(wrapper).toMatchSnapshot();
})

test('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchPopularBooks');

  const { fetchPopularBooks } = mapDispatchToProps(dispatch);
  fetchPopularBooks();
  expect(dispatch).toHaveBeenCalled();
});

test('mapStateToProps', () => {
  expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('popularBooks');
  expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('loadingPopularBooks');
});

test('The home page component renders the top popular book card', () => {
  const props = {
    popularBooks: [{
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
    fetchPopularBooks: jest.fn(),
    authenticated: false,
    user: {},
    errors: {},
    loadingPopularBooks: false
  }
  const wrapper = shallow(<HomePage {...props} />);
  
  expect(wrapper.find(BookCard).length).toBe(1);
})

test('The home page component renders the loader while fetching top popular books ', () => {
  const props = {
    popularBooks: [],
    fetchPopularBooks: jest.fn(),
    authenticated: false,
    user: {},
    errors: {},
    loadingPopularBooks: true
  }
  const wrapper = shallow(<HomePage {...props} />);
  expect(wrapper.find(Loader).length).toBe(1);
})