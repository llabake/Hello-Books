import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Pagination } from "react-materialize";


import FavoritePageHeader from '../userFavorite/FavoritePageHeader';
import Footer from '../../components/common/Footer';
import FavoriteBookCard from '../userFavorite/FavoriteBookCard'
import { fetchUserFavoriteBooks } from '../../actions/userAction';
import ajaxLoader from '../../media/ajax-loader.gif';
import { maxPageLimit } from '../../helpers/utils';


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
    const { favoriteCount } = newProps;
    console.log(favoriteCount, 'favoriteCount')
    console.log(maxPageLimit, 'maxPageLimit')
    const maxItems = Math.ceil(favoriteCount / maxPageLimit);
    console.log(maxItems, 'maxItems')
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
   * @param {any} page 
   * @memberof Favorite
   */
  handleSelectedPage(page) {
    console.log(page, 'page')
    this.props.fetchUserFavoriteBooks(page, maxPageLimit)
  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof Favorite
   */
  render() {
    const { loading, favoriteBooks } = this.props;
    const { showPagination } = this.state;
    return (
      <div>
        {loading ?
          <div className="center-align" style={{ marginTop: '1em', marginBottom: '1em' }}>
            <img src={ajaxLoader} alt="Loading..." />
          </div> :
          ''
        }
        {!loading && favoriteBooks.length ?
          <div className="container">
            <div className="row">
              <div className="col s12">
                <h3 className="center-align"> My Favorites Books </h3>
              </div>
            </div>
            <div className="row">
              {favoriteBooks.map((favoriteBook, index) => {
                return <div key={index}><FavoriteBookCard favoriteBook={favoriteBook} /></div>
              })
              }
            </div>
            {showPagination ?
              <Pagination
                className={'center-align'}
                items={this.state.maxItems}
                activePage={1} maxButtons={4}
                onSelect={this.handleSelectedPage}
              /> :
              null
            }
          </div> : null}
        {!loading && !favoriteBooks.length ?
          <div className="container">
            <div className="card">
              <div className="card-content">
                <p>
                  Favorite List is empty
                </p>
              </div>
            </div>
          </div> : null}
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    favoriteBooks: state.userReducer.favoriteBooks,
    loading: state.userReducer.loading,
    favoriteCount: state.userReducer.favoriteCount    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserFavoriteBooks: (page) => dispatch(fetchUserFavoriteBooks(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);

