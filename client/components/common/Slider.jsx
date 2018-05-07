import React, { Component } from 'react';



import sliderimage1 from '../../media/archive-beautiful-book-stack-256455.jpg';
import sliderimage2 from '../../media/bookcase-books-bookshelves-256541.jpg';
import sliderimage3 from '../../media/john-michael-thomson-555276-unsplash.jpg';
import sliderimage4 from '../../media/pj-accetturo-172481-unsplash.jpg';
import sliderimage5 from '../../media/joshua-coleman-623144-unsplash.jpg';
import sliderimage6 from '../../media/radu-marcusu-498248-unsplash.jpg';


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
        <div className="slider" style={{background: 'rgba(0,0,0,0.7)'}}>
          <ul className="slides">
            <li>
              <img src={sliderimage1} alt="" />
              <div className="caption left-align">
                <h1 style={{'textShadow':'0 1px 0 black',}}>Welcome to HelloBooks</h1>
                <h3 style={{'textShadow':'0 1px 0 black'}} className="light grey-text text-lighten-3">Sign Up today to enter into <br /> a whole book world</h3>
              </div>
            </li>
            <li>
              <img src={sliderimage2} alt="" />
              <div className="caption left-align">
                <h1 style={{ 'textShadow': '0 1px 0 black', 'color': '#ffffff'}} >Welcome to the HelloBooks</h1>
                <h2 className="light grey-text text-lighten-3">You can borrow a book to read <br /> and post reviews on it</h2>
              </div>
            </li>
            <li>
              <img src={sliderimage3} alt="" />
              <div className="caption left-align">
                <h3 style={{ 'textShadow': '0 1px 0 black', 'color': '#ffffff'}}>Welcome to HelloBooks</h3>
                <h5 className="light grey-text text-lighten-3">Create Reading list and <br />  suggest books to the library</h5>
              </div>
            </li>
            <li>
              <img src={sliderimage4} alt="" />
              <div className="caption left-align">
                <h3 style={{ 'textShadow': '0 1px 0 black', 'color': '#ffffff'}}>Welcome to HelloBooks</h3>
                <h5 className="light grey-text text-lighten-3">Review books and add <br />books to your favorite list</h5>
              </div>
            </li>
            <li>
              <img src={sliderimage5} alt="" />
              <div className="caption left-align">
                <h3 style={{ 'textShadow': '0 1px 0 black', 'color': '#ffffff'}}>Welcome to HelloBooks</h3>
                <h5 className="light grey-text text-lighten-3">Sign Up today to enter into a whole book world</h5>
              </div>
            </li>
            <li>
              <img src={sliderimage6} alt="" />
              <div className="caption left-align">
                <h3 style={{ 'textShadow': '0 1px 0 black', 'color': '#ffffff'}}>Welcome to HelloBooks</h3>
                <h5 className="light grey-text text-lighten-3">Sign Up today to enter into a whole book world</h5>
              </div>
            </li>

          </ul>
        </div>
      </div>
    )
  }

}