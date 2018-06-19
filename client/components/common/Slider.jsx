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
  
  /**
   * 
   * 
   * @memberof Slider
   * @returns {function} initialises the slider 
   */
  componentDidUpdate() {
    $('.slider').slider({
      full_width: true
    })
  }
  
  
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
              <img src={sliderimage1} alt="sliderimage1" style={{ backgroundColor: 'rgba(0,0,0,3)'}}/>
              <div className="caption left-align">
                <h1 style={{'textShadow':'0 1px 0 black',}}><strong>Welcome to HelloBooks</strong></h1>
                <h3 style={{'textShadow':'0 1px 0 black'}} className="light grey-text text-lighten-3"><strong>Sign Up today to enter into <br /> a whole book world</strong></h3>
              </div>
            </li>
            <li>
              <img src={sliderimage2} alt=""style={{ backgroundColor: 'rgba(0,0,0,3)'}} />
              <div className="caption left-align">
                <h1 style={{ 'textShadow': '0 1px 0 black', 'color': '#ffffff'}} ><strong>Welcome to the HelloBooks</strong></h1>
                <h3 className="light grey-text text-lighten-3"><strong>You can borrow a book to read <br /> and post reviews on it</strong></h3>
              </div>
            </li>
            <li>
              <img src={sliderimage3} alt=""style={{ backgroundColor: 'rgba(0,0,0,3)'}} />
              <div className="caption left-align">
                <h1 style={{ 'textShadow': '0 1px 0 black', 'color': '#ffffff'}}><strong>Welcome to HelloBooks</strong></h1>
                <h3 className="light grey-text text-lighten-3"><strong>Create Reading list and <br />  suggest books to the library</strong></h3>
              </div>
            </li>
            <li>
              <img src={sliderimage4} alt="" style={{ backgroundColor: 'rgba(0,0,0,3)'}}/>
              <div className="caption left-align">
                <h1 style={{ 'textShadow': '0 1px 0 black', 'color': '#ffffff'}}><strong>Welcome to HelloBooks</strong></h1>
                <h3 className="light grey-text text-lighten-3"><strong>Review books and add <br />books to your favorite list</strong></h3>
              </div>
            </li>
            <li>
              <img src={sliderimage5} alt="" style={{ backgroundColor: 'rgba(0,0,0,3)'}}/>
              <div className="caption left-align">
                <h1 style={{ 'textShadow': '0 1px 0 black', 'color': '#ffffff'}}><strong>Welcome to HelloBooks</strong></h1>
                <h3 className="light grey-text text-lighten-3"><strong>Sign Up today to enter into a whole book world</strong></h3>
              </div>
            </li>
            <li>
              <img src={sliderimage6} alt="" style={{ backgroundColor: 'rgba(0,0,0,3)'}}/>
              <div className="caption left-align">
                <h1 style={{ 'textShadow': '0 1px 0 black', 'color': '#ffffff'}}><strong>Welcome to HelloBooks</strong></h1>
                <h3 className="light grey-text text-lighten-3"><strong>Sign Up today to enter into a whole book world</strong></h3>
              </div>
            </li>

          </ul>
        </div>
      </div>
    )
  }

}