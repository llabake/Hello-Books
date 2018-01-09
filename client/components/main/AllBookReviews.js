import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { fetchAllBookReview } from '../../actions/bookAction';
import { getUser } from '../../helpers/utils';
import images from '../../media/images.jpg';

const captionStyle = { 
  margin: '0',
  fontSize: '30px',
  fontStyle: 'italic',
  lineHeight: '32px',
  wordWrap: 'break-word'
}

const contentStyle = {
  fontSize: '15px', 
  lineHeight: '21px'
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
   * 
   * 
   * @returns {object} list of all review for a book
   * @memberof AllBookReviews
   */
  render () {
    const { reviews, } = this.props
    return (
      <div>
        <div className="row">
          { reviews ?
            reviews.map((review, index) => {
              return <div className="col l10 offset-l1 m12 s12" key={index}> 
                      <ul>
                        <li>
                          <img className="responsive-img circle right" src={images} valign= 'top' height = '37px'  alt="" />
                          <span className="">
                            <strong className="teal-text">
                              {review.user.username}
                            </strong>
                          </span>
                          <span className=" grey-text">
                            <br />
                            <small style={{ borderLeft: '5px solid green' }}> 
                              {new Date(review.createdAt).toUTCString()}
                            </small>
                          </span>
                        </li>
                        <li>
                          <p style={captionStyle}>
                            “{review.caption}”
                          </p>
                          <p style= {contentStyle}>
                            {review.content}
                          </p>
                          {/* <span className="secondary-content btn btn-flat">Reply</span> */}
                        </li>
                        <div className='divider' style= {{ borderBottom: '1px solid #c8c8c8'}}> </div>
                      </ul>
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
  };
}


export default connect(mapStateToProps, null)(AllBookReviews);

