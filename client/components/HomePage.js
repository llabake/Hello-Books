import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Slider from '../components/common/Slider';
import Carousel from '../components/common/Carousel';
import BookCard from '../components/common/BookCard';

import leanstart from '../media/lean start.jpg';


/**
 * 
 * 
 * @export
 * @class HomePage
 * @extends {Component}
 */
export default class HomePage extends Component {
 /**
  * 
  * @returns {function} initialises the side bav
  * @memberof HomePage
  */
  componentDidMount() {
    $(".button-collapse").sideNav();
  }


  /**
  * 
  * 
  * @returns {Object} html
  * @memberof HomePage
  */
  render () {
   return (
    <div>
      <Header/>
      <Slider/>
      <div >
        <h4 className="center-align"> <span>Most Popular BOOKS
          </span>
        </h4>
      </div>
      <div className="divider"></div>
      <div className="section">
        <div className="container">
          <div className="row">
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
          </div>
          <div className="row">
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="section similar">
        <h3 className="center-align">
          Based on readers favorites
        </h3>
        <Carousel/>
      </div>
      <Footer/>
    </div>
   );
  }
}