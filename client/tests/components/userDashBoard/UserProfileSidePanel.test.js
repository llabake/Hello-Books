import React from 'react';

import {
  UserProfileSidePanel,
  mapStateToProps,
} from '../../../components/userDashBoard/UserProfileSidePanel.jsx';

import adminData from '../../mocks/userData';
import userData from '../../mocks/userData';


function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    profile: userData.userProfileResponse.profile
  };

  const wrapper = shallow(<UserProfileSidePanel {...props} />);

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

  test('should return an object with props required by component from store', () => {
    const store = {
      profile: {}
    };
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('profile');
  });


}) 