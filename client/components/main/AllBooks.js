import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Pagination } from 'react-materialize';

import BookCard from '../common/BookCard'
import { fetchAllBooks } from '../../actions/bookAction';
import { logout } from '../../actions/userAction';
import ajaxLoader from '../../media/ajax-loader.gif';
import { maxPageLimit } from '../../helpers/utils'

/**
 * 
 * 
 * @export
 * @class AllBooks
 * @extends {Component}
 */
class AllBooks extends Component {
  /**
   * Creates an instance of AllBooks.
   * @param {any} props 
   * @memberof AllBooks
   */
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      maxItems: 2,
      showPagination: false,
      activePage: 1,
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSelectedPage = this.handleSelectedPage.bind(this);
    
  }

  /**
   * 
   * 
   * @memberof AllBooks
   * @returns {Array} books array
   */
  componentDidMount() {
    this.props.fetchAllBooks();
    
  }
  /**
   * @returns {object} redirects to home page
   * 
   * @memberof AllBooks
   */
  handleLogout() {
    this.props.logout();
  }


    /**
   * 
   * 
   * @param {any} newProps 
   * @returns {Array} response containing all books
   * @memberof AllBooks
   */
  componentWillReceiveProps(newProps) {
    if(newProps === this.props) return;
    const { bookCount } = newProps
    const maxItems = Math.ceil(bookCount / maxPageLimit);
    if (maxItems > 1) {
      this.setState({
        maxItems: maxItems,
        showPagination: true
      })
    }
  }

  /**
   * @returns {void}
   * 
   * @param {number} page
   * @param {number} limit
   * @memberof AllBooks
   */
  handleSelectedPage(page) {
    this.props.fetchAllBooks(page, maxPageLimit)
    // TODO: add component that allows users select the limit the want
  }

  /**
   * 
   * 
   * @returns {Object} object containing user detail
   * @memberof AllBooks
   */
  render () { 
    const { books, loading } = this.props;
    const { showPagination, } = this.state;
    return (
      <div>
        <div className="container">
          { loading ? 
            <div className="center-align" style={{ marginTop: '1em', marginBottom: '1em'}}>
              <img src={ajaxLoader} alt="Loading..."/>
            </div> : 
            ''
          }
          <div>
            <div className="row ">
              { books.length ? 
                <div className="section">
                  <div className="row">
                  { books ? books.map((book, index) => {
                    return <div key={index}><BookCard book={book}/></div>
                  }) : null }              
                  </div>
                  { showPagination ? 
                    <Pagination
                      className={'center-align'}
                      items={this.state.maxItems}
                      activePage={1} maxButtons={4}
                      onSelect={this.handleSelectedPage}
                    /> :
                    null 
                  }
                </div> : 
                !loading && !books.length ?
                <div className="container">
                  <div className="card">
                    <div className="card-content">
                      <p>
                        Ooppss!!! There are books in library at the moment.
                      </p>
                    </div>
                  </div>
                </div> : null 
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books,
    loading: state.bookReducer.loading,
    user: state.userReducer.authUser,
    authenticated: state.userReducer.authenticated,
    bookCount: state.bookReducer.bookCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBooks: (page) => dispatch(fetchAllBooks(page)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);

