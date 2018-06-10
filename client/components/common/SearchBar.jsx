import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * 
 * 
 * @class SearchBar
 * @extends {Component}
 */
class SearchBar extends Component {

  /**
   * Creates an instance of SearchBar.
   * @param {any} props 
   * @memberof SearchBar
   */
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.redirectToSearch = this.redirectToSearch.bind(this)
  }

  /**
   * @return {object} state object
   * 
   * @param {any} event 
   * @memberof SearchBar
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  /**
   * @returns {array} an array of books that match the search criteria
   * 
   * @param {any} event 
   * @memberof SearchBar
   */
  handleSearch(event) {
    event.preventDefault();
    this.redirectToSearch();

  }

  /**
   * @returns {object} redirects to search page
   * 
   * @memberof SearchBar
   */
  redirectToSearch() {
    const trimmedSearchTerm = this.state.searchTerm && this.state.searchTerm.trim();
    trimmedSearchTerm ? 
    window.location.href = `/search/${trimmedSearchTerm}`:
    window.location.href = window.location.href 
  }


  /**
   * 
   * 
   * @returns {void} 
   * @memberof SearchBar
   */
  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <div className="input-field col s6 s12 ">
          <input
            // id="search"
            type="search"
            placeholder="Title, Author, Keyword"
            name='searchTerm'
            onChange={this.handleChange}
            value={this.state.searchTerm}
          />
          <label
            className="label-icon icon-sit"
            htmlFor="search">
            <i
              className="material-icons clickable"
              onClick={this.handleSearch}>search
            </i>
          </label>
          <i className="material-icons"
          style={{marginTop: '-6px', fontSize: '1.5rem'}}
          >close</i>
        </div>
      </form>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    searchedBooks: state.bookReducer.searchResult
  }
}

export default connect(mapStateToProps, null)(SearchBar);