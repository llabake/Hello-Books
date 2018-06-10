import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { removeFromFavorite } from '../../actions/userAction';
import { bookDefaultImage } from "../../helpers/utils";

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
      buttons: ["Noes!", "Yes, unfavorite it!",],
      dangerMode: true,
      closeModal: false,
    })
      .then((willDelete) => {
        const { favoriteBook } = this.props
        if (willDelete) {
          this.props.removeFromFavorite(favoriteBook.book.id)
            .then(() => {
              swal(`"Poof! ${favoriteBook.book.title} has been unfavorited!"`, {
                icon: "success",
              });
              this.props.handleSelectedPage(this.props.page)
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
  render() {
    const { favoriteBook } = this.props
    return (
      <div className="col s12 m6 l4">
        <div className="card favorite-card">
          {/* <i class="close material-icons">close</i> */}
          <div className="card-image"
            style={{ maxHeight: '175px', minHeight: '150px', paddingTop: '10px' }}
            title={favoriteBook.book.title}>
            <Link to={'/book/' + favoriteBook.book.id}>
              <img style={{ maxHeight: '250px' }}
                src={favoriteBook.book.image || bookDefaultImage}
                alt='Book Image' /></Link>
          </div>
          <div className="card-content" style={{ paddingTop: '7em' }}>
            <span className="card-title truncate"
              title={favoriteBook.book.title}>
              {favoriteBook.book.title}</span>
            <p className="truncate"
              title={favoriteBook.book.description}
              style={{ height: '1em', minHeight: '2em' }}>
              {favoriteBook.book.description}</p>
            <br />
            <Link className="read-more right"
              to={'/book/' + favoriteBook.book.id}>Read More</Link>
          </div>
          <div className="card-action">
            <ul>
              <li>
                <a style={{ marginRight: '0px'}}>
                  <i className=" material-icons fav-icon">favorite</i>
                </a>
                <span>&nbsp;
                  <strong>{favoriteBook.book.favorited.length}</strong>
                </span>
              </li>
              <li>
                <a
                  style={{ marginRight: '0px', marginLeft: '1.5em' }}>
                  <i className="small material-icons up-icon">thumb_up</i>
                </a>
                <span>&nbsp;
                  <strong >{favoriteBook.book.upVotes}</strong>
                </span>
              </li>
              <li>
                <a style={{ marginRight: '0px', marginLeft: '1.5em' }}>
                  <i className="small material-icons down-icon">thumb_down</i>
                </a>
                <span>&nbsp;&nbsp;
                  <strong>{favoriteBook.book.downVotes}</strong>
                </span>
              </li>
              <li>
                <a style={{ marginRight: '0px', marginLeft: '1.5em' }}>
                  <i className="small material-icons comment-icon">comment</i>
                </a>
                <span>
                  &nbsp;&nbsp;<strong>{favoriteBook.book.reviews.length}</strong>
                </span>
              </li>
            </ul>
            {/* <br/> */}
          </div>
          <div className="card-content" style={{ paddingTop: '0px', cursor: 'pointer' }}>
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