import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../common/Footer';
import { getUser } from '../../helpers/utils';
import  TextInput from '../common/TextInput';
/**
 * 
 * 
 * @class EditProfile
 * @extends {Component}
 */
class EditProfile extends Component {
  /**
   * Creates an instance of EditProfile.
   * @param {any} props 
   * @memberof EditProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      errors: {},
      isValid: false,
      saving: false,
    }
  }

  /**
   * 
   * 
   * @returns {Object} User proile with imgae
   * @memberof EditProfile
   */
  render () {
    const { errors, isValid, saving } = this.state;
    const user = getUser();
    return (
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
                  <h5 className="center-align"> Edit Profile </h5> 
                </div>
              </div> 
              <div className="col s12 ">
                <div className="row ">
                  <form className="col s12 signup" onSubmit={this.handleSubmit}>  
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
                    <div className="file-field input-field" style={{position: 'absolute', top: '27em'}}>
                      <div className="btn" style={{width: '40%',fontSize: '13px'}}>
                        <span>Upload Image</span>
                        <input type="file" accept="image/*"  onChange={this.handleFileChange} />
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                      </div>
                      {errors.image && errors.image.length ?
                        errors.image.map((error, i) => { return (
                        <div key={i} className= 'red-text'>
                          <i className="material-icons">error_outline</i>
                          {error}
                        </div>
                        )}) : null }
                    </div>
                    <button type="submit" className="waves-effect waves-light btn" disabled= {!isValid || saving} style={{top: '4em'}}>Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div> 
        </div>
        <Footer/>
      </div>
    )
  }
}

export default EditProfile;
