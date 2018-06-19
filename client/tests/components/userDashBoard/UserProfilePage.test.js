import React from 'react';

import {
  UserProfilePage,
  mapStateToProps,
  mapDispatchToProps
} from '../../../components/userDashBoard/UserProfilePage';

import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';


function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    getUserProfile: jest.fn(),
  };

  const wrapper = shallow(<UserProfilePage {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('UserProfilePage page', () => {
  test('should render and not crash', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should call component did mount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    spy = jest.spyOn(UserProfilePage.prototype, 'componentDidMount')
    const { wrapper, props } = setup();
    expect(wrapper).toBeDefined();
    expect(UserProfilePage.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  })

  test('should return an object with props required by component from store', () => {
    const store = {
      user: {}
    };
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('user');
  });

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('getUserProfile');

    const { getUserProfile } = mapDispatchToProps(dispatch);
    getUserProfile();
    expect(dispatch).toHaveBeenCalled();
  });

}) 