import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';

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
    this.state = {
      maxItems: 2,
      showPagination: false,
      displayedBorrowBooks: [],
      activePage: 1,
      maxItemsPerPage: 2,
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
    if(newProps === this.props) return;
    const { borrowedBooks } = newProps
    console.log(borrowedBooks)
    const noOfBorrowedBooks = borrowedBooks.length;
    const maxItems = Math.ceil(noOfBorrowedBooks/ this.state.maxItemsPerPage);
    this.setDisplayedBorrowBooks(borrowedBooks);
    if(maxItems > 1) {
      this.setState({
        maxItems: maxItems,
        showPagination: true
      })
    }
  }

  /**
   * @returns {Array} a list of borrowed books to be displayed on each page
   * 
   * @param {any} borrowedBooks 
   * @memberof BookBorrow
   */
  setDisplayedBorrowBooks(borrowedBooks) {
    const displayedBorrowBooks = borrowedBooks.slice((this.state.activePage - 1) *
    this.state.maxItemsPerPage,
    (this.state.activePage) * this.state.maxItemsPerPage);
    this.setState({
      displayedBorrowBooks
    })
  }

  /**
   * @returns {void}
   * 
   * @param {any} activePage 
   * @memberof BookBorrow
   */
  handleSelectedPage(activePage) {
    this.setState({
      activePage
    }, () => this.setDisplayedBorrowBooks(this.props.borrowedBooks))
  }


  /**
   * 
   * 
   * @returns {Object} All borrowed books
   * @memberof BookBorrow
   */
  render () {
    const { loading, borrowedBooks } = this.props;
    const { showPagination, displayedBorrowBooks } = this.state;
    return (
      <div id="accept">
        { displayedBorrowBooks.length ? 
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
                    displayedBorrowBooks  ? displayedBorrowBooks .map((borrowedBook, i) => 
                      <BookBorrowListRow key={borrowedBook.id} borrowedBook={borrowedBook} index={i} />
                    ) :
                    null
                  }
                </tbody>
              </table>
              { showPagination ?
                <Pagination
                  className={'center-align'}
                  items={this.state.maxItems}
                  activePage={1} maxButtons={4}
                  onSelect={this.handleSelectedPage}
                /> :
                null }
            </div>
          </div> :
          !loading && !borrowedBooks.length ? 
          <div className="card-panel row center-align">
            <p>
              Ooppss!!! No pending borrowed books record found.
            </p>
          </div> : null
        }
      </div>

    )
  } 
}

const mapStateToProps = (state) => {
  return {
    borrowedBooks : state.adminReducer.pendingBorrowedBookRequest,
    loading: state.adminReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pendingAcceptBorrowRequest: () => dispatch(pendingAcceptBorrowRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookBorrow);
