import React from 'react';
import { Redirect } from 'react-router-dom';

import requireAuthentication, { mapStateToProps } from '../../components/Authentication';
import userData from '../mocks/userData'

let ProtectedRouteComponent, WrapperComponent;
let wrapper;
test('Authentication component should render correctly', () => {
  localStorage.setItem('token', 'tokentoken')
  ProtectedRouteComponent = () => (
    <div>
      I am a protected component
    </div>
  )
  WrapperComponent = requireAuthentication(ProtectedRouteComponent);
  const props = {
    authenticated: false,
    user: {},
    errors: {},
    authenticateUser: jest.fn(() => Promise.resolve(1)),
    dispatch: jest.fn(),
    location: {
      state: {
        from: {}
      }
    },
  }
  wrapper = shallow(
    <WrapperComponent.WrappedComponent {...props} />
  )
  expect(wrapper.exists()).toBe(true);
})

test('Authentication component calls authenticate user when component recieves props', () => {
  localStorage.setItem('token', 'tokentoken')
  ProtectedRouteComponent = () => (
    <div>
      I am a protected component
      </div>
  )
  WrapperComponent = requireAuthentication(ProtectedRouteComponent);
  const props = {
    authenticated: true,
    user: userData.user,
    errors: {},
    authenticateUser: jest.fn(() => Promise.resolve(1)),
    dispatch: jest.fn(),
    location: {
      pathname: '/profile',
    }
  }
  const nextProps = {
    authenticated: true,
    user: userData.user,
    errors: {},
    authenticateUser: jest.fn(() => Promise.reject(1)),
    dispatch: jest.fn(),
    location: {
      pathname: '/profile',
    },
    isAuthenticated: true
  }
  wrapper = shallow(
    <WrapperComponent.WrappedComponent {...props} />
  )
  expect(wrapper.exists()).toBe(true);

  let spy;
  afterEach(() => {
    spy.mockClear();
  });

  spy = jest.spyOn(WrapperComponent.WrappedComponent.prototype, 'componentWillReceiveProps')
  wrapper.setProps(nextProps);
  expect(WrapperComponent.WrappedComponent.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalled();
  expect(wrapper.find("Redirect")).toHaveLength(1);
  expect(wrapper).toMatchSnapshot();
})

test('Authentication component calls map state to props', () => {
  localStorage.setItem('token', 'tokentoken')
  ProtectedRouteComponent = () => (
    <div>
      I am a protected component
      </div>
  )
  WrapperComponent = requireAuthentication(ProtectedRouteComponent);
  const props = {
    authenticated: false,
    user: {},
    errors: {},
    authenticateUser: jest.fn(() => Promise.resolve(1)),
    dispatch: jest.fn(),
    location: {
      pathname: '/signin',
    }
  }
  const store = {
    error: {},
    user: userData.admin,
    authenticated: true
  }
  wrapper = shallow(
    <WrapperComponent.WrappedComponent {...props} />
  )
  expect(mapStateToProps({ userReducer: {} })).toHaveProperty('user');
  expect(mapStateToProps({ userReducer: {} })).toHaveProperty('authenticated');
  expect(mapStateToProps({ userReducer: {} })).toHaveProperty('error');
});





