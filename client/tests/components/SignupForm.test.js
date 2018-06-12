import React from 'react';
import { SignUpForm, mapDispatchToProps, mapStateToProps } from '../../components/SignUpForm';

const setup = () => {
  const props = {
    authenticated: false,
    dispatch: jest.fn(),
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    signUpUser: jest.fn(),
    history: {
      push: jest.fn()
    },
    checkUserExist: jest.fn().mockImplementation(() => Promise.resolve(1))
  };
  const wrapper = shallow(<SignUpForm {...props} />);

  return {
    wrapper,
    props
  };
}

describe('Signup Page component', () => {
  test('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render form for user input sction', () => {
    const { wrapper } = setup();
    expect(wrapper.find('form').exists()).toBe(true);
  });
  test('should have six input fields', () => {
    const { wrapper } = setup();
    expect(wrapper.find('TextInput').length).toEqual(6);
  });
  test('should have state of all sign up form fields to be an empty string', () => {
    const { wrapper } = setup();
    expect(wrapper.state().firstName).toBe('');
    expect(wrapper.state().lastName).toBe('');
    expect(wrapper.state().username).toBe('');
    expect(wrapper.state().email).toBe('');
    expect(wrapper.state().password).toBe('');
    expect(wrapper.state().confirmPassword).toBe('');
  });

  test('should return errors when trying to submit an empty form', () => {
    const { wrapper } = setup();

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.state().isValid).toBe(false);
    expect(wrapper.state().saving).toBe(false)
  });

  test('should redirect to previous page or home if user is already authenticated', () => {
    const { wrapper } = setup();
    wrapper.setProps({ authenticated: true });
    expect(wrapper).toMatchSnapshot();
  });


  test('calls handle change when first name changes', () => {
    const { wrapper, props } = setup();
    const event = { target: { value: 'first name', name: 'firstName' } };

    wrapper.find('#first_name').simulate('change', event);
    expect(wrapper.instance().state.firstName).toEqual('first name')
  });

  test('calls onSubmit', () => {
    const signUpUser = jest.fn();
    const handleSubmit = jest.fn();
    const { wrapper, props } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {}
    };
    const fields = {
      usernameField: wrapper.find("#username"),
      passwordField: wrapper.find("#password"),
      firstnameField: wrapper.find("#firstName"),
      lastnameField: wrapper.find('#lastName'),
      emailField: wrapper.find("#email"),
      signUpForm: wrapper.find('.signup'),
    }

    const { usernameField, passwordField, firstnameField, lastnameField, emailField, confirmPasswordField, signUpForm } = fields
    usernameField.simulate('change', { target: { name: 'username', value: 'username' } });
    passwordField.simulate('change', { target: { name: 'password', value: 'username' } });
    emailField.simulate('change', { target: { name: 'email', value: 'xyz@mail.com' } });

    expect(wrapper.instance().state.firstName).toBe('');
    expect(wrapper.instance().state.lastName).toBe('');
    expect(wrapper.instance().state.saving).toBe(false);
    expect(wrapper.instance().state.isValid).toBe(false);
    expect(wrapper.instance().state.confirmPassword).toBe('');
    expect(wrapper.instance().state.errors.firstName)
      .toEqual(['firstName is required']);
    expect(wrapper.instance().state.errors.lastName)
      .toEqual(['lastName is required']);
    expect(wrapper.instance().state.errors.confirmPassword)
      .toEqual(['Please confirm your password']);
  });

  test('should handle form submission when the form inputs are valid', () => {
    const { wrapper, props, state } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {}
    }
    wrapper.setState({
      username: 'username',
      password: 'P@ssword1',
      firstName: 'firstName',
      confirmPassword: 'P@ssword1',
      email: 'email@email.com',
      lastName: "lastName"
    });
    props.signUpUser.mockReset();
    wrapper.instance().handleSubmit(event)
    expect(wrapper.instance().state.username).toBe('username');
    expect(props.signUpUser).toHaveBeenCalled()
  });


  test('should call user exist to check if user exists before sign up', () => {
    const { wrapper, props, state } = setup();
    const handleblurSpy = jest.spyOn(SignUpForm.prototype, 'handleBlur')
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'username',
        value: 'username '
      }
    }
    wrapper.setState({
      username: 'username',
      // userExist: {
      //   username: 'username error something'
      // }
    });
    wrapper.instance().handleBlur(event)
    expect(wrapper.instance().state.username).toBe('username');
    expect(props.checkUserExist).toHaveBeenCalled()
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
    expect(mapDispatchToProps(dispatch)).toHaveProperty('signUpUser')
    expect(mapDispatchToProps(dispatch)).toHaveProperty('checkUserExist')
    const { checkUserExist, signUpUser } = mapDispatchToProps(dispatch);
    signUpUser();
    expect(dispatch).toHaveBeenCalled();
    checkUserExist();
    expect(dispatch).toHaveBeenCalled();
  })

  test('should call componentWillMount', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });

    const props = {
      authenticated: true,
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      history: {
        push: jest.fn()
      },
    };
    spy = jest.spyOn(SignUpForm.prototype, 'componentWillMount');
    const wrapper = shallow(<SignUpForm {...props} />)
    // const route = wrapper.find({ path: '/profile' });

    expect(SignUpForm.prototype.componentWillMount).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalled();
    // route.props().render();
    // expect(route).toBeTruthy();
  })

  test('should call componentWillReceiveProps', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });

    const props = {
      authenticated: false,
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      history: {
        push: jest.fn()
      },
    };

    const nextProps = {
      authenticated: true,
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      history: {
        push: jest.fn()
      },
    }
    spy = jest.spyOn(SignUpForm.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<SignUpForm {...props} />)
    wrapper.setProps(nextProps);
    expect(wrapper.instance().componentWillReceiveProps).toHaveBeenCalledTimes(1)
  })

  test('should call componentWillReceiveProps and set saving to be false', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });

    const props = {
      authenticated: false,
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      history: { pathname: '' }
    };

    const nextProps = {
      authenticated: false,
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      history: {
        push: jest.fn()
      },
    }
    spy = jest.spyOn(SignUpForm.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<SignUpForm {...props} />)
    wrapper.setProps(nextProps);
    expect(SignUpForm.prototype.componentWillReceiveProps).toHaveBeenCalled()
    expect(spy).toHaveBeenCalled();

  })
});
