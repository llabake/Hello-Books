import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


import FavoritePageHeader from '../userFavorite/FavoritePageHeader';
import Footer from '../../components/common/Footer';
import FavoriteBookCard from '../userFavorite/FavoriteBookCard'
import { fetchUserFavoriteBooks } from '../../actions/userAction';
import toastMessage from '../../helpers/toastMessage';
import ProtectRoute from '../ProtectRoute';
import ajaxLoader from '../../media/ajax-loader.gif';


/**
 * 
 * 
 * @class Favorite
 * @extends {Component}
 */
class Favorite extends ProtectRoute {

  /**
   * Creates an instance of Favorite.
   * @param {any} props 
   * @memberof Favorite
   */
  constructor(props) {
    super(props);
  }

  /**
   * @returns {Array} Favorite books
   * 
   * @memberof Favorite
   */
  componentWillMount() {
    super.componentWillMount()
    this.props.fetchUserFavoriteBooks()
  }


  /**
   * 
   * 
   * @returns {void}
   * @memberof Favorite
   */
  render () {
    const { favoriteBooks, loading } = this.props;
    return (
      <div>
        <FavoritePageHeader/>
        { loading ? 
            <div className="center-align" style={{ marginTop: '1em', marginBottom: '1em'}}>
              <img src={ajaxLoader} alt="Loading..."/>
            </div> : 
            ''
        }
        { favoriteBooks.length ? 
          <div className="container">
            <div className="row">
                <div className="col s12">    
                  <h3 className="center-align"> My Favorites Books </h3>  
                </div>
            </div>
            <div className="row">
            {  favoriteBooks.map((favoriteBook,index) => { 
              return <div key={index}><FavoriteBookCard  favoriteBook={favoriteBook}/></div>
              }) 
            }
            </div>
          </div> :
          <div className="container">
            <div className="card">
              <div className="card-content">
              <p>
                Favorite List is empty
              </p>
              </div> 
            </div>
          </div>
        }
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
   
