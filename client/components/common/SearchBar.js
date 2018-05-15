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
  handleChange (event) {
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
  redirectToSearch(){
    window.location.href = `/search/${this.state.searchTerm}`
  }


  /**
   * 
   * 
   * @returns {void} 
   * @memberof SearchBar
   */
  render () {
    return (
      <form onSubmit={this.handleSearch}>
        <div className="input-field col m6 s12 l6 " style={{'marginRight': '12px'}}>
          <input
            id="search" 
            type="search"  
            placeholder="Title, author, or ISBN" 
            name='searchTerm' 
            onChange={this.handleChange}
            value={this.state.searchTerm}
          />
          <label className="label-icon icon-sit" htmlFor="search"><a><i className="material-icons">search</i></a></label>
          {/* <label className="label-icon icon-sit" htmlFor="search"><button style={{
            'lineHeight': '15px',
            'letterSpacing': 'undefined',
            'paddingTop': '0px' ,
            'paddingBottom': '0px',
            'color': '#ffffff',
            'paddingLeft': '18px',
            'paddingRight': '18px',
            'borderRadius': '4px',
            'border': '0px',
            'background': '#7c4561',
            'margin': '12px ',
            'marginLeft': '16px' ,
            'height': '48px',
            'textAlign': 'center',
            'display': 'inline-block',
            'float': 'right',
            'whiteSpace': 'nowrap'
            }}>Search</button></label> */}
          <i className="material-icons">close</i>
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