import React, { Component } from 'react';
import { connect } from 'react-redux';


/**
 * 
 * 
 * @class BookReturnListRow
 * @extends {Component}
 */
class BookReturnListRow extends Component {
  /**
   * Creates an instance of BookReturnListRow.
   * @param {any} props 
   * @memberof BookReturnListRow
   */
  constructor(props) {
    super(props);


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
        <td>{borrowedBook.title}</td>
        <td>{borrowedBook.author}</td>
        <td>{borrowedBook.returnDate}</td>
        <td>
          <a href="#allbooks">
          <i className="material-icons">
            assignment_returned
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

export default connect(mapStateToProps, null)(BookReturnListRow)