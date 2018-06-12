import React from 'react';
import { Redirect } from 'react-router-dom'
import { SignInForm, mapDispatchToProps, mapStateToProps } from '../../components/SignInForm';

function setup() {
  const props = {
    dispatch: jest.fn(),
    location: {
      state: {
        from: {}
      }
    },
    isAuthenticated: false,
    signInUser: jest.fn(),
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {}
  };

  const state = {
    username: 'username',
    password: 'password',
  };
  const wrapper = shallow(<SignInForm {...props} {...state} />);

  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'username',
      value: 'anothername'
    }
  };

  return {
    wrapper,
    props,
    state,
    event
  };
}

describe("Sign in page", () => {
  test('should render appropriately', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  })

  test('should redirect to previous page or home if user is already authenticated', () => {
    const { wrapper } = setup();
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper).toMatchSnapshot();
    // expect(wrapper.find("Redirect")).toHaveLength(1);
  });

  test('should return an object with props required by component from store', () => {
    const store = {
      authenticated: false,
      user: {}
    };
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('authenticated');
    expect(mapStateToProps({ userReducer: {} })).toHaveProperty('user');
  });

  test('should dispatch needed actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toHaveProperty('signInUser')
    const { signInUser } = mapDispatchToProps(dispatch);
    signInUser();
    expect(dispatch).toHaveBeenCalled();
  })

  test('should change state for username', () => {
    const { wrapper, props, event, state } = setup();
    wrapper.find('.signup').simulate('change', event);
    wrapper.instance().handleChange(event)
    expect(wrapper.instance().state.username).toBe('anothername');
  });
})

describe('submit action', () => {
  test('should handle form submission when the form inputs are valid', () => {
    const { wrapper, props, state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {}
    }
    wrapper.setState({
      username: 'username',
      password: 'password'
    });
    props.signInUser.mockReset();
    wrapper.instance().handleSubmit(event)
    expect(wrapper.instance().state.username).toBe('username');
    expect(wrapper.instance().state.password).toBe('password');
    expect(props.signInUser).toHaveBeenCalled()
  });

  test(
    'should show validation errors when required form fields are empty',
    () => {
      const { wrapper, props, state } = setup();
      const event = {
        preventDefault: jest.fn(),
        target: {
          name: 'username',
          value: ''
        }
      };
      wrapper.setState({
        username: '',
        password: ''
      });
      props.signInUser.mockReset();
      wrapper.instance().handleSubmit(event)
      expect(wrapper.instance().state.username).toBe('');
      expect(wrapper.instance().state.password).toBe('');
      expect(wrapper.instance().state.errors.username)
        .toEqual([ 'username is required' ]);
      expect(wrapper.instance().state.errors.password)
        .toEqual([ 'password is required' ]);
    }
  );
});