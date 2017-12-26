import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextInput from '../components/common/TextInput';
import inputValidator from '../helpers/inputValidator'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

/**
 * 
 * 
 * @export
 * @class SignUpForm
 * @extends {Component}
 */
export default class SignUpForm extends Component {
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
      // blurred: {
      //   confirmPassword: false,
      //   firstName: false,
      //   lastName: false
      // }

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleBlur =this.handleBlur.bind(this);
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
    }, () => {
       this.validate();
    });
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
    console.log('submitted')
  }

  // handleBlur(fieldName) {
  //   this.setState(state => ({
  //       ...state,
  //       blurred: {
  //           ...state.blurred,
  //           [fieldName]: true
  //       }
  //   }))
  // }

  /**
   * @returns {Object} object containing validation status and corresponding errors
   * 
   * @memberof SignUpForm
   */
  validate() {
    const { errors, isValid } = inputValidator.signUp(this.state);
    this.setState({ isValid, errors })
  }

  /**
   * 
   * 
   * @returns {Object} object containing user detail
   * @memberof SignUpForm
   */
  render () {     
    const { errors, isValid, blurred } = this.state;
    return (
      <div>
        <Header/>
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
                      {/* <div className=" input-field col s6"> */}
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
                        {/* <i className="material-icons prefix">account_circle</i>   
                        <input id="icon-prefix" placeholder="First Name" name="firstName"
                        required id="first_name" type="text" className="validate" 
                        value={this.state.firstName} onChange={this.handleChange}
                        onBlur={this.handleBlur} />
                        {errors && <div>{errors.firstName}</div>} */}
                      {/* </div> */}
                      {/* <div className=" input-field col s6"> */}
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
                        {/* <i className="material-icons prefix">account_circle</i>   
                        <input  placeholder="Last Name" name="lastName"
                        required id="last_name" type="text" className="validate" 
                        value={this.state.lastName} onChange={this.handleChange}
                        onBlur={this.handleBlur}/>
                        {errors && <div>{errors.lastName}</div>} */}
                        
                      {/* </div> */}
                    </div>
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
                    id = 'email'
                    type = 'email'
                    icon = 'email'
                    name = 'email'
                    placeholder = 'Email'
                    onChange = {this.handleChange}
                    value = {this.state.email}
                    errors = {errors.email}
                    />
                    {/* <div className=" input-field col s12">
                      <i className="material-icons prefix">account_circle</i>   
                      <input  placeholder="Username" name="username"
                      required id="username" type="text" className="validate" 
                      value={this.state.username} onChange={this.handleChange}
                      onBlur={this.handleBlur}/>
                      {errors && <div className="red-text"><i className="material-icons">error_outline</i>{errors.username}</div>}
                      
                    </div> */}
                    {/* <div className="input-field col s12">
                      <i className="material-icons prefix">email</i>
                      <input  id="email" type="email" required
                      className="validate" placeholder="Email" name="email"
                      value={this.state.email} onChange={this.handleChange}/>
                      {errors && <div>{errors.email}</div>}
                      
                    </div> */}
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
                    {/* <div className="input-field col s12">
                      <i className="material-icons prefix">lock</i>
                      <input  id="password" type="password" required
                      placeholder="Password" className="validate" name="password"
                      value={this.state.password} onChange={this.handleChange}/>
                      {errors && <div>{errors.password}</div>}
                      
                    </div> */}
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
                    {/* <div className="input-field col s12">
                      <i className="material-icons prefix">lock</i>
                      <input id="confirm-password" type="password" required
                      placeholder="Re-enter Password " className="validate" name="confirmPassword"
                      value={this.state.confirmPassword} onChange={this.handleChange}
                      // onBlur={this.handleBlur}
                      />
                      { errors && <div>{errors.confirmPassword}</div>}
                      
                    </div> */}
                    <button type="submit" className="waves-effect waves-light btn" disabled= {!isValid || !saving}>Register</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="terms">
              <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
              <p> Already have an account? <a href="signin.html">Login Now</a></p> 
            </div>
          </div> 
        </div>
        <Footer/>
      </div>


    );
  }
}

