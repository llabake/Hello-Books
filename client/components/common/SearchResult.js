import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSearchedBooks } from '../../actions/bookAction';
import Header from '../common/Header';
import Footer from '../common/Footer';
import BookCard from '../common/BookCard';
import { getUser } from '../../helpers/utils';


/**
 * 
 * 
 * @class SearchResult
 * @extends {Component}
 */
class SearchResult extends Component {

  /**
   * Creates an instance of SearchResult.
   * @param {any} props 
   * @memberof SearchResult
   */
  constructor(props) {
    super(props);
    this.state = {}
  }


  /**
   * @returns {void}
   * 
   * @memberof SearchResult
   */
  componentWillMount() {
    this.props.fetchSearchedBooks(this.props.match.params.searchTerm)
  }

  /**
   * 
   * @returns {void}
   * @memberof SearchResult
   */
  render () {
  const searchedBooks = this.props.searchedBooks;
  const user = getUser();
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo left adjust">HelloBooks</Link>
              <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
              
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a className="dropdown-button" href="#" data-activates="dropdown1">{user.username}<i className="material-icons right">arrow_drop_down</i></a>
                  {/* <!-- Dropdown Structure --> */}
                  <ul id="dropdown1" className="dropdown-content">
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
        <div className="container">
          <div>
            <h3 className="center">
              {searchedBooks.length} Results for {this.props.match.params.searchTerm}
            </h3>
          </div>
          <div className="row">
          {searchedBooks.map((searchedBook, index) => {
            return <div key={index}><BookCard book={searchedBook}/></div>
          })}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchedBooks: state.bookReducer.searchResult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSearchedBooks: (searchTerm) => dispatch(fetchSearchedBooks(searchTerm))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
