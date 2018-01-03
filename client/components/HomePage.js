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
   * Creates an instance of HomePage.
   * @param {any} props 
   * @memberof HomePage
   */
  constructor(props) {
    super(props);
    this.state = {
      books: [{
          "id": 1,
          "title": "8752626",
          "description": "a start up book",
          "image": "https://images-na.ssl-images-amazon.com/images/I/41mbSg-W6-L._SY344_BO1,204,203,200_.jpg",
          "author": "8752626",
          "upVotes": 1,
          "downVotes": 0,
          "borrowCount": 2,
          "reviews": [
              {
                  "id": 16,
                  "content": "great book",
                  "createdAt": "2017-11-19T16:40:12.637Z",
                  "user": {
                      "username": "mama",
                      "id": 10
                  }
              }
          ],
          "favorited": [
              {
                  "id": 1,
                  "createdAt": "2017-11-19T14:08:05.902Z",
                  "user": {
                      "username": "mama",
                      "id": 10
                  }
              },
              {
                  "id": 8,
                  "createdAt": "2017-12-02T05:34:14.850Z",
                  "user": {
                      "username": "solape",
                      "id": 4
                  }
              }
          ]
      },
      {
          "id": 6,
          "title": "there Was a Country",
          "description": "a book a Nigeria Civil War",
          "image": "https://images-na.ssl-images-amazon.com/images/I/41mbSg-W6-L._SY344_BO1,204,203,200_.jpg",
          "author": " chinua achebe ",
          "upVotes": 0,
          "downVotes": 0,
          "borrowCount": 5,
          "reviews": [
              {
                  "id": 8,
                  "content": "great",
                  "createdAt": "2017-11-19T15:46:17.279Z",
                  "user": {
                      "username": "mama",
                      "id": 10
                  }
              },
              {
                  "id": 1,
                  "content": "granduer",
                  "createdAt": "2017-11-17T17:03:17.370Z",
                  "user": {
                      "username": "solape",
                      "id": 4
                  }
              }
          ],
          "favorited": [
              {
                  "id": 4,
                  "createdAt": "2017-11-19T14:40:57.648Z",
                  "user": {
                      "username": "mama",
                      "id": 10
                  }
              },
              {
                  "id": 9,
                  "createdAt": "2017-12-02T05:40:59.754Z",
                  "user": {
                      "username": "solape",
                      "id": 4
                  }
              }
          ]
      }]
    };
  }

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
    const { books } = this.state;
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
          {books.map((book, index) => {
            return <div key={index}><BookCard book={book}/></div>
          })}
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