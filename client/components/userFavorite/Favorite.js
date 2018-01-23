import React, { Component } from 'react';
import { connect } from 'react-redux';

import FavoritePageHeader from '../userFavorite/FavoritePageHeader';
import Footer from '../../components/common/Footer';
import FavoriteBookCard from '../userFavorite/FavoriteBookCard'
import { fetchUserFavoriteBooks } from '../../actions/userAction';

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
  }

  /**
   * @returns {Array} Favorite books
   * 
   * @memberof Favorite
   */
  componentWillMount() {
    this.props.fetchUserFavoriteBooks();
  }


  /**
   * 
   * 
   * @returns {void}
   * @memberof Favorite
   */
  render () {
    const { favoriteBooks } = this.props;
    return (
      <div>
        <FavoritePageHeader/>
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
    favoriteBooks: state.userReducer.favoriteBooks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserFavoriteBooks: () => dispatch(fetchUserFavoriteBooks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
   
