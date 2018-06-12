import React from 'react';

import {
  Favorite,
  mapStateToProps,
  mapDispatchToProps
} from '../../../components/userFavorite/Favorite.jsx';

import adminData from '../../mocks/adminData';
import userData from '../../mocks/userData';
import TableRowNotFound from '../../../components/common/TableRowNotFound';
import { Pagination } from 'react-materialize';
import Loader from '../../../components/common/Loader';
import NothingFound from '../../../components/common/NothingFound';


function setup() {
  const props = {
    dispatch: jest.fn(),
    user: userData.admin,
    errors: {},
    handleSelectedPage: jest.fn(),
    loading: false,
    favoriteCount: 0,
    favoriteBooks: [ userData.userFavoriteResponse.favoriteBooks ],
    fetchUserFavoriteBooks: jest.fn(),
  };

  const state = {
    maxItems: 2,
    showPagination: false,
    activePage: 1,

  };
  const wrapper = shallow(<Favorite {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
  };
}

describe('The Favorite books', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should call componentDidMount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    spy = jest.spyOn(Favorite.prototype, 'componentDidMount')
    const { wrapper, props, state } = setup();
    expect(Favorite.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  })

  test('should render the favorite books list', () => {
    const { wrapper, props, state } = setup();
    expect(wrapper.find(Pagination).length).toBe(0);
  })

  test('should render nothing found component', () => {
    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      handleSelectedPage: jest.fn(),
      loading: false,
      favoriteCount: 0,
      favoriteBooks: [],
      fetchUserFavoriteBooks: jest.fn(),
    }
    const wrapper = shallow(<Favorite {...props} />);

    expect(wrapper.find(NothingFound).length).toBe(1)

  })

  test('should call handle selected page', () => {
    const { wrapper, props, state } = setup();
    const page = 2
    wrapper.setState({
      activePage: page,
    });
    wrapper.instance().handleSelectedPage(page)
    expect(wrapper.instance().state.activePage).toBe(2);
  });

  test('should call componentWillReceiveProps', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });

    const props = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      handleSelectedPage: jest.fn(),
      loading: false,
      favoriteCount: 0,
      favoriteBooks: [],
      fetchUserFavoriteBooks: jest.fn(),
    }

    const nextProps = {
      dispatch: jest.fn(),
      user: userData.admin,
      errors: {},
      handleSelectedPage: jest.fn(),
      loading: false,
      favoriteCount: 1,
      favoriteBooks: userData.userFavoriteResponse,
      fetchUserFavoriteBooks: jest.fn(() => Promise.resolve(1)),
    }
    spy = jest.spyOn(Favorite.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<Favorite {...props} />)
    
    wrapper.setProps(nextProps);
    expect(Favorite.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalled();

    wrapper.setState({ maxItems: 3, showPagination: true })
    expect(wrapper.instance().state.maxItems).toBe(3);
    expect(wrapper.instance().state.showPagination).toBe(true);

    const page = 2
    wrapper.setState({
      activePage: page,
    });
    wrapper.instance().handleSelectedPage(1)
    // expect(wrapper.instance().handleSelectedPage()).toHaveBeenCalled()
  })

  it('should render a preloader', () => {
    const { wrapper } = setup();
    wrapper.setProps({ favoriteBooks: [], loading: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Loader).length).toBe(1)
    
  });

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchUserFavoriteBooks');

    const { fetchUserFavoriteBooks } = mapDispatchToProps(dispatch);
    fetchUserFavoriteBooks();
    expect(dispatch).toHaveBeenCalled();
  });

  test('mapStateToProps', () => {
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('favoriteBooks');
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('loading');
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('favoriteCount');
  });

})