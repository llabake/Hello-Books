import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bookDefaultImage } from '../../helpers/utils';
import { fetchTopFavoriteBooks } from '../../actions/bookAction'
import ajaxLoader from '../../media/ajax-loader.gif';
/**
 * 
 * 
 * @export
 * @class Carousel
 * @extends {Component}
 */
class Carousel extends Component {

  componentWillMount() {
    console.log('fetching books')
    this.props.fetchTopFavoriteBooks();
  }

  /**
  * 
  * @returns {function} initialises the carousel
  * @memberof Carousel
  */
  componentDidMount() {
   this.initializeCarousel()
  }

  componentDidUpdate() {
    this.initializeCarousel()
  }

  initializeCarousel() {
     $('.carousel').carousel({
      dist: 0,
      shift: 0,
      padding: 50,
      indicators: true,
    });
    autoplay()
    /**
     * @returns {function} materialize carousel autoplay
     *
     */
    function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 4500)}
  }

  /**
   * 
   * 
   * @returns {Object} html
   * @memberof Carousel
   */
  render () {
    this.initializeCarousel()
    let { topFavoriteBooks, loadingTopFavoritedBooks } = this.props;

    return (
      <div>
        {
          loadingTopFavoritedBooks ? <div className="center-align" style={{ marginTop: '1em', marginBottom: '1em'}}>
            <img src={ajaxLoader} alt="Loading..."/>
          </div> : ''
        }
        { !loadingTopFavoritedBooks ? topFavoriteBooks.length ?
          <div className="carousel" style={{ marginTop: '-5em'}}> {
            topFavoriteBooks.map((book, index) => {
            return <a className='carousel-item pointer' key={index} href={'/book/' + book.id} title={book.title}><img src={book.image || bookDefaultImage } style={{minHeight: '200px', maxHeight: '200px'}}/> </a>
          })} </div>
         : null : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topFavoriteBooks: state.bookReducer.topFavoriteBooks,
    loadingTopFavoritedBooks: state.bookReducer.loadingTopFavoritedBooks
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopFavoriteBooks: () => dispatch(fetchTopFavoriteBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
