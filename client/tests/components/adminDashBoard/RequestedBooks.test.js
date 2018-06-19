import React from 'react';

import {
  RequestedBooks,
  mapStateToProps,
  mapDispatchToProps
} from '../../../components/adminDashBoard/RequestedBooks';

import adminData from '../../mocks/adminData';
import userData from '../../mocks/userData';
import TableRowNotFound from '../../../components/common/TableRowNotFound';
import { Pagination } from 'react-materialize';
import Loader from '../../../components/common/Loader';


function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    errors: {},
    handleSelectedPage: jest.fn(),
    loading: false,
    suggestedBookCount: 0,
    suggestedBooks: [ adminData.suggestion1, adminData.suggestion2 ],
    fetchSuggestedBooks: jest.fn(),
  };

  const state = {
    maxItems: 2,
    showPagination: false,
    activePage: 1,

  };
  const wrapper = shallow(<RequestedBooks {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
  };
}

describe('The Requested books', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should call componentDidMount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    spy = jest.spyOn(RequestedBooks.prototype, 'componentDidMount')
    const { wrapper, props, state } = setup();
    expect(RequestedBooks.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  })

  test('should render the requested books list', () => {
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
      suggestedBookCount: 0,
      suggestedBooks: [],
      fetchSuggestedBooks: jest.fn(),
    }
    const wrapper = shallow(<RequestedBooks {...props} />);

    expect(wrapper.find(TableRowNotFound).length).toBe(1)

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
      loading: true,
      suggestedBookCount: 0,
      suggestedBooks: [],
      fetchSuggestedBooks: jest.fn(),
    }

    const nextProps = {
      dispatch: jest.fn(),
      user: userData.admin,
      errors: {},
      handleSelectedPage: jest.fn(),
      loading: false,
      suggestedBookCount: 1,
      suggestedBooks: [ adminData.suggestion1 ],
      fetchSuggestedBooks: jest.fn(),
    }
    spy = jest.spyOn(RequestedBooks.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<RequestedBooks {...props} />)
    expect(wrapper.find(Loader).length).toBe(1)
    
    wrapper.setProps(nextProps);
    expect(RequestedBooks.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalled();
  })

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchSuggestedBooks');

    const { fetchSuggestedBooks } = mapDispatchToProps(dispatch);
    fetchSuggestedBooks();
    expect(dispatch).toHaveBeenCalled();
  });

  test('mapStateToProps', () => {
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('suggestedBooks');
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('loading');
    expect(mapStateToProps({ adminReducer: {} })).toHaveProperty('suggestedBookCount');
  });

})