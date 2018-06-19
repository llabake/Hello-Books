import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { bookDefaultImage } from '../../helpers/utils';
import { fetchTopFavoriteBooks } from '../../actions/bookAction'
import Loader from '../common/Loader';

/**
 * 
 * 
 * @export
 * @class Carousel
 * @extends {Component}
 */
export class Carousel extends Component {

  /**
   * @returns {array} array of top favorite books
   * @memberof Carousel
   */
  componentWillMount() {
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

  /**
   * @returns {function} initialises the carousel
   * @memberof Carousel
   */
  componentDidUpdate() {
    this.initializeCarousel()
  }

  /**
   * @returns {function} intialise carousel
   * 
   * @memberof Carousel
   */
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
      setTimeout(autoplay, 4500)
    }
  }

  /**
   * 
   * 
   * @returns {Object} html
   * @memberof Carousel
   */
  render() {
    this.initializeCarousel()
    let { topFavoriteBooks, loadingTopFavoritedBooks } = this.props;

    return (
      <div id='my-carousel'>
        {
          loadingTopFavoritedBooks ? <Loader /> : ''
        }
        {!loadingTopFavoritedBooks ? topFavoriteBooks.length ?
          <div className="carousel" style={{ marginTop: '-5em' }}> {
            topFavoriteBooks.map((book, index) => {
              return <Link
                className='carousel-item pointer'
                key={index}
                to={'/book/' + book.id}
                title={book.title}
              ><img
                  src={book.image || bookDefaultImage}
                  style={{ minHeight: '200px', maxHeight: '200px' }}
                />
              </Link>
            })} </div>
          : null : null
        }
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    topFavoriteBooks: state.bookReducer.topFavoriteBooks,
    loadingTopFavoritedBooks: state.bookReducer.loadingTopFavoritedBooks
  };
};


export const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopFavoriteBooks: () => dispatch(fetchTopFavoriteBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
