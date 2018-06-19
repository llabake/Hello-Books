import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { checkIsbnExist, saveBook } from '../../actions/bookAction'
import TextInput from '../common/TextInput';
import inputValidator from '../../helpers/inputValidator'
import TextAreaInput from '../common/TextAreaInput';

/**
 * 
 * 
 * @class AddBook
 * @extends {Component}
 */
class AddBook extends Component {
  /**
   * Creates an instance of AddBook.
   * @param {any} props 
   * @memberof AddBook
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      publishedYear: '',
      isbn: '',
      quantity: '',
      description: '',
      aboutAuthor: '',
      image: '',
      errors: {},
      isbnExist: '',
      saving: false,
      isValid: false,
      userExist: {},
      redirect: false,
      uploadedImage: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }


  /**
   * 
   * 
   * @param {any} event 
   * @memberof AddBook
   * @returns {object} object containing state
   * 
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.validate());
  }


  /**
   * 
   * 
   * @param {any} event 
   * @memberof AddBook
   * @returns {object} response containing added book
   */
  handleSubmit(event) {
    event.preventDefault();
    const bookData = this.state;
    if (this.validate()) {
      this.setState({
        error: {},
        saving: true
      });
      this.props.saveBook(bookData)
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
   * 
   * 
   * @param {any} event 
   * @memberof AddBook
   * @returns {Object} object containing isbn validation
   */
  handleBlur(event) {
    const field = event.target.name;
    const userInput = event.target.value.trim();
    if (userInput !== '') {
      this.props.checkIsbnExist(field, userInput)
        .then(() => {
          this.setState({
            isbnExist: ''
          }, () => {
            this.validate()
          })
        })
        .catch((error) => {
          const errors = this.state.errors;
          const isbnExist = error.response.data.message;
          errors[field].push(error.response.data.message)
          this.setState({ errors, isbnExist })
        })
    }
  }

  /**
   * 
   * 
   * @returns {object} response containing book validation status
   * @memberof AddBook
   */
  validate() {
    const { errors, isValid } = inputValidator.addBook(this.state);
    this.setState({ isValid, errors });
    return isValid;
  }

  /**
   *@returns {void}
   *
   * @param {*} event
   * @memberof AddBook
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
   * @returns {object} object containing created book detail
   * @memberof AddBook
   */
  render() {
    const { errors, isValid, saving, redirect } = this.state;
    return (
      redirect ? <Redirect to='/allbooks' /> :
        <div>
          <div id="banner">
            <div className="container form-style">
              <div className="row">
                <div className="row signup-head">
                  <div className="col s12">
                    <h5 className="center-align"> Add Book </h5>
                  </div>
                </div>
                <div className="col s12 ">
                  <div className="row ">
                    <form className="col s12 signup" onSubmit={this.handleSubmit}>
                      <TextInput
                        id='title'
                        type='text'
                        icon='title'
                        name='title'
                        placeholder='Title'
                        onChange={this.handleChange}
                        value={this.state.title}
                        errors={errors.title}
                      />
                      <TextInput
                        id='author'
                        type='text'
                        icon='account_circle'
                        name='author'
                        placeholder='Author'
                        onChange={this.handleChange}
                        value={this.state.author}
                        errors={errors.author}
                      />
                      <TextInput
                        id='publishedYear'
                        type='text'
                        icon='date_range'
                        name='publishedYear'
                        placeholder='Published Year'
                        onChange={this.handleChange}
                        value={this.state.publishedYear}
                        errors={errors.publishedYear}
                      />
                      <TextInput
                        id='isbn'
                        type='text'
                        icon='lock'
                        name='isbn'
                        placeholder='ISBN'
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={this.state.isbn}
                        errors={errors.isbn}
                      />
                      <TextInput
                        id='quantity'
                        type='number'
                        icon='date_range'
                        name='quantity'
                        placeholder='Quantity'
                        onChange={this.handleChange}
                        value={this.state.quantity}
                        errors={errors.quantity}
                      />
                      <TextAreaInput
                        id='description'
                        icon='short_text'
                        name='description'
                        placeholder='Description'
                        value={this.state.description}
                        onChange={this.handleChange}
                        errors={errors.description}
                      />
                      <TextAreaInput
                        id='aboutAuthor'
                        icon='short_text'
                        placeholder='About the Author'
                        name='aboutAuthor'
                        value={this.state.aboutAuthor}
                        onChange={this.handleChange}
                        errors={errors.aboutAuthor}
                      />
                      <div
                        className="file-field input-field"
                        id="image-field"
                        style={{ marginTop: '35em' }} >
                        <div
                          className="btn"
                          style={{ width: '40%', fontSize: '13px', marginTop: '34px' }}
                        >
                          <span>Upload Image</span>
                          <input type="file"
                            accept="image/*"
                            style={{ marginTop: '74px' }}
                            onChange={this.handleFileChange}
                          />
                        </div>
                        <div className="file-path-wrapper">
                          <input
                            className="file-path validate"
                            type="text" style={{ marginTop: '29px' }} />
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
                        style={{ marginTop: '2em' }}
                        className="waves-effect waves-light btn"
                        disabled={!isValid || saving}>Add Book</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
  return { errors: state.errors };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkIsbnExist: (field, userInput) => dispatch(checkIsbnExist(field, userInput)),
    saveBook: (bookData) => dispatch(saveBook(bookData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);

