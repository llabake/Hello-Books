import React, { Component } from 'react';

import leanstart from '../../media/lean start.jpg';
import paul from '../../media/paul.jpg';
import lola from '../../media/lola.jpg';
import manda from '../../media/manda.jpg';
import huges from '../../media/huges.jpg';

/**
 * 
 * 
 * @export
 * @class Carousel
 * @extends {Component}
 */
export default class Carousel extends Component {

  /**
  * 
  * @returns {function} initialises the carousel
  * @memberof Carousel
  */
  componentDidMount() {
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


    return (
      <div className="carousel">
      <a className="carousel-item" href="detail.html"><img src={leanstart}/></a>
      <a className="carousel-item" href="detail.html"><img src={manda}/></a>
      <a className="carousel-item" href="detail.html"><img src={paul}/></a>
      
      <a className="carousel-item" href="detail.html"><img src={lola}/></a>
      <a className="carousel-item" href="detail.html"><img src={manda}/></a>
      <a className="carousel-item" href="detail.html"><img src={huges}/></a>
      
      <a className="carousel-item" href="detail.html"><img src={leanstart}/></a>
      <a className="carousel-item" href="detail.html"><img src={paul}/></a>
      <a className="carousel-item" href="detail.html"><img src={lola}/></a>
    </div>
    )
  }
}