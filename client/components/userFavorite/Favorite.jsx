import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Pagination } from "react-materialize";

import FavoriteBookCard from '../userFavorite/FavoriteBookCard'
import Loader from '../common/Loader';
import { fetchUserFavoriteBooks } from '../../actions/userAction';
import { maxPageLimit } from '../../helpers/utils';
import NothingFound from '../common/NothingFound';


/**
 * 
 * 
 * @class Favorite
 * @extends {Component}
 */
export class Favorite extends Component {

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
      activePage: 1,
    }

    this.handleSelectedPage = this.handleSelectedPage.bind(this);
  }

  /**
   * @returns {Array} Favorite books
   * 
   * @memberof Favorite
   */
  componentDidMount() {
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
    if (newProps === this.props) return;
    const { favoriteCount, favoriteBooks } = newProps;
    const maxItems = Math.ceil(favoriteCount / maxPageLimit);
    if (maxItems > 1) {
      this.setState({
        maxItems: maxItems,
        showPagination: true
      })
    } else {
      this.setState({
        showPagination: false
      })
    }
    if (!favoriteBooks.length && this.state.activePage > 1) {
      this.handleSelectedPage(this.state.activePage - 1)
    }
  }

  /**
   * @returns {void}
   * 
   * @param {any} page 
   * @memberof Favorite
   */
  handleSelectedPage(page) {
    this.props.fetchUserFavoriteBooks(page, maxPageLimit)
    this.setState({
      activePage: page
    });
  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof Favorite
   */
  render() {
    const { loading, favoriteBooks, favoriteCount } = this.props;
    const { showPagination, activePage } = this.state;
    return (
      <div>
        {loading ? <Loader /> : ''}
        {!loading && favoriteBooks.length ?
          <div className="container">
            <div className="row">
              <div className="col s12">
                <h3 className="center-align"> My Favorites Books </h3>
              </div>
            </div>
            <div className="row">
              {favoriteBooks.map((favoriteBook, index) => {
                return <div key={index}><FavoriteBookCard
                  favoriteBook={favoriteBook}
                  page={activePage}
                  handleSelectedPage={this.handleSelectedPage} />
                </div>
              })
              }
            </div>
            {showPagination ?
              <Pagination
                className={'center-align'}
                items={this.state.maxItems}
                activePage={activePage} maxButtons={4}
                onSelect={this.handleSelectedPage}
              /> :
              null
            }
          </div> : null}
        {!loading && !favoriteCount ?
          <div className="container">
            <NothingFound
              text={'Favorite List is empty'} />
          </div>
          : null}
      </div>
    )
  }
}



export const mapStateToProps = state => {
  return {
    favoriteBooks: state.userReducer.favoriteBooks,
    loading: state.userReducer.loading,
    favoriteCount: state.userReducer.favoriteCount
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    fetchUserFavoriteBooks: (page) => dispatch(fetchUserFavoriteBooks(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);

