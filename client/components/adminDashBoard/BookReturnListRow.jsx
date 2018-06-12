import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { acceptBookReturnRequest } from '../../actions/adminAction';


/**
 * 
 * 
 * @class BookReturnListRow
 * @extends {Component}
 */
export class BookReturnListRow extends Component {
  /**
   * Creates an instance of BookReturnListRow.
   * @param {any} props 
   * @memberof BookReturnListRow
   */
  constructor(props) {
    super(props);

    this.handleReturn = this.handleReturn.bind(this)

  }

  /**
   * @returns {Object} response object
   * 
   * @param {any} event 
   * @memberof BookReturnListRow
   */
  handleReturn(event) {
    event.preventDefault();
    this.props.acceptBookReturnRequest(this.props.borrowedBook.book.id, this.props.borrowedBook.user.id)
  }

  /**
   * 
   * 
   * @returns {array} array of pending borroed books
   * @memberof BookReturnListRow
   */
  render () {
    const { borrowedBook, index } = this.props
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{borrowedBook.book.title}</td>
        <td>{borrowedBook.book.author}</td>
        <td>{moment(borrowedBook.borrowDate).format('ll')}</td>
        <td>{borrowedBook.user.username}</td>
        <td id='return-book'>
          <a onClick = {this.handleReturn}
          style={{ cursor: "pointer" }}>
          <i className="material-icons">
            assignment_returned
          </i>
          </a>
        </td>
      </tr>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    errors: state.adminReducer.errors,

  }
}

export const mapDispatchToProps = dispatch => {
  return {
    acceptBookReturnRequest: (bookId, userId) => dispatch(acceptBookReturnRequest(bookId, userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookReturnListRow)