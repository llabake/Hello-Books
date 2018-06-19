import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import  { signInUser }  from '../actions/userAction';
import TextInput from '../components/common/TextInput';
import inputValidator from '../helpers/inputValidator'
import { authenticateUser } from '../helpers/utils';

/**
 * 
 * 
 * @export
 * @class SignInForm
 * @extends {Component}
 */
export class SignInForm extends Component {
  /**
   * Creates an instance of SignInForm.
   * @param {any} props 
   * @memberof SignInForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {}, 
      isValid: false,
      saving: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * 
   * 
   * @param {any} nextProps
   *  
   * @returns {Object} User pbject
   * 
   * @memberof SignInForm
   */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.authenticated) {
      this.setState({ saving: false });
    }
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
   * @memberof SignInForm
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
      this.props.signInUser(userData);
    }
  }
  /**
   * @returns {Object} object containing validation status and corresponding errors
   * 
   * @memberof SignInForm
   */
  validate() {
    const { errors, isValid } = inputValidator.signIn(this.state);
    this.setState({ isValid, errors });
    return isValid;
  }

  /**
   * 
   * 
   * @returns {Object} object containing user detail
   * @memberof SignInForm
   */
  render () {
    const { errors, isValid, saving, } = this.state;
    const { location } = this.props;
    const { isAuthenticated } = authenticateUser()
    const { from } = location.state || { from: { pathname: '/allbooks' } };
    if (isAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }    
    
    return (
      <div>
        <div id="banner">
          <div className="container form-style signin-form">
            <div className="row">
              <div className="row signup-head">  
                <div className="col s12"> 
                  <h5 className="center-align"> Login to HelloBooks Account </h5> 
                </div>
              </div> 
              <div className="col s12 ">
                <div className="row ">
                  <form className="col s12 signup" onSubmit={this.handleSubmit}>      
                    <TextInput
                    id = 'username'
                    type = 'text'
                    icon = 'account_circle'
                    name = 'username'
                    placeholder = 'Username'
                    onChange = {this.handleChange}
                    value = {this.state.username}
                    errors = {errors.username}
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
                    <button type="submit" className="waves-effect waves-light btn" disabled= {!isValid || saving}>Sign In</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="terms">         
                <p> Don't have an account? <Link to="/signup">Sign Up Now</Link>  
                </p> 
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    error: state.userReducer.error,
    user: state.userReducer.authUser,
    authenticated: state.userReducer.authenticated
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (userData) => dispatch(signInUser(userData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

