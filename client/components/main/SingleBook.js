import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Header from '../common/Header';
import Footer from '../common/Footer';
import Carousel from '../common/Carousel';
import BookCard from '../common/BookCard'
import AllBookReviews from '../main/AllBookReviews'
import ReviewArea from '../main/ReviewArea';
import { fetchSingleBook, favoriteABook, upVoteBook,
        downVoteBook, showReviewTextArea, showAllReviews,
        borrowBook } from '../../actions/bookAction';
import { getUser } from '../../helpers/utils';
import { logout } from '../../actions/userAction';
import SearchBar from '../common/SearchBar';
import ProtectRoute from '../ProtectRoute';

/**
 * 
 * 
 * @class SingleBook
 * @extends {Component}
 */
class SingleBook extends ProtectRoute {
  /**
   * Creates an instance of SingleBook.
   * @param {any} props 
   * @memberof SingleBook
   */
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }

    this.handleAddFavorite = this.handleAddFavorite.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleShowReviewTextArea = this.handleShowReviewTextArea.bind(this);
    this.handleShowAllReview = this.handleShowAllReview.bind(this);
    this.handleBorrow = this.handleBorrow.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    
  }

  /**
   * @returns {Object} object containing a single book detail
   * 
   * @memberof SingleBook
   */
  componentDidMount() {
    this.props.fetchSingleBook(this.props.match.params.bookId);
  }


  /**
   * 
   * 
   * @param {any} event 
   * @memberof SingleBook
   * @returns {Array} favorited book array
   */
  handleAddFavorite (event) {
    event.preventDefault();
    this.props.favoriteABook(this.props.match.params.bookId)
  }

  /**
   * 
   * 
   * @param {any} event 
   * @memberof SingleBook
   * @returns {object} book object upvoted
   */
  handleUpvote (event ) {
    event.preventDefault();
    this.props.upVoteBook(this.props.match.params.bookId)
  }


  /**
   * @returns {object} new state
   * 
   * @param {any} event 
   * @memberof SingleBook
   */
  handleShowReviewTextArea (event) {
    event.preventDefault();
    this.props.showReviewTextArea()
  }

  /**
   * @returns {object} load a component
   * 
   * @param {any} event 
   * @memberof SingleBook
   */
  handleShowAllReview (event) {
    event.preventDefault();
    this.props.showAllReviews()
  }


  /**
   * @returns {object} book borroed
   * 
   * @memberof SingleBook
   */
  handleBorrow () {
    this.props.borrowBook(this.props.match.params.bookId)
    .then(() => {
      this.setState({
        borrowed: true
      })
    })
  }



  /**
   * 
   * 
   * @param {any} event 
   * @memberof SingleBook
   * @returns {object} book object downvoted
   */
  handleDownvote (event) {
    event.preventDefault();
    this.props.downVoteBook(this.props.match.params.bookId)
  }


  /**
   * @returns {object} redirects to home page
   * 
   * @memberof SingleBook
   */
  handleLogout() {
    this.props.logout();
  }
  
  /**
   * 
   * 
   * @returns {Object} html
   * @memberof SingleBook
   */
  render () { 
    const { book, loadTextArea, loadAllReview } = this.props;
    const user = getUser();
    return (
      <div>
        <header>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo left adjust">HelloBooks</Link>
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                  <li>
                    <SearchBar/>
                  </li>
                  
                  <li><a className="dropdown-button" href="#" data-activates="dropdown1">{ user.username }<i className="material-icons right">arrow_drop_down</i></a>
                    <ul id="dropdown1" className="dropdown-content">
                      <li><Link to="/favorite"><i className="material-icons ">library_add</i>Add Favorites</Link></li>
                      <li><a href="#">Terms and Condition</a></li>
                      <li className="divider"></li>
                      <li><Link to=""  onClick={this.handleLogout}><i className="material-icons ">lock</i>Log Out</Link></li>
                    </ul>
                  </li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                  <li>
                    <form>
                      <div className="input-field col s6 s12 ">
                        <input id="search" type="search"  placeholder="Title, author, or ISBN" required/>
                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        <i className="material-icons">close</i>
                      </div>
                    </form>
                  </li>
                  <li><a className="dropdown-button" href="detail.html" data-activates="dropdown1">{ user.username }<i className="material-icons right">arrow_drop_down</i></a>
                    {/* <!-- Dropdown Structure --> */}
                    <ul id="dropdown1" className="dropdown-content">
                      <li><a href="addfavorite.html"><i className="material-icons ">library_add</i>Add Favorites</a></li>
                      <li><a href="detail.html!">Terms and Condition</a></li>
                      <li className="divider"></li>
                      <li><Link to=""  onClick={this.handleLogout}><i className="material-icons ">lock</i>Log Out</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <div className="container">
          <div className="divider"></div>
          <div className="book-detail center-align">
              <h1 id="title">{book.title}</h1>
              <div>
                <span className="detail" id="author-top">
                  by <span className="author-name">{book.author}</span> 
                </span>
              </div>
              <div className="divider"></div>
          </div>
          <div className="section ">
            <div className="book">
              <div className="book-container">
                <div className="row ">
                  <div className="col l5 show-border">                            
                    <img className="materialboxed" width="250" src={book.image}/>
                  </div>
                  <div className="col  l7">
                    <div className="section">
                      <div className="section1">
                        <div> 
                          <a className=" write-review " onClick={this.handleAddFavorite}><i className=" material-icons pencil medium">favorite</i>Add to Favorite</a>
                        </div>
                        <form id="form-lend" >
                          {/* <!-- <a className="btn" onclick="Materialize.toast('I am a toast', 4000, 'rounded')">Toast!</a> --> */}
                          <a className="waves-effect waves-light btn "  onClick={this.handleBorrow}>Borrow</a>
                        </form>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                      <div className="section2">
                        <span> Quantity In Stock: </span> <span>{book.quantity}</span>
                        <span> Status: </span> <span>{ book.quantity>0 ? 'Available' : 'Unavailable'}</span>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                      <div className="section3">
                        <span>{book.title} has been borrowed </span> <span >{book.borrowCount}</span> times <span><a  className="write-review" href="review.html"><i className=" material-icons tiny pencil ">create</i>Review?</a></span>
                        <br/>
                        <span>Last Borrowed 25/05/2016</span>
                        <div> 
                          <a className=" upvote" onClick={this.handleUpvote} ><i className=" material-icons pencil small">thumb_up</i>{book.upVotes}</a>
                          <a className=" upvote" onClick={this.handleDownvote} ><i className=" material-icons pencil small">thumb_down</i>{book.downVotes}</a>
                          <a className=" upvote" onClick={this.handleAddReview} ><i className=" material-icons pencil small">comment</i>{book.reviews ? book.reviews.length : 0}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="section tab"> 
            <div className="row">
              <div className="col s12">
                <ul className="tabs .tabs-fixed-width" id="tab">
                  <li className="tab col s6"><a href="#about">About the author</a></li>
                  <li className="tab col s6"><a className="active" href="#overview">Overview</a></li>
                </ul>
              </div>
              <div id="about" className="col s12">
                  <div className="row ">
                    <div>
                      <h5 className="center-align"> About the Author </h5>
                    </div>
                  </div>
                  <span>
                    {book.aboutAuthor}
                  </span>
              </div>
              <div id="overview" className="col s12">
                <div className="row">
                  <div>
                    <h5 className="center-align"> Overview </h5>
                  </div>
                </div>
                <span>
                  {book.description}
                </span>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="section similar">
            <h3>
              You may also be interested in...
            </h3>
            <Carousel/>
          </div>
          <h3 id="review"> Reviews </h3>
          <a className="write-review" onClick={this.handleShowAllReview}>View all</a>
          <a  className="write-review" onClick={this.handleShowReviewTextArea}><i className=" material-icons tiny pencil">create</i>Write your review</a>

          <div className="divider"></div>
          <div className="section ">
            { loadTextArea ? <ReviewArea  bookId={book.id} onChange={this.handleChange} onSubmit={this.handleAddReview}/> :
              loadAllReview ? <AllBookReviews bookId={book.id} reviews= {book.reviews} /> : 
              <div className="row">
                { book.reviews ?
                  book.reviews.slice(0, 3).map((review, index) => {
                    return <div className="col s4" key={index}> <h4 className="rev-title">“{review.caption}” </h4> {review.content}</div>
                  }) : 
                  <p>Be the first to post a review</p>
                }
              </div>
            }
          </div>
        </div>
        <Footer/> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    book: state.bookReducer.book,
    loadTextArea: state.bookReducer.loadTextArea,
    loadAllReview: state.bookReducer.loadAllReview,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleBook: (bookId) => dispatch(fetchSingleBook(bookId)),
    favoriteABook: (bookId) => dispatch(favoriteABook(bookId)),
    upVoteBook: (bookId) => dispatch(upVoteBook(bookId)),
    downVoteBook: (bookId) => dispatch(downVoteBook(bookId)),
    showReviewTextArea: () => dispatch(showReviewTextArea()),
    showAllReviews: () => dispatch(showAllReviews()),
    borrowBook: (bookId) => dispatch(borrowBook(bookId)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook);

