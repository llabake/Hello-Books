import React from 'react';

import { Carousel, mapStateToProps, mapDispatchToProps} from '../../../components/common/Carousel';

test('<Carousel />', () => {
  let spy;
  afterEach(() => {
    spy.mockClear();
  });
  spy = jest.spyOn(Carousel.prototype, 'componentWillMount')
  const props = {
    topFavoriteBooks: [],
    loadingTopFavoritedBooks: false,
    fetchTopFavoriteBooks: jest.fn(() => Promise.resolve(1))
  }
  const wrapper = shallow(<Carousel {...props}/>);
  expect(wrapper).toBeDefined();
  expect(Carousel.prototype.componentWillMount).toHaveBeenCalledTimes(1)
})

test('Carousel should call componentDidMount', () => {
  let spy;
  afterEach(() => {
    spy.mockClear();
  });
  spy = jest.spyOn(Carousel.prototype, 'componentDidMount')
  const props = {
    topFavoriteBooks: [],
    loadingTopFavoritedBooks: false,
    fetchTopFavoriteBooks: jest.fn(() => Promise.resolve(1))
  }
  const wrapper = shallow(<Carousel {...props}/>);
  expect(Carousel.prototype.componentDidMount).toHaveBeenCalledTimes(1)
})

test('Carousel should call componentDidUpdate', () => {
  let spy;
  afterEach(() => {
    spy.mockClear();
  });
  spy = jest.spyOn(Carousel.prototype, 'componentDidUpdate')
  const props = {
    topFavoriteBooks: [],
    loadingTopFavoritedBooks: false,
    fetchTopFavoriteBooks: jest.fn(() => Promise.resolve(1))
  }
  const wrapper = shallow(<Carousel {...props}/>);
  wrapper.setProps({ topFavoriteBooks: [{book: 'books'}] });
  expect(Carousel.prototype.componentDidUpdate).toHaveBeenCalledTimes(1)
})

test('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchTopFavoriteBooks');

  const { fetchTopFavoriteBooks } = mapDispatchToProps(dispatch);
  fetchTopFavoriteBooks();
  expect(dispatch).toHaveBeenCalled();
});

test('mapStateToProps', () => {
  expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('topFavoriteBooks');
  expect(mapStateToProps({ bookReducer: {} })).toHaveProperty('loadingTopFavoritedBooks');
});
// it('should call methodName during componentDidMount', () => {
//   const methodNameFake = jest.spyOn(MyComponent.prototype, 'methodName');
//   const wrapper = mount(<MyComponent {...props} />);
//   expect(methodNameFake).toHaveBeenCalledTimes(1);
// });
