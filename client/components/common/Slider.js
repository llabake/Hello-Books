import React, { Component } from 'react';

import sliderimage1 from '../../media/lib (4).jpg';
import sliderimage2 from '../../media/lib (3).jpg';
/**
 * 
 * 
 * @export
 * @class Slider
 * @extends {Component}
 */
export default class Slider extends Component {
  
  // /**
  //  * 
  //  * 
  //  * @memberof Slider
  //  * @returns {function} initialises the slider 
  //  */
  // componentDidMount() {
  //   // $('.slider').slider();
  // }
  
  /**
   * 
   * 
   * @returns {Object} html
   * @memberof Slider 
   */
  render () {
    return (
      <div className="home-page-slider">
        <div className="slider">
          <ul className="slides">
            <li>
              <img src={sliderimage1}/>
              <div className="caption left-align">
                <h3>Welcome to HelloBooks</h3>
                <h5 className="light grey-text text-lighten-3">Sign Up today to enter into a whole book world</h5>
              </div>
            </li>
            <li>
              <img src={sliderimage2}/>
              <div className="caption right-align">
                <h3>Over 100,000 Books and counting</h3>
                <h5 className="light grey-text text-lighten-3">You can borrow a book to read and even post reviews</h5>
              </div>
            </li>
            <li>
              <img src={sliderimage1}/>
              <div className="caption center-align">
                <h3>Share amazing book experiences</h3>
                <h5 className="light grey-text text-lighten-3">Review books, create reading list and add books to your favorite list</h5>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }

}