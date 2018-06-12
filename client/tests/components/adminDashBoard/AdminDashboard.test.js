import React from 'react';

import {
  AdminDashBoard,
  mapStateToProps
} from '../../../components/adminDashBoard/AdminDashBoard';

import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';


function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    signInUser: jest.fn(),
    handleLogout: jest.fn(),
    handleShowBookList: jest.fn(),
    handleShowReturnRequestList: jest.fn(),
    handleShowBorrowRequestList: jest.fn(),
    errors: {}
  };

  const state = {
    redirect: false,
    showBookList: true,
    showBorrowRequestList: false,
    showReturnRequestList: false
  };
  const wrapper = shallow(<AdminDashBoard {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
  };
}

describe('Admindashboard page', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should call component will mount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    spy = jest.spyOn(AdminDashBoard.prototype, 'componentWillMount')
    const { wrapper, props } = setup();
    expect(wrapper).toBeDefined();
    expect(AdminDashBoard.prototype.componentWillMount).toHaveBeenCalledTimes(1)
  })

  test('should call component will mount and redirect a normal user', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    spy = jest.spyOn(AdminDashBoard.prototype, 'componentWillMount')
    const { state } = setup()
    const props = {
      dispatch: jest.fn(),
      user: adminData.user,
      signInUser: jest.fn(),
      handleLogout: jest.fn(),
      handleShowBookList: jest.fn(),
      handleShowReturnRequestList: jest.fn(),
      handleShowBorrowRequestList: jest.fn(),
      errors: {}
    };

    const wrapper = shallow(<AdminDashBoard {...props} {...state} />);

    wrapper.setState({
      redirect: true,
    });
    expect(wrapper).toBeDefined();
    expect(AdminDashBoard.prototype.componentWillMount).toHaveBeenCalledTimes(3);
    expect(wrapper.instance().state.redirect).toBe(true);
  })

  test('should display books list tab', () => {
    const { wrapper, props, state } = setup();
    wrapper.setState({
      showBookList: true,
      showBorrowRequestList: false,
      showReturnRequestList: false
    });
    props.handleShowBookList.mockReset();
    wrapper.instance().handleShowBookList()
    expect(wrapper.instance().state.showBookList).toBe(true);
    expect(wrapper.instance().state.showBorrowRequestList).toBe(false);
    expect(wrapper.instance().state.showReturnRequestList).toBe(false);
  })

  test('should display borrow book request list tab', () => {
    const { wrapper, props, state } = setup();
    wrapper.setState({
      showBookList: false,
      showBorrowRequestList: true,
      showReturnRequestList: false
    });
    props.handleShowBorrowRequestList.mockReset();
    wrapper.instance().handleShowBorrowRequestList()
    expect(wrapper.instance().state.showBookList).toBe(false);
    expect(wrapper.instance().state.showBorrowRequestList).toBe(true);
    expect(wrapper.instance().state.showReturnRequestList).toBe(false);
  })

  test('should display return book request list tab', () => {
    const { wrapper, props, state } = setup();
    wrapper.setState({
      showBookList: false,
      showBorrowRequestList: false,
      showReturnRequestList: true
    });
    props.handleShowReturnRequestList.mockReset();
    wrapper.instance().handleShowReturnRequestList()
    expect(wrapper.instance().state.showBookList).toBe(false);
    expect(wrapper.instance().state.showBorrowRequestList).toBe(false);
    expect(wrapper.instance().state.showReturnRequestList).toBe(true
    );
  })

  test('should return an object with props required by component from store', () => {
    const store = {
      errors: {},
      user: {}
    };
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('errors');
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('user');
  });
}) 