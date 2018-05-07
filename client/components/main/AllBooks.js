import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Pagination } from 'react-materialize';


import Header from '../common/Header';
import Footer from '../common/Footer';
import BookCard from '../common/BookCard'
import { fetchAllBooks } from '../../actions/bookAction';
import { logout } from '../../actions/userAction';
import ProtectRoute from '../ProtectRoute';
import ajaxLoader from '../../media/ajax-loader.gif';
import { maxPageLimit } from '../../helpers/utils'

/**
 * 
 * 
 * @export
 * @class AllBooks
 * @extends {Component}
 */
class AllBooks extends ProtectRoute {
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
   * @returns {void}
   */
  componentWillMount() {
    super.componentWillMount();
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
    const { books, loading , user, authenticated, } = this.props;
    const { showPagination, } = this.state;
    return (
      <div>
        <header>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper">
                  <a href="/" className="brand-logo left adjust">HelloBooks</a>
                  <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                  
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                      { user.role === 'admin' ? <li><Link to="/admindashboard">Admin DashBoard</Link></li> : null }
                      { user.role === 'admin' ? <li><Link to="/addbook">Add book</Link></li> : null }
                      {/* <!-- <i className="material-icons prefix">notifications</i> --> */}
                              
                      <li><a className="dropdown-button" data-activates="dropdown1">{authenticated ? user.username : ''}<i className="material-icons right">arrow_drop_down</i></a>
                          {/* <!-- Dropdown Structure --> */}
                          <ul id="dropdown1" className="dropdown-content">
                              <li><Link to="/favorite">Favorite Books</Link></li>
                              <li><Link to="/profile"><i className="material-icons ">account_box</i>Profile</Link></li>
                              <li><a href="#!">Terms and Condition</a></li>
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
        <Footer/> 
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

