import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux'


import { pendingAcceptBorrowRequest } from '../../actions/adminAction';
import BookBorrowListRow from '../adminDashBoard/BookBorrowListRow';
/**
 * 
 * 
 * @class BookBorrow
 * @extends {Component}
 */
class BookBorrow extends Component {

  /**
   * Creates an instance of BookBorrow.
   * @param {any} props 
   * @memberof BookBorrow
   */
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  /**
   * @returns {object} a list of books pending borro accept
   * 
   * @memberof BookBorrow
   */
  componentDidMount() {
    this.props.pendingAcceptBorrowRequest();
  }

  /**
   * 
   * 
   * @returns {Object} All borrowed books
   * @memberof BookBorrow
   */
  render () {
    const { borrowedBooks , } = this.props;
    return (
      <div id="accept">
        { borrowedBooks.length  ? 
          <div className="col s12">
            <div className="card-panel responsive-table">
              <table className="bordered centered highlight ">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Title</th>
                    <th>Author </th>
                    <th>Quantity</th>
                    <th>Borrow Count</th>
                    <th>User</th>
                    <th>Accept Borrow</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    borrowedBooks  ? borrowedBooks .map((borrowedBook, i) => 
                      <BookBorrowListRow key={borrowedBook.id} borrowedBook={borrowedBook} index={i} />
                    ) :
                    null
                  }
                </tbody>
              </table>
            </div>
          </div> :
          <div className="card-panel row center-align">
            <p>
              Ooppss!!! No pending borrowed books record found.
            </p>
          </div>
        }
      </div>

    )
  } 
}

const mapStateToProps = (state) => {
  return {
    borrowedBooks : state.adminReducer.pendingBorrowedBookRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pendingAcceptBorrowRequest: () => dispatch(pendingAcceptBorrowRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookBorrow);
