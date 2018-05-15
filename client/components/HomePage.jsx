import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Slider from '../components/common/Slider';
import Carousel from '../components/common/Carousel';
import BookCard from '../components/common/BookCard';
import { fetchPopularBooks } from '../actions/bookAction';

import leanstart from '../media/lean start.jpg';
import ajaxLoader from '../media/ajax-loader.gif';


/**
 * 
 * 
 * @export
 * @class HomePage
 * @extends {Component}
 */
class HomePage extends Component {
  // static propTypes = {
  //   ,
  // }
  /**
   * Creates an instance of HomePage.
   * @param {any} props
   * 
   * @memberof HomePage
   */
  constructor(props) {
    super(props);
    this.state = {};
  }


  /**
   * @returns {Array} most popular books array
   * 
   * @memberof HomePage
   */
  componentWillMount() {
    this.props.fetchPopularBooks();
  }

  /**
   * 
   * @returns {function} initialises the side bav
   * 
   * @memberof HomePage
   */
  // componentDidMount() {
  //   $(".button-collapse").sideNav();
  // }




  /**
  * 
  * 
  * @returns {Object} html
  * 
  * @memberof HomePage
  */
  render() {
    const { popularBooks, loadingPopularBooks } = this.props;
    return (
      <div>
        <Slider />
        <div >
          <h4 className="center-align">
            <span>Most Popular BOOKS</span>
          </h4>
        </div>
        <div className="divider" />
        {loadingPopularBooks ? 
          <div className="center-align" style={{ marginTop: '1em', marginBottom: '1em' }}>
            <img src={ajaxLoader} alt="Loading..." />
          </div> : ''}
        <div className="section">
          <div className="container">
            <div className="row">
              {!loadingPopularBooks ? popularBooks.length ?
                popularBooks.map((book) => {
                  return <div key={book.id}><BookCard book={book} /></div>
                })
                :
                <h5 className="center-align"> No books found </h5>
                : ''}
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="section similar">
          <h3 className="center-align">
            Based on readers favorites
          </h3>
          <div><Carousel /></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    popularBooks: state.bookReducer.popularBooks,
    loadingPopularBooks: state.bookReducer.loadingPopularBooks
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchPopularBooks: () => dispatch(fetchPopularBooks()),
  };
};


HomePage.propTpyes = {
  fetchPopularBooks: PropTypes.func,
  popularBooks: PropTypes.arrayOf(PropTypes.object)
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
