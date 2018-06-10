import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { returnBookAction } from '../../actions/userAction';

/**
 * 
 * 
 * @class UserBorrowedBookListRow
 * @extends {Component}
 */
class UserBorrowedBookListRow extends Component {

  /**
   * Creates an instance of UserBorrowedBookListRow.
   * @param {any} props 
   * @memberof UserBorrowedBookListRow
   */
  constructor(props) {
    super(props);
    this.handleReturn = this.handleReturn.bind(this);
  }

  /**
   * @returns {void}
   * 
   * @param {any} event 
   * @memberof UserBorrowedBookListRow
   */
  handleReturn(event) {
    event.preventDefault();
    this.props.returnBookAction(this.props.borrowedBook.bookId);
  }

  /**
   * @returns {object} borrowedBook object
   * 
   * @memberof UserBorrowedBookListRow
   */
  render() {
    const { borrowedBook, index } = this.props
    return (
      <tr>
        <td>{index + 1}</td>
        <td>
          <Link to={'/book/' + borrowedBook.book.id}>
            {borrowedBook.book.title}
          </Link>
        </td>
        <td>{borrowedBook.book.author}</td>
        <td>{borrowedBook.borrowDate ?
          moment(borrowedBook.borrowDate).format('LL') :
          borrowedBook.borrowDate} </td>
        <td>{borrowedBook.expectedReturnDate ?
          moment(borrowedBook.expectedReturnDate).format('ll') :
          borrowedBook.expectedReturnDate}</td>
        <td>
          {borrowedBook.returnStatus == 'accepted' ? 'Returned' :
            <a
              className={`btn-flat 
              ${borrowedBook.returnStatus === 'pending' ? 'disabled' : null}`}
              onClick={this.handleReturn}>
              <i className="material-icons">
                assignment_returned
            </i>
            </a>
          }
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    returnBookAction: (bookId) => dispatch(returnBookAction(bookId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBorrowedBookListRow);
