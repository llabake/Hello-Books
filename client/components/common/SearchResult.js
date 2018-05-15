import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSearchedBooks } from '../../actions/bookAction';
import BookCard from '../common/BookCard';


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
    return (
      <div>
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
