import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Pagination } from 'react-materialize';

import { pendingAcceptReturnRequest } from '../../actions/adminAction';
import BookReturnListRow from '../adminDashBoard/BookReturnListRow';
import { maxPageLimit } from '../../helpers/utils';
import NothingFound from '../common/NothingFound';

/**
 * 
 * 
 * @class BookReturn
 * @extends {Component}
 */
export class BookReturn extends Component {

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
      activePage: 1,
    }

    this.handleSelectedPage = this.handleSelectedPage.bind(this)

  }

  /**
   * @returns {Object} A list of book pending return
   * 
   * @memberof BookReturn
   */
  componentDidMount() {
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
    if (newProps === this.props) return;
    const { returnedBookCount, borrowedBooks } = newProps;
    const maxItems = Math.ceil(returnedBookCount / maxPageLimit);
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
    if (returnedBookCount && borrowedBooks
      && !borrowedBooks.length && this.state.activePage > 1) {
      this.handleSelectedPage(this.state.activePage - 1)
    }
  }


  /**
   * @returns {void}
   * 
   * @param {any} page 
   * @memberof BookReturn
   */
  handleSelectedPage(page) {
    this.props.pendingAcceptReturnRequest(page, maxPageLimit);
    this.setState({
      activePage: page
    });
  }
  /**
   * 
   * 
   * @returns {Object} All books pending return acceptance
   * @memberof BookReturn
   */
  render() {
    const { loading, borrowedBooks, returnedBookCount } = this.props
    const { showPagination, activePage } = this.state;
    return (
      <div id="return">
        {borrowedBooks && borrowedBooks.length ?
          <div className="col s12">
            <div className="card-panel">
              <table className="bordered centered highlight responsive-table">
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
                    borrowedBooks ? borrowedBooks.map((borrowedBook, index) =>
                      <BookReturnListRow
                        key={borrowedBook.id}
                        borrowedBook={borrowedBook}
                        index={index}
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
          !loading && !returnedBookCount ?
            <NothingFound
              text={'Ooppss!!! No return request pending.'} />
            : null
        }
      </div>


    )
  }
}


export const mapStateToProps = (state) => {
  return {
    borrowedBooks: state.adminReducer.pendingReturnedBookRequest,
    loading: state.adminReducer.loading,
    returnedBookCount: state.adminReducer.returnedBookCount
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    pendingAcceptReturnRequest: (page) => dispatch(pendingAcceptReturnRequest(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookReturn);