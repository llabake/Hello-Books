import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextAreaInput from '../common/TextAreaInput';
import TextInput from '../common/TextInput';
import InputValidator from '../../helpers/inputValidator';
import { modifyReviewAction } from '../../actions/bookAction';
/**
 * 
 * 
 * @class EditReview
 * @extends {Component}
 */
class EditReview extends Component {
  /**
   * Creates an instance of EditReview.
   * @param {any} props 
   * @memberof EditReview
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      caption: '',
      errors: {},
      isValid: false,
      saving: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleModifyReview = this.handleModifyReview.bind(this);
  }

  /**
   * @returns {void}
   * 
   * @memberof EditReview
   */
  componentWillMount() {
    const { review } = this.props
    this.setState({
      content: review.content,
      caption: review.caption
    })
  }

  /**
   * 
   * 
   * @returns {object} response containing review validity
   * @memberof EditReview
   */
  validate() {
    const { errors, isValid, } = InputValidator.modifyReview(this.state)
    this.setState({ isValid, errors });
    return isValid;
  }

  /**
   * @returns {object} review data
   * 
   * @param {any} event 
   * @memberof EditReview
   */
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.validate());
  }

  /**
   * @returns {void}
   * 
   * @param {any} event 
   * @memberof EditReview
   */
  handleModifyReview(event) {
    event.preventDefault();
    const reviewData = this.state;
    if(this.validate()) {
      this.setState({
        error: {}
      });
      this.props.modifyReviewAction(this.props.review.id, reviewData)
    }
  }

  /**
   * 
   * 
   * @returns {object} Edited Review 
   * @memberof EditReview
   */
  render () {
    const { errors } = this.state
    return (
      <div>
        <form onSubmit= {this.handleModifyReview}>
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
          <button type="submit" className="waves-effect waves-light btn" >Cancel</button>
          <button type="submit" className="waves-effect waves-light btn" >Save Changes</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    modifyReviewAction: (reviewId, reviewData) => dispatch(modifyReviewAction(reviewId, reviewData)),
  }
}

export default connect(null, mapDispatchToProps)(EditReview);