import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Pagination } from "react-materialize";


import FavoritePageHeader from '../userFavorite/FavoritePageHeader';
import Footer from '../../components/common/Footer';
import FavoriteBookCard from '../userFavorite/FavoriteBookCard'
import { fetchUserFavoriteBooks } from '../../actions/userAction';
import ajaxLoader from '../../media/ajax-loader.gif';


/**
 * 
 * 
 * @class Favorite
 * @extends {Component}
 */
class Favorite extends Component {

  /**
   * Creates an instance of Favorite.
   * @param {any} props 
   * @memberof Favorite
   */
  constructor(props) {
    super(props);
    this.state = {
      maxItems: 2,
      showPagination: false,
      displayedBooks: [],
      activePage: 1,
      maxItemsPerPage: 2,
    }

    this.handleSelectedPage = this.handleSelectedPage.bind(this);
  }

  /**
   * @returns {Array} Favorite books
   * 
   * @memberof Favorite
   */
  componentWillMount() {
    this.props.fetchUserFavoriteBooks()
  }

  /**
   * 
   * 
   * @param {any} newProps 
   * @returns {Array} response containing all favorite books
   * @memberof Favorite
   */
  componentWillReceiveProps(newProps) {
    if(newProps === this.props) return;
    const { favoriteBooks } = newProps;
    const noOfBooks = favoriteBooks.length;
    const maxItems = Math.ceil(noOfBooks / this.state.maxItemsPerPage);
    this.setDisplayedBooks(favoriteBooks);
    if (maxItems > 1) {
      this.setState({
        maxItems: maxItems,
        showPagination: true
      })
    }
  }

  /**
   * @returns {Array} an array of books to be displayed on each page
   * 
   * @param {any} favoriteBooks
   * @memberof Favorite
   */
  setDisplayedBooks(favoriteBooks) {
    const displayedBooks = favoriteBooks.slice((this.state.activePage - 1) *
    this.state.maxItemsPerPage,
    (this.state.activePage) * this.state.maxItemsPerPage);
    this.setState({
      displayedBooks
    })
  }

  /**
   * @returns {void}
   * 
   * @param {any} activePage 
   * @memberof Favorite
   */
  handleSelectedPage(activePage) {
    this.setState({
      activePage
    }, () => this.setDisplayedBooks(this.props.favoriteBooks))

  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof Favorite
   */
  render () {
    const { loading, favoriteBooks } = this.props;
    const { showPagination, displayedBooks } = this.state;
    return (
      <div>
        <FavoritePageHeader/>
        { loading ? 
          <div className="center-align" style={{ marginTop: '1em', marginBottom: '1em'}}>
            <img src={ajaxLoader} alt="Loading..."/>
          </div> : 
          ''
        }
        { !loading && displayedBooks.length ?
          <div className="container">
            <div className="row">
                <div className="col s12">
                  <h3 className="center-align"> My Favorites Books </h3>
                </div>
            </div>
            <div className="row">
            {  displayedBooks.map((favoriteBook,index) => {
              return <div key={index}><FavoriteBookCard  favoriteBook={favoriteBook}/></div>
              })
            }
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
          </div> : null }
        { !loading && !favoriteBooks.length ?
          <div className="container">
              <div className="card">
                <div className="card-content">
                <p>
                  Favorite List is empty
                </p>
                </div>
              </div>
            </div> : null }
        <Footer/>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    favoriteBooks: state.userReducer.favoriteBooks,
    loading: state.userReducer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserFavoriteBooks: () => dispatch(fetchUserFavoriteBooks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
   
