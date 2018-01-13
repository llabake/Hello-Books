import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * 
 * 
 * @class BookBorrowListRow
 * @extends {Component}
 */
class BookBorrowListRow extends Component {
  
  /**
   * Creates an instance of BookBorrowListRow.
   * @param {any} props 
   * @memberof BookBorrowListRow
   */
  constructor(props) {
    super(props);
  }

  /**
   * 
   * 
   * @returns  {array} array of books pending return
   * @memberof BookBorrowListRow
   */
  render () {
    const { borrowedBook, index } = this.props
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{borrowedBook.book.title}</td>
        <td>{borrowedBook.book.author}</td>
        <td>{borrowedBook.borrowDate}</td>
        <td>2{borrowedBook.expectedReturnDate}</td>
        <td>
          <a href="#allbooks">
          <i className="material-icons">
            call_made
          </i>
          </a>
        </td>
    </tr>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,

  }
} 

export default connect(mapStateToProps, null)(BookBorrowListRow);