import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';

import { pendingAcceptBorrowRequest } from '../../actions/adminAction';
import BookBorrowListRow from '../adminDashBoard/BookBorrowListRow';
import { maxPageLimit } from '../../helpers/utils';
import NothingFound from '../common/NothingFound';
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
    this.state = {
      maxItems: 2,
      showPagination: false,
      activePage: 1,
    }

    this.handleSelectedPage = this.handleSelectedPage.bind(this);
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
   * @param {any} newProps 
   * @returns {Array} response containing borrowed books list
   * @memberof BookBorrow
   */
  componentWillReceiveProps(newProps) {
    if (newProps === this.props) return;
    const { borrowedBookCount, borrowedBooks } = newProps
    const maxItems = Math.ceil(borrowedBookCount / maxPageLimit);
    if (maxItems > 1) {
      this.setState({
        maxItems: maxItems,
        showPagination: true
      })
    } else {
      this.setState({
        showPagination: false
      })
    }

    if (borrowedBookCount && borrowedBooks 
      && !borrowedBooks.length  && this.state.activePage > 1) {
      this.handleSelectedPage(this.state.activePage - 1)
    }
  }

  /**
   * @returns {void}
   * 
   * @param {any} page 
   * @memberof BookBorrow
   */
  handleSelectedPage(page) {
    this.props.pendingAcceptBorrowRequest(page, maxPageLimit);
    this.setState({
      activePage: page
    });
  }


  /**
   * 
   * 
   * @returns {Object} All borrowed books
   * @memberof BookBorrow
   */
  render() {
    const { loading, borrowedBooks, borrowedBookCount } = this.props;
    const { showPagination, activePage } = this.state;
    // FIX: empty borrowed book length
    return (
      <div id="accept">
        {borrowedBooks && borrowedBooks.length ?
          <div className="col s12">
            <div className="card-panel">
              <table className="bordered centered highlight responsive-table">
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
                    borrowedBooks ? borrowedBooks.map((borrowedBook, i) =>
                      <BookBorrowListRow
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
                  activePage={activePage} maxButtons={4}
                  onSelect={this.handleSelectedPage}
                /> :
                null}
            </div>
          </div> :
          !loading && !borrowedBookCount ? 
            <NothingFound
              text={'Ooppss!!! No pending borrowed books record found.'} />
            : null
        }
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    borrowedBooks: state.adminReducer.pendingBorrowedBookRequest,
    loading: state.adminReducer.loading,
    borrowedBookCount: state.adminReducer.borrowedBookCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pendingAcceptBorrowRequest: (page) => dispatch(pendingAcceptBorrowRequest(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookBorrow);
