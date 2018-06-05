import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { checkUserExist, signUpUser } from '../actions/userAction';
import TextInput from '../components/common/TextInput';
import inputValidator from '../helpers/inputValidator';

/**
 * 
 * 
 * @export
 * @class SignUpForm
 * @extends {Component}
 */
class SignUpForm extends Component {
  /**
   * Creates an instance of SignUpForm.
   * @param {any} props 
   * @memberof SignUpForm
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}, 
      saving: false,
      isValid: false,
      userExist: {},

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur =this.handleBlur.bind(this);
  }

  /**
   * 
   * 
   * @param {any} event 
   * @memberof SignUpForm
   * @returns {Object} object containing state
   */
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.validate());
  }

  /**
   * 
   * 
   * @param {any} event 
   * @memberof SignUpForm
   * @returns {Object} object containing user detail
   */
  handleSubmit(event) {
    event.preventDefault();
    const userData = this.state;
    if(this.validate()) {
      this.setState({
        error: {},
        saving: true
      });
      this.props.signUpUser(userData)
    }
  }

   /**
   * 
   * 
   * @memberof SignUpForm
   * 
   * @returns {void}
   */
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push('/profile');
    }
  }
  /**
   * 
   * 
   * @param {any} nextProps 
   * @memberof SignUpForm
   * 
   * @returns {Object} User onbject
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.authenticated) {
      setTimeout(() => {
        this.props.history.push('/allbooks')
      }, 2000)
    } else {
      this.setState({ saving: false })
    }
  }




  /**
   * @returns {obejct} user validation status
   * 
   * @param {any} event 
   * @memberof SignUpForm
   */
  handleBlur(event) {
    const field = event.target.name;
    const userInput = event.target.value;
    if(userInput !== '') {
      this.props.checkUserExist(field, userInput)
      .then(() => {
        this.setState({ 
          userExist: {}
        }, () => {
          this.validate()
        })
      })
      .catch((error) => {
        const errors = this.state.errors;
        const userExist = this.state.userExist;
        errors[field].push(error.response.data.message)
        userExist[field] = error.response.data.message
        this.setState({ errors, userExist })
      })
    }
  }

  /**
   * @returns {Object} object containing validation status and corresponding errors
   * 
   * @memberof SignUpForm
   */
  validate() {
    const { errors, isValid } = inputValidator.signUp(this.state);
    this.setState({ isValid, errors });
    return isValid;
  }

  /**
   * 
   * 
   * @returns {Object} object containing user detail
   * @memberof SignUpForm
   */
  render () {  
    const { errors, isValid, saving, } = this.state;
    return (
      <div>
        <div id="banner">
          <div className="container form-style">
            <div className="row">
              <div className="row signup-head">  
                <div className="col s12"> 
                  <h5 className="center-align"> Create an HelloBooks Account </h5> 
                </div>
              </div> 
              <div className="col s12 ">
                <div className="row ">
                  <form className="col s12 signup" onSubmit={this.handleSubmit}>      
                    <div className="s12">
                      <TextInput
                      id = 'first_name'
                      type = 'text'
                      icon = 'account_circle'
                      name = 'firstName'
                      placeholder = 'First Name'
                      onChange = {this.handleChange}
                      value = {this.state.firstName}
                      errors = {errors.firstName}
                      />
                      <TextInput
                      id = 'last_name'
                      type = 'text'
                      icon = 'account_circle'
                      name = 'lastName'
                      placeholder = 'Last Name'
                      onChange = {this.handleChange}
                      clearError={this.clearError}
                      value = {this.state.lastName}
                      errors = {errors.lastName}
                      />
                    </div>
                    <TextInput
                    id = 'username'
                    type = 'text'
                    icon = 'account_circle'
                    name = 'username'
                    placeholder = 'Username'
                    onChange = {this.handleChange}
                    onBlur = {this.handleBlur}
                    value = {this.state.username}
                    errors = {errors.username}
                    />
                    <TextInput
                    id = 'email'
                    type = 'email'
                    icon = 'email'
                    name = 'email'
                    placeholder = 'Email'
                    onChange = {this.handleChange}
                    onBlur = {this.handleBlur}
                    value = {this.state.email}
                    errors = {errors.email}
                    />
                    <TextInput
                    id = 'password'
                    type = 'password'
                    icon = 'lock'
                    name = 'password'
                    placeholder = 'Password'
                    onChange = {this.handleChange}
                    value = {this.state.password}
                    errors = {errors.password}
                    />
                    <TextInput
                    id = 'confirm-password'
                    type = 'password'
                    icon = 'lock'
                    name = 'confirmPassword'
                    placeholder = 'Re-enter Password'
                    onChange = {this.handleChange}
                    value = {this.state.confirmPassword}
                    errors = {errors.confirmPassword}
                    />
                    <button type="submit" className="waves-effect waves-light btn" disabled= {!isValid || saving}>Register</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="terms">
              {/* <p>By creating an account you agree to our <Link to="#">Terms & Privacy</Link>.</p> */}
              <p> Already have an account? <Link to="/signin">Login Now</Link></p> 
            </div>
          </div> 
        </div>
      </div>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.userReducer.authUser,
    authenticated: state.userReducer.authenticated    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserExist: (field, userInput) => dispatch(checkUserExist(field, userInput)),
    signUpUser: (userData) => dispatch(signUpUser(userData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

