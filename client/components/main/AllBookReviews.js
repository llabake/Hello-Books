import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { deleteBookReview, loadReviewToEditAction } from '../../actions/bookAction';
import { getUser } from '../../helpers/utils';
import images from '../../media/images.jpg';
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
class AllBookReviews extends Component {
  /**
   * Creates an instance of AllBookReviews.
   * @param {any} props 
   * @memberof AllBookReviews
   */
  constructor(props) {
    super (props);

  }
  
  /**
   * @returns {void}
   * 
   * @param {any} reviewId 
   * @memberof AllBookReviews
   */
  handleDelete(reviewId) {
    this.props.deleteBookReview(reviewId)
  }
  
  /**
   * @returns {Object} review to be edited
   * 
   * @param {any} review 
   * @memberof AllBookReviews
   */
  handleLoadReviewToEdit (review) {
    this.props.loadReviewToEditAction(review)
  }

  /**
   * 
   * 
   * @returns {object} list of all review for a book
   * @memberof AllBookReviews
   */
  render () {
    const { reviews, editReview, reviewToEdit } = this.props
    const user = getUser();
    return (
      <div>
        { editReview ? <EditReview review={reviewToEdit}/> : null }
        <div className="row">
          { reviews ?
            reviews.map((review, index) => {
              return <div className="col l10 offset-l1 m12 s12" key={index}>
              <div className='row'>
                <div className='col s3' >
                  <div className='col s1' >
                    <img className="responsive-img circle right" src={userImage} valign= 'top' height = '37px'  alt="" />
                  </div>
                  <div className= 'col s2' >
                    <span style={contentStyle}>
                      {review.user.username}
                    </span>
                    <br/>
                    <span style={contentStyle}>
                      <small style={{ borderLeft: '5px solid green' }}> 
                        {new Date(review.createdAt).toUTCString()}
                      </small>
                    </span>
                  </div>
                </div>
                <div className='col s9' >
                  <div>
                    <span style={captionStyle}>
                      {review.caption}
                    </span>
                    { user.id === review.user.id ?
                        <a className='right'>
                          <span  className="write-review" onClick={this.handleEdit} >
                            <i className=" material-icons tiny pencil blue-text text-darken-2"  onClick={() => this.handleLoadReviewToEdit(review)}>create</i>
                            <i className=" material-icons tiny pencil red-text" onClick={() => this.handleDelete(review.id)}>delete</i>
                          </span>
                          
                        </a>
                      : null
                    }
                    <br/>
                    <p style= {contentStyle}>
                      {review.content}
                    </p>
                  </div>

                </div>
                { index ? <div className='divider' style= {{ borderBottom: '1px solid #c8c8c8', overflow: 'visible'}}> </div> : '' }
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

// const mapStateToProps = ({isLoading}) => ({
//   loading: isLoading
// });

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    allbookReview: state.bookReducer.allbookReview,
    loadTextArea: state.bookReducer.loadTextArea,
    loadAllReview: state.bookReducer.loadAllReview,
    editReview: state.bookReducer.editReview,
    reviewToEdit: state.bookReducer.reviewToEdit
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadReviewToEditAction: (review) => dispatch(loadReviewToEditAction(review)),
    deleteBookReview: (reviewId) => dispatch(deleteBookReview(reviewId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBookReviews);

