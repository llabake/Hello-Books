import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { reviewBook } from '../../actions/bookAction';
import TextAreaInput from '../common/TextAreaInput';
import TextInput from '../common/TextInput';
import InputValidator from '../../helpers/inputValidator';

const postReviewButton = {
  width: '25%',
  marginLeft: '36em'
}

/**
 * 
 * 
 * @class ReviewArea
 * @extends {Component}
 */
class ReviewArea extends Component {
  /**
   * Creates an instance of ReviewArea.
   * @param {any} props 
   * @memberof ReviewArea
   */
  constructor(props) {
    super (props);
    this.state = {
      errors: {},
      isValid: false,
      saving: false,
      content: '',
      caption: ''
    }

    this.handleAddReview = this.handleAddReview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  


  /**
   * 
   * 
   * @returns {Object} response containing review validation 
   * @memberof ReviewArea
   */
  validate() {
    const { errors, isValid } = InputValidator.addReview(this.state);
    this.setState({ isValid, errors });
    return isValid;
  }

  /**
   * @returns {object} review object validity
   * 
   * @param {any} event 
   * @memberof ReviewArea
   */
  handleAddReview (event) {
    event.preventDefault();
    const reviewData = this.state
    this.props.reviewBook(this.props.bookId, reviewData)
    .then(() => this.clearForm());
  }

  /**
   * @returns {object} cleared form
   * 
   * @memberof ReviewArea
   */
  clearForm() {
    this.setState ({
      caption: '',
      content:'',
    })
  }

  /**
   * @returns {Object} review data
   * 
   * @param {any} event 
   * @memberof ReviewArea
   */
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.validate());
  }
  /**
   * 
   * 
   * @returns {Object} review object
   * @memberof ReviewArea
   */
  render () {
    const { errors, isValid, saving } = this.state;
    return (
      <div>
        <form onSubmit= {this.handleAddReview}>
          <TextInput
          id = 'caption'
          type = 'text'
          icon = 'rate_review'
          name = 'caption'
          placeholder = 'Caption'
          onChange = {this.handleChange}
          value = {this.state.caption}
          errors = {errors.caption}
          />
          <TextAreaInput
          id='content'
          icon = 'rate_review'
          name = 'content'
          placeholder = 'Content'
          value = {this.state.content}
          onChange = {this.handleChange}
          errors = {errors.content}
          />
          <button type="submit" className="waves-effect waves-light btn" 
            disabled= {!isValid || saving} style={postReviewButton}>Post Review
          </button>
        </form>
      </div>
    )
  }
  
}

const mapStateToProps = (state) => {
  return { errors: state.errors };
}

const mapDispatchToProps = (dispatch) => {
  return {
    reviewBook: (bookId, reviewData) => dispatch(reviewBook(bookId, reviewData))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReviewArea);

