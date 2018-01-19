import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import  { signInUser }  from '../actions/userAction';
import TextInput from '../components/common/TextInput';
import inputValidator from '../helpers/inputValidator'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

/**
 * 
 * 
 * @export
 * @class SignInForm
 * @extends {Component}
 */
class SignInForm extends Component {
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
      redirect: false,
      saving: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.props.signInUser(userData)
      .then(() => {
        setTimeout(() => {
          this.setState({
            redirect: true,
          });
        }, 2000)
      })
      .catch(() => {
        this.setState({
          redirect: false,
          saving: false
        })
      })
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
    const { errors, isValid, saving, redirect } = this.state;
    return (
      redirect ? <Redirect to='/allbooks' /> :
      <div>
        <header> 
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo left adjust">Hello Books</Link>
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                </ul>
              </div>
            </nav>
          </div> 
        </header>
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
                <p> Don't have an account? <Link to="/signup">Sign Up Now</Link>  | <span><Link to="/recoverpassword">Forgot Password</Link></span></p> 
            </div>
          </div> 
        </div>
        <Footer/> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (userData) => dispatch(signInUser(userData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

