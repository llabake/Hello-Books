import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux'

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
    this.state = {}
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
   * @returns {Object} All books pending return acceptance
   * @memberof BookReturn
   */
  render () {
    const { borrowedBooks } = this.props
    return (
      <div id="return">
        { borrowedBooks.length  ? 
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
                    borrowedBooks ? borrowedBooks.map((borrowedBook, index) => 
                      <BookReturnListRow key= {borrowedBook.id} borrowedBook={borrowedBook} index={index}/>
                    ) : 
                    null
                  }
                </tbody>
              </table>
            </div>
          </div> :
          <div className="card-panel row center-align">
            <p>
              Ooppss!!! No return request pending.
            </p>
          </div>
        }

        
      </div>

      
    )
  } 
}


const mapStateToProps = (state) => {
  return {
    borrowedBooks: state.adminReducer.pendingReturnedBookRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pendingAcceptReturnRequest: () => dispatch(pendingAcceptReturnRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookReturn);