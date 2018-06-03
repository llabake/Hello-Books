import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';

import { pendingAcceptBorrowRequest } from '../../actions/adminAction';
import BookBorrowListRow from '../adminDashBoard/BookBorrowListRow';
import { maxPageLimit } from '../../helpers/utils';
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
    if(newProps === this.props) return;
    const { borrowedBookCount } = newProps
    const maxItems = Math.ceil(borrowedBookCount/ maxPageLimit);
    if(maxItems > 1) {
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
   * @memberof BookBorrow
   */
  handleSelectedPage(page) {
    this.props.pendingAcceptBorrowRequest(page, maxPageLimit);
  }


  /**
   * 
   * 
   * @returns {Object} All borrowed books
   * @memberof BookBorrow
   */
  render () {
    const { loading, borrowedBooks, borrowedBookCount } = this.props;
    const { showPagination } = this.state;
    // FIX: empty borrowed book length
    return (
      <div id="accept">
        { borrowedBooks && borrowedBooks.length ? 
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
                    borrowedBooks ? borrowedBooks .map((borrowedBook, i) => 
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
          !loading && !borrowedBookCount ? 
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
