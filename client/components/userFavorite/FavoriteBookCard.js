import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { removeFromFavorite } from '../../actions/userAction';



/**
 * 
 * 
 * @class FavoriteBookCard
 * @extends {Component}
 */
class FavoriteBookCard extends Component {
  
  /**
   * Creates an instance of FavoriteBookCard.
   * @param {any} props 
   * @memberof FavoriteBookCard
   */
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);

  }

  /**
   * @returns {object} response message
   * 
   * @param {any} event 
   * @memberof FavoriteBookCard
   */
  handleDelete(event) {
    event.preventDefault();
    swal({
      title: 'Are you sure?',
      // text: 'Once deleted, you will not be able to recover this book!',
      icon: 'warning',
      buttons: [ "Noes!", "Yes, unfavorite it!",],
      dangerMode: true,
      closeModal: false,
    })
      .then((willDelete) => {
        const { favoriteBook } = this.props
        if(willDelete) {
          this.props.removeFromFavorite(favoriteBook.book.id)
            .then(() => {
              swal( `"Poof! ${favoriteBook.book.title} has been unfavorited!"`, {
                icon: "success",
              });
            })
            .catch(() => {
              swal("Argh! Your book escaped being unfavorited!", {
                icon: "failure",
              });
            })
        } else {
          swal(`' ${favoriteBook.book.title} is safe!'`)
        }
      })

  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof FavoriteBookCard
   */
  render () {
    const { favoriteBook } = this.props
    return (
      <div className="col s12 m6 l4">
        <div className="card" style={{minHeight: '650px', maxHeight: '650px'}}>
          {/* <i class="close material-icons">close</i> */}
          <div className="card-image" style={{maxHeight: '175px', minHeight: '150px', paddingTop: '10px'}}>
            <img src={favoriteBook.book.image} alt='Book Image'/>
          </div>
          <div className="card-content" style={{paddingTop: '10em'}}>
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
                <span>&nbsp;&nbsp;
                  <strong>{favoriteBook.book.favorited.length}</strong>
                </span>
              </li>    
              <li>
                <a><i className="small material-icons up-icon">thumb_up</i></a>
                <span>&nbsp;&nbsp;
                  <strong>{favoriteBook.book.upVotes}</strong>
                </span>
              </li>
              <li>
                <a><i className=" small material-icons down-icon">thumb_down</i></a>
                <span>&nbsp;&nbsp;
                  <strong>{favoriteBook.book.downVotes}</strong>
                </span>
              </li>
              <li>
                <a><i className=" small material-icons comment-icon">comment</i></a><span>
                &nbsp;&nbsp;<strong>{favoriteBook.book.reviews.length}</strong></span>
              </li>
            </ul>
            {/* <br/> */}
          </div>
          <div className="card-content">
            <span> 
              <a onClick={this.handleDelete}>Remove</a>
            </span>
          </div>
        </div>
        {/* <i class="close material-icons">close</i> */}
          
        
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    errors: state.userReducer.errors
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeFromFavorite: (bookId) => dispatch(removeFromFavorite(bookId)),
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBookCard);