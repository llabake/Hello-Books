import React from 'react';
import { Link } from 'react-router-dom';
import { bookDefaultImage } from '../../helpers/utils';

import leanstart from '../../media/lean start.jpg';

const BookCard = (props) => {
  const { book } = props;
  return (
    <div className="book col s12 m3 l3">
      <div className="card" style={{ minHeight: '250px', maxHeight: '250px' }}>
        <div className="card-image waves-effect waves-block waves-light" style={{ maxHeight: '175px', minHeight: '170px', paddingTop: '10px' }}>
          <Link to={'/book/' + book.id}>
            <img src={book.image || bookDefaultImage}
              style={{ maxHeight: '170px', minHeight: '165px' }}
              alt="Book Image"
              title={book.title} 
            />
          </Link>
        </div>
        <div className="card-content"
          style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <p><Link to={'/book/' + book.id} className="btn">Details</Link></p>
        </div>
      </div>
      <div className="book-info center-align">
        <div className="book-title"><span>{book.title} </span></div>
        <div className="book-author">by <span>{book.author}</span></div>
      </div>
    </div>

  );
}

export default BookCard;