import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

import BookList from '../adminDashBoard/BookList';
import BookBorrow from '../adminDashBoard/BookBorrow';
import BookReturn from '../adminDashBoard/BookReturn';
import RequestedBooks from './RequestedBooks';


/**
 * 
 * 
 * @class AdminDashBoard
 * @extends {Component}
 */
export class AdminDashBoard extends Component {
  /**
   * Creates an instance of AdminDashBoard.
   * @param {any} props 
   * @memberof AdminDashBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      showBookList: true,
      showBorrowRequestList: false,
      showReturnRequestList: false
    };
    this.handleShowBookList = this.handleShowBookList.bind(this);
    this.handleShowReturnRequestList = this.handleShowReturnRequestList.bind(this);
    this.handleShowBorrowRequestList = this.handleShowBorrowRequestList.bind(this);
  }

  /**
   * @returns {Object} User status
   * 
   * @memberof AdminDashBoard
   */
  componentWillMount() {
    const { role } = this.props.user
    role === 'normal' ? this.setState({ redirect: true }) : null
  }

  /**
   *@returns {void}
   *
   * @memberof AdminDashBoard
   */
  componentDidMount() {
    $('ul.tabs').tabs();
  }

  /**
   * 
   * 
   * @memberof AdminDashBoard
   * 
   * @returns {Boolean} state of which tab to be displayed
   */
  handleShowBookList() {
    this.setState({
      showBookList: true,
      showBorrowRequestList: false,
      showReturnRequestList: false
    })
  }
  /**
   * 
   * 
   * @memberof AdminDashBoard
   * 
   * @returns {Boolean} state of which tab to be displayed
   */
  handleShowBorrowRequestList() {
    this.setState({
      showBookList: false,
      showBorrowRequestList: true,
      showReturnRequestList: false
    })
  }
  /**
   * 
   * 
   * @memberof AdminDashBoard
   * 
   * @returns {Boolean} state of which tab to be displayed
   */
  handleShowReturnRequestList() {
    this.setState({
      showBookList: false,
      showBorrowRequestList: false,
      showReturnRequestList: true
    })
  }

  /**
   * 
   * 
   * @returns {object} admin board
   * @memberof AdminDashBoard
   */
  render() {
    const { redirect, showBorrowRequestList, showReturnRequestList, showBookList, } = this.state;
    return (
      redirect ? <Redirect to='/allbooks' /> :
        <div>
          <div className="row ">
            <div className="col s12 m9">
              <div className="card-panel">
                <div className="row">
                  <div className="col s12">
                    <ul className="tabs">
                      <li className="tab col s4">
                        <a
                          className="active"
                          onClick={this.handleShowBookList}>Book List</a></li>
                      <li className="tab col s4">
                        <a
                          onClick={this.handleShowBorrowRequestList}>Borrow Request</a></li>
                      <li className="tab col s4">
                        <a
                          onClick={this.handleShowReturnRequestList}>Return Request</a></li>
                    </ul>
                  </div>
                  {showBookList ? <BookList /> : ''}
                  {showBorrowRequestList ? <BookBorrow /> : ''}
                  {showReturnRequestList ? <BookReturn /> : ''}
                </div>
              </div>
            </div>
            <RequestedBooks />
          </div>
        </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    errors: state.userReducer.errors,
    user: state.userReducer.authUser,
  };
};


export default connect(mapStateToProps, null)(AdminDashBoard)