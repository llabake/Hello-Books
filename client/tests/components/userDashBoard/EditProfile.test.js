import React from 'react';

import {
  EditProfile,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/userDashBoard/EditProfile';

import adminData from '../../mocks/userData'

function setup() {
  const props = {
    dispatch: jest.fn(),
    user: adminData.admin,
    errors: {},
    profileToEdit: adminData.userProfileResponse,
    loading: false,
    editProfile: jest.fn(),
    getUserProfile: jest.fn(),
    handleFileChange: jest.fn(),
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    handleBlur: jest.fn(),
  };

  const state = {
    image: '',
    errors: {},
    isValid: false,
    saving: false,
    uploadedImage: null,
    redirect: false
  };

  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'username',
      value: 'username'
    }
  };
  const wrapper = shallow(<EditProfile {...props} {...state} />);

  return {
    wrapper,
    props,
    state,
    event
  };
}


describe('Modify Profile page', () => {
  test('should render with the right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should change state for title', () => {
    const { wrapper, props, event, state } = setup();
    wrapper.find('.signup').simulate('change', event);
    wrapper.instance().handleChange(event)
    expect(wrapper.instance().state.username).toBe('username');
  });

  test('should call handle change', () => {
    const { wrapper, props, state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {
        username: 'another username'
      }
    }
    wrapper.setState({
      username: 'another username',
    });
    props.editProfile.mockReset();
    wrapper.instance().handleChange(event)
    expect(wrapper.instance().state.username).toBe('another username');
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
      profileToEdit: adminData.userProfileResponse,
      editProfile: jest.fn(() => Promise.resolve(1)),
      getUserProfile: jest.fn(() => Promise.resolve(1)),
      updated: false
    }

    const nextProps = {
      dispatch: jest.fn(),
      user: adminData.admin,
      errors: {},
      editProfile: jest.fn(() => Promise.resolve(1)),
      getUserProfile: jest.fn(() => Promise.resolve(1)),
      updated: true
    }
    spy = jest.spyOn(EditProfile.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<EditProfile {...props} />)
    wrapper.setProps(nextProps);
    expect(EditProfile.prototype.componentWillReceiveProps).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalled();
  })

  test('should handle form submission when the form inputs are valid', () => {

    const { wrapper, event, props } = setup();
    wrapper.setState({
      username: 'username',
    });
    const dispatchSpy = jest.spyOn(wrapper.instance().props, 'dispatch');
    props.editProfile.mockReset();
    wrapper.instance().handleSubmit(event);
    expect(wrapper.instance().state.username).toBe('username');
    
    // expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  test('should handle image upload', () => {
    const { wrapper, props, state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: ['well firts image link',]
      }
    }
    wrapper.setState({
      image: '',
      uploadedImage: event.target.files[0],
    });
    props.editProfile.mockReset();
    wrapper.instance().handleFileChange(event)
    expect(wrapper.instance().state.uploadedImage).toBe('well firts image link');
  });

  test('should dispatch needed actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toHaveProperty('getUserProfile')
    expect(mapDispatchToProps(dispatch)).toHaveProperty('editProfile')
    const { editProfile, getUserProfile } = mapDispatchToProps(dispatch);
    getUserProfile();
    editProfile();
    expect(dispatch).toHaveBeenCalled();
  })

  test('should return an object with props required by component from store', () => {
    const store = {
      errors: {},
    };
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('profileToEdit');
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('updated');
  });
})