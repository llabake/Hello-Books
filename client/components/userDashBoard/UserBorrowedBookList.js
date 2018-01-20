import React, { Component } from 'react';
import { connect } from 'react-redux'

import UserBorrowedBookListRow from '../userDashBoard/UserBorrowedBookListRow';
import { fetchUserBorrowedBooks } from '../../actions/userAction';

/**
 * 
 * 
 * @class UserBorrowedBookList
 * @extends {Component}
 */
class UserBorrowedBookList extends Component {

  /**
   * Creates an instance of UserBorrowedBookList.
   * @param {any} props 
   * @memberof UserBorrowedBookList
   */
  constructor(props) {
    super(props);
    this.state = {}
  }

  /**
   * @returns {object} void
   * 
   * @memberof UserBorrowedBookList
   */
  componentDidMount() {
    this.props.fetchUserBorrowedBooks();
  }

  /**
   * @returns {object} void
   * 
   * @memberof UserBorrowedBookList
   */
  render () {
    const { borrowedBooks } = this.props
    return (
      <div>
        { borrowedBooks.length ? 
          <div className="card-panel responsive-table">
            <table className="bordered centered highlight ">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Title</th>
                  <th>Author </th>
                  <th>Date Borrowed</th>
                  <th>Return By</th>
                  <th>Return</th>
                </tr>
              </thead>
              <tbody>
                { borrowedBooks ? borrowedBooks.map((borrowedBook, i) => 
                  <UserBorrowedBookListRow key={borrowedBook.id} borrowedBook={borrowedBook} index={i}/>
                  ) :
                  null 
                }
              </tbody>
            </table>
          </div> :
          <div className="card-panel row">
            <p>
              Start borrowing books today!!!
            </p>
          </div>
        }
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    borrowedBooks: state.userReducer.borrowedBookHistory
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserBorrowedBooks: () => dispatch(fetchUserBorrowedBooks())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserBorrowedBookList);
