import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
// import { deleteBookAction } from '../../actions/bookAction';
import { deleteBookAction } from '../../actions/adminAction';
import ModifyBookDetail from './ModifyBookDetail';

/**
 * 
 * 
 * @class BookListRow
 * @extends {Component}
 */
class BookListRow extends Component {

  /**
   * Creates an instance of BookListRow.
   * @param {any} props 
   * @memberof BookListRow
   */
  constructor(props) {
    super(props);
    this.state = {
      bookToEdit : {},
      editBook: false

    }

    this.handleDelete= this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }


  /**
   * 
   * 
   * @param {any} event 
   * @memberof BookListRow
   * @returns {object} response message
   */
  handleDelete (event) {
    event.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this book!',
      icon: 'warning',
      buttons: [ "Noes!", "Yes, delete it!",],
      dangerMode: true,
      closeModal: false,
    })
      .then((willDelete) => {
        if(willDelete) {
          this.props.deleteBookAction(this.props.book.id)
            .then(() => {
              swal("Poof! Your book has been deleted!", {
                icon: "success",
              });
            })
            .catch(() => {
              swal("Argh! Your book escaped delete!", {
                icon: "failure",
              });
            })
        } else {
          swal("Your book is safe!");
        }
      })
  }

  /**
   * 
   * @returns {Object} book to be edited
   * @param {any} event 
   * @memberof BookListRow
   */
  handleEdit(event) {
    event.preventDefault();
    this.setState({
      bookToEdit: this.props.book ,
      editBook: true
    }, () => {
      $('#edit-book-modal').modal('open');
    })
  }



  /**
   * 
   * 
   * @returns {object}  book object
   * @memberof BookListRow
   */
  render () {
    const { bookToEdit } = this.state
    const { book, index, } = this.props
    return (
        <tr>
          <td>{index + 1}</td>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>
            <a onClick={this.handleEdit} 
              className="modal-trigger .modal-close ">
            <i className="material-icons">
              edit
            </i>
            </a>
            { this.state.editBook ? 
              <Modal id='edit-book-modal'
                >
                <ModifyBookDetail book={bookToEdit} />
              </Modal >: 
              null 
            } 
          </td>
          <td>
            <a onClick={this.handleDelete}>
            <i className="material-icons">
              delete
            </i>
            </a>
          </td>
          
        </tr>


      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    allBooks: state.adminReducer.allBooks,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBookAction: (bookId) => dispatch(deleteBookAction(bookId)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookListRow);

