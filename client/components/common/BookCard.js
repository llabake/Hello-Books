import React from 'react';
import { Link } from 'react-router-dom';

import leanstart from '../../media/lean start.jpg';

const BookCard = () => {
  return (
    <div className="book col s12 m3 l3">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img  src={leanstart}/>
        </div>
        <div className="card-content">
          <p><Link to="/detail" className="btn">Borrow</Link></p>
        </div>
      </div>
      <div className="book-info center-align">
        <div className="book-title"><span>Lean Start Up </span></div>
        <div className="book-author">by <span>Eric Reis</span></div>
        <div className="book-rating"> 
          <span><i className="material-icons ">star</i></span> 
          <span><i className="material-icons ">star</i></span>
          <span><i className="material-icons ">star</i></span>
          <span><i className="material-icons ">star</i></span>
          <span><i className="material-icons ">star_half</i></span>
        </div>
      </div>
    </div>
  );
}

export default BookCard;