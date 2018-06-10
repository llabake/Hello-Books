import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, } from 'react-router-dom';

import { checkIsbnExist,  } from '../../actions/bookAction';
import { updateBook } from '../../actions/adminAction';
import  TextAreaInput from '../common/TextAreaInput'
import  TextInput from '../common/TextInput'
import InputValidator from '../../helpers/inputValidator';
/**
 * 
 * 
 * @class ModifyBookDetail
 * @extends {Component}
 */
class ModifyBookDetail extends Component {

  /**
   * Creates an instance of ModifyBookDetail.
   * @param {any} props 
   * @memberof ModifyBookDetail
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
      isValid: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  /**
   * @returns {void}
   * 
   * @memberof ModifyBookDetail
   */
  componentWillMount() {
    const { book } = this.props
    this.setState({
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      isbn: book.isbn,
      quantity: book.quantity,
      description: book.description,
      aboutAuthor: book.aboutAuthor,
      image: book.image
    })
  }

  /**
   * @returns {void}
   * 
   * @param {any} event 
   * @memberof ModifyBookDetail
   */
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.validate());
  }

  /**
   * 
   * 
   * @returns {object} imput validation response object
   * @memberof ModifyBookDetail
   */
  validate() {
    const { errors, isValid } = InputValidator.modifyBook(this.state);
    this.setState({ isValid, errors });
    return isValid;
  }

  /**
   * @returns {object} isbn validity
   * 
   * @param {any} event 
   * @memberof ModifyBookDetail
   */
  handleBlur(event) {
    const field = event.target.name;
    const userInput = event.target.value;
    if(userInput !== '') {
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
   * @returns {void}
   * 
   * @param {any} event 
   * @memberof ModifyBookDetail
   */
  handleSubmit(event) {
    event.preventDefault();
    const bookData = this.state;
    if(this.validate()) {
      this.setState({
        error: {},
      });
      this.props.updateBook(this.props.book.id, bookData)
      .then(() => {
        $('#edit-book-modal').modal('close');
      })
    }
  }


  /**
   * 
   * 
   * @returns  {Object} Edited Book Object
   * @memberof ModifyBookDetail
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
                  <h5 className="center-align"> Edit Book </h5> 
                </div>
              </div> 
              <div className="col s12 ">
                <div className="row ">
                  <form className="col s12 signup" onSubmit={this.handleSubmit} method='post'>      
                    <TextInput
                    id = 'title'
                    type = 'text'
                    icon = 'title'
                    name = 'title'
                    placeholder = 'Title'
                    onChange = {this.handleChange}
                    value = {this.state.title }
                    errors = {errors.title}
                    />
                    <TextInput
                    id = 'author'
                    type = 'text'
                    icon = 'account_circle'
                    name = 'author'
                    placeholder = 'Author'
                    onChange = {this.handleChange}
                    value = {this.state.author }
                    errors = {errors.author}
                    />
                    <TextInput
                    id = 'publishedYear'
                    type = 'text'
                    icon = 'date_range'
                    name = 'publishedYear'
                    placeholder = 'Published Year'
                    onChange = {this.handleChange}
                    value = {this.state.publishedYear }
                    errors = {errors.publishedYear}
                    />
                    <TextInput
                    id = 'isbn'
                    type = 'text'
                    icon = 'lock'
                    name = 'isbn'
                    placeholder = 'ISBN'
                    onChange = {this.handleChange}
                    onBlur = {this.handleBlur}                    
                    value = {this.state.isbn  }
                    errors = {errors.isbn}
                    />
                    <TextInput
                    id = 'quantity'
                    type = 'number'
                    icon = 'date_range'
                    name = 'quantity'
                    placeholder = 'Quantity'
                    onChange = {this.handleChange}
                    value = { this.state.quantity }
                    errors = {errors.quantity}
                    />
                    <TextAreaInput
                    id='description'
                    icon = 'short_text'
                    name = 'description'
                    placeholder = 'Description'
                    value = {this.state.description }
                    onChange = {this.handleChange}
                    errors = {errors.description}
                    />
                    <TextAreaInput
                    id='aboutAuthor'
                    icon = 'short_text'
                    placeholder = 'About the Author'
                    name = 'aboutAuthor'
                    value = {this.state.aboutAuthor }
                    onChange = {this.handleChange}
                    errors = {errors.aboutAuthor}
                    />
                    <TextInput
                    id = 'image'
                    type = 'text'
                    icon = 'image'
                    name = 'image'
                    placeholder = 'Image'
                    onChange = {this.handleChange}
                    value = {this.state.image}
                    errors = {errors.image}
                    />
                    <button type="submit" className="waves-effect waves-light btn" disabled= {!isValid || saving}>Update Book</button>
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
    errors: state.errors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBook: (bookId, bookData) => dispatch(updateBook(bookId, bookData)),
    checkIsbnExist: (field, userInput) => dispatch(checkIsbnExist(field, userInput)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ModifyBookDetail);