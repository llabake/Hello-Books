import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import { deleteBookReview, loadReviewToEditAction } from '../../actions/bookAction';
import EditReview from './EditReview';
import userImage from '../../media/user.png';

const captionStyle = {
  margin: '0',
  fontSize: '1.0625rem',
  fontStyle: 'normal',
  lineHeight: '32px',
  wordWrap: 'break-word',
  fontWeight: 700,
  maxWidth: '26rem',
  fontFamily: "'Lato', sans-serif",
}

const contentStyle = {
  fontSize: '.9375rem',
  lineHeight: '1.5',
  fontWeight: 400,
  fontStyle: 'normal',
  color: '21282d',
}


/**
 * 
 * 
 * @class AllBookReviews
 * @extends {Component}
 */
export class AllBookReviews extends Component {
  /**
   * Creates an instance of AllBookReviews.
   * @param {any} props 
   * @memberof AllBookReviews
   */
  constructor(props) {
    super(props);

  }

  /**
   * @returns {void}
   * 
   * @param {any} bookId 
   * 
   * @param {any} reviewId 
   * @memberof AllBookReviews
   */
  handleDelete(bookId, reviewId) {
    this.props.deleteBookReview(bookId,reviewId)
  }

  /**
   * @returns {Object} review to be edited
   * 
   * @param {any} review 
   * @memberof AllBookReviews
   */
  handleLoadReviewToEdit(bookId, review) {
    const reviewWithBookId = { ...review, bookId }
    this.props.loadReviewToEditAction(reviewWithBookId)
  }

  /**
   * 
   * 
   * @returns {object} list of all review for a book
   * @memberof AllBookReviews
   */
  render() {
    const { user, reviews, editReview, reviewToEdit, bookId } = this.props
    return (
      <div>
        {editReview ? <EditReview review={reviewToEdit} /> : null}
        <div className="row">
          {reviews ?
            reviews.map((review, index) => {
              const reviewImage = review.user.image || userImage
              return <div id='review-list' className="col l10 offset-l1 m12 s12" key={index}>
                <div className='row'>
                  <div className='col s4' >
                    <div className='col s4' id='reviewee-image'>
                      <img
                        className="circle right"
                        src={'/' + reviewImage}
                        valign='top'
                        width="55"
                        height="55"
                        alt="reviewee image"
                      />
                    </div>
                    <div className='col s8'id='reviewee-name' >
                      <span style={contentStyle}>
                        {review.user.username}
                      </span>
                      <br />
                      <span style={contentStyle}>
                        {moment(review.updatedAt).fromNow()}
                      </span>
                    </div>
                  </div>
                  <div className='col s8' >
                    <div>
                      <span style={captionStyle}>
                        {review.caption}
                      </span>
                      {user.id === review.user.id ?
                        <a className='right'>
                          <span className="write-review" onClick={this.handleEdit} >
                            <i
                              id='review-action-edit'
                              className="material-icons tiny pencil blue-text text-darken-2"
                              onClick={() => this.handleLoadReviewToEdit(bookId, review)}>
                              create</i>
                            <i
                              className="material-icons tiny pencil red-text"
                              id='review-action-delete'
                              onClick={() => this.handleDelete(bookId, review.id)}>
                              delete</i>
                          </span>

                        </a>
                        : null
                      }
                      <br />
                      <p style={contentStyle}>
                        {review.content}
                      </p>
                    </div>

                  </div>
                  {index ?
                    <div className='divider'
                      style={{ borderBottom: '1px solid #c8c8c8', overflow: 'visible' }}>
                    </div> : ''

                  }
                </div>

              </div>
            }) :
            null
          }
        </div>
      </div>
    )
  }

}


export const mapStateToProps = (state) => {
  return {
    errors: state.bookReducer.errors,
    allbookReview: state.bookReducer.allbookReview,
    loadTextArea: state.bookReducer.loadTextArea,
    loadAllReview: state.bookReducer.loadAllReview,
    editReview: state.bookReducer.editReview,
    reviewToEdit: state.bookReducer.reviewToEdit,
    user: state.userReducer.authUser
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    loadReviewToEditAction: (review) => dispatch(loadReviewToEditAction(review)),
    deleteBookReview: (bookId, reviewId) => dispatch(deleteBookReview(bookId, reviewId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBookReviews);

