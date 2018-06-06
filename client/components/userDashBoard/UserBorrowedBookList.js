import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';


import UserBorrowedBookListRow from '../userDashBoard/UserBorrowedBookListRow';
import { fetchUserBorrowedBooks } from '../../actions/userAction';
import { maxPageLimit } from '../../helpers/utils';

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
    this.state = {
      maxItems: 2,
      showPagination: false,
      activePage: 1,
    }

    this.handleSelectedPage = this.handleSelectedPage.bind(this)

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
   * 
   * 
   * @param {any} newProps 
   * @returns {Array} response containing user's borrowed book list
   * @memberof UserBorrowedBookList
   */
  componentWillReceiveProps(newProps) {
    if (newProps === this.props) return;
    const { userBorrowedBookCount } = newProps;
    const maxItems = Math.ceil(userBorrowedBookCount / maxPageLimit);
    if (maxItems > 1) {
      this.setState({
        maxItems: maxItems,
        showPagination: true
      })
    }
  }
  /**
   * @returns {void}
   * 
   * @param {any} page 
   * @memberof UserBorrowedBookList
   */
  handleSelectedPage(page) {
    this.props.fetchUserBorrowedBooks(page, maxPageLimit);
  }
  /**
   * @returns {object} void
   * 
   * @memberof UserBorrowedBookList
   */
  render() {
    const { borrowedBooks, userBorrowedBookCount } = this.props;
    const { showPagination } = this.state;
    return (
      <div>
        {borrowedBooks && borrowedBooks.length ?
          <div className="card-panel">
            <table className="bordered centered highlight responsive-table">
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
                {borrowedBooks ? borrowedBooks.map((borrowedBook, i) =>
                  <UserBorrowedBookListRow
                    key={borrowedBook.id}
                    borrowedBook={borrowedBook}
                    index={i}
                  />
                ) :
                  null
                }
              </tbody>
            </table>

            {showPagination ?
              <Pagination
                className={'center-align'}
                items={this.state.maxItems}
                activePage={1} maxButtons={4}
                onSelect={this.handleSelectedPage}
              /> :
              null}
          </div> :
          !userBorrowedBookCount ?
          <div className="card-panel row">
            <p>
              Start borrowing books today!!!
            </p>
          </div> 
          : null
        }
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    borrowedBooks: state.userReducer.borrowedBookHistory,
    userBorrowedBookCount: state.userReducer.userBorrowedBookCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserBorrowedBooks: (page) => dispatch(fetchUserBorrowedBooks(page))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserBorrowedBookList);
