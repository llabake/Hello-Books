import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Footer from '../common/Footer';
import { getUser } from '../../helpers/utils';
import TextInput from '../common/TextInput';
import { getUserProfile, editProfile } from '../../actions/userAction';
import InputValidator from '../../helpers/inputValidator';

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
      uploadedImage: null,
      redirect: false

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  /**
   * @returns {void}
   * 
   * @memberof EditProfile
   */
  componentDidMount() {
    this.props.getUserProfile()
  }

  /**
   * @returns {object} profile to edit
   * 
   * @param {any} nextProps 
   * @memberof EditProfile
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps === this.props) return;
    const { profileToEdit, updated } = nextProps;
    if(updated) {
      setTimeout(() => {
        this.setState({
          redirect: true,
        })
      }, 2000)
    }
    this.setState({
      firstName: profileToEdit.firstName,
      lastName: profileToEdit.lastName,
      image: profileToEdit.image
    })
  }

  /**
   * @returns {object} object containing state
   * 
   * @param {any} event 
   * @memberof EditProfile
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.validate())
  }
  /**
   * @returns {object} edited profile response
   * 
   * @param {any} event 
   * @memberof EditProfile
   */
  handleSubmit(event) {
    event.preventDefault();
    const userData = this.state;
    this.props.editProfile(userData)
  }
  /**
   * @returns {files} uploaded image
   * 
   * @param {any} event 
   * @memberof EditProfile
   */
  handleFileChange(event) {
    const uploadedImage = event.target.files[0];
    this.setState({
      uploadedImage
    }, () => this.validate())
  }
  /**
   * 
   * 
   * @returns {object} validation response status
   * @memberof EditProfile
   */
  validate() {
    const { errors, isValid } = InputValidator.updateProfile(this.state);
    this.setState({ isValid, errors });
    return isValid;
  }

  /**
   * 
   * 
   * @returns {Object} User proile with imgae
   * @memberof EditProfile
   */
  render() {
    const { errors, isValid, saving, redirect } = this.state;
    return (
      redirect ? 
      <Redirect to='/profile' /> :
      <div>
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
                      id='first_name'
                      type='text'
                      icon='account_circle'
                      name='firstName'
                      placeholder='First Name'
                      onChange={this.handleChange}
                      value={this.state.firstName}
                      errors={errors.firstName}
                    />
                    <TextInput
                      id='last_name'
                      type='text'
                      icon='account_circle'
                      name='lastName'
                      placeholder='Last Name'
                      onChange={this.handleChange}
                      clearError={this.clearError}
                      value={this.state.lastName}
                      errors={errors.lastName}
                    />
                    <div className="file-field input-field" style={{ top: '1em', marginTop: 110 }}>
                      <div className="btn"
                        style={{ width: '40%', fontSize: '13px', marginLeft: '1.8em' }}>
                        <span>Photo</span>
                        <input type="file" accept="image/*"
                          onChange={this.handleFileChange} />
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate"
                          type="text" style={{ 'width': '89%', marginTop: 9 }} />
                      </div>
                      {errors.image && errors.image.length ?
                        errors.image.map((error, i) => {
                          return (
                            <div key={i} className='red-text'>
                              {error}
                            </div>
                          )
                        }) : null}
                    </div>
                    <button
                      type="submit"
                      className="waves-effect waves-light btn"
                      disabled={!isValid || saving}
                      style={{ top: '4em' }}>Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profileToEdit: state.userReducer.profile,
    updated: state.userReducer.updated
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: () => dispatch(getUserProfile()),
    editProfile: (userData) => dispatch(editProfile(userData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
