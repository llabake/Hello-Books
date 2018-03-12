import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Pagination } from 'react-materialize';

import { pendingAcceptReturnRequest } from '../../actions/adminAction';
import BookReturnListRow from '../adminDashBoard/BookReturnListRow';

/**
 * 
 * 
 * @class BookReturn
 * @extends {Component}
 */
class BookReturn extends Component {

  /**
   * Creates an instance of BookReturn.
   * @param {any} props 
   * @memberof BookReturn
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

    this.handleSelectedPage = this.handleSelectedPage.bind(this)
    
  }

  /**
   * @returns {Object} A list of book pending return
   * 
   * @memberof BookReturn
   */
  componentDidMount () {
    this.props.pendingAcceptReturnRequest();
  }

  /**
   * 
   * 
   * @param {any} newProps 
   * @returns {Array} response containing borrowed books list
   * @memberof BookReturn
   */
  componentWillReceiveProps(newProps) {
    if(newProps === this.props) return;
    console.log(newProps)
    console.log(this.props)
    const { borrowedBooks } = newProps;
    console.log(borrowedBooks)
    
    const noOfBorrowedBooks = borrowedBooks.length;
    const maxItems = Math.ceil(noOfBorrowedBooks / this.state.maxItemsPerPage);
    this.setDisplayedBooks(borrowedBooks);
    if (maxItems > 1) {
      this.setState({
        maxItems: maxItems,
        showPagination: true
      })
    }
  }

  /**
   * 
   * @returns {Array} an array of books to be displayed on each page
   * @param {any} borrowedBooks 
   * @memberof BookReturn
   */
  setDisplayedBooks(borrowedBooks) {
    console.log(borrowedBooks)
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
   * @memberof BookReturn
   */
  handleSelectedPage(activePage) {
    console.log(this.props.borrowedBooks)
    this.setState({
      activePage
    }, () => this.setDisplayedBooks(this.props.borrowedBooks))

  }
  /**
   * 
   * 
   * @returns {Object} All books pending return acceptance
   * @memberof BookReturn
   */
  render () {
    const { loading,borrowedBooks } = this.props
    const { showPagination, displayedBorrowBooks } = this.state;
    return (
      <div id="return">
        { displayedBorrowBooks.length  ? 
          <div  className="col s12">
            <div className="card-panel responsive-table">
              <table className="bordered centered highlight ">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Title</th>
                    <th>Author </th>
                    <th>Date Borrowed</th>
                    <th>User</th>
                    <th>Return</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    displayedBorrowBooks ? displayedBorrowBooks.map((borrowedBook, index) => 
                      <BookReturnListRow key= {borrowedBook.id} borrowedBook={borrowedBook} index={index}/>
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
              Ooppss!!! No return request pending.
            </p>
          </div> : null
        }

        
      </div>

      
    )
  } 
}


const mapStateToProps = (state) => {
  return {
    borrowedBooks: state.adminReducer.pendingReturnedBookRequest,
    loading: state.adminReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pendingAcceptReturnRequest: () => dispatch(pendingAcceptReturnRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookReturn);