import React from "react";
import { Link } from "react-router-dom";


const FavoriteBookCard = ({favoriteBook}) => {
  return (
    <div className="col s12 m6 l4">
      <div className="card">
          <div className="card-image">
            <img className="materialboxed" width="550" src={favoriteBook.book.image}/>
          </div>
          <div className="card-content">
            <span className="card-title">{favoriteBook.book.title}</span>
            <p>{favoriteBook.book.description.slice(0, 100) + '...'}</p>
            <br/>
            
            <Link className="read-more right" to={'/book/' + favoriteBook.book.id}>Read More</Link>
          </div>
          <div className="card-action">
            <ul>
              <li>
                <a>
                  <i className=" material-icons fav-icon">favorite</i>
                 
                </a>
                    <span>&nbsp;&nbsp;<strong>{favoriteBook.book.favorited.length}</strong></span>
              </li>    
              <li>
                  <a  ><i className="small material-icons up-icon">thumb_up</i></a>
                  <span>&nbsp;&nbsp;<strong>{favoriteBook.book.upVotes}</strong></span>
              </li>
              <li>
                  <a  ><i className=" small material-icons down-icon">thumb_down</i></a><span>
                  &nbsp;&nbsp;<strong>{favoriteBook.book.downVotes}</strong></span>
              </li>
              <li>
                  <a  ><i className=" small material-icons comment-icon">comment</i></a><span>
                  &nbsp;&nbsp;<strong>{favoriteBook.book.reviews.length}</strong></span>
              </li>
            </ul>
          </div>
      </div>
    </div>
  )
}

export default FavoriteBookCard;