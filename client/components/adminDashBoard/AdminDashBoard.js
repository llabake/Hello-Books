import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

import BookList from '../adminDashBoard/BookList';
import BookBorrow from '../adminDashBoard/BookBorrow';
import BookReturn from '../adminDashBoard/BookReturn';
import Footer from '../common/Footer';
import { getUser } from '../../helpers/utils';
import { logout } from '../../actions/userAction';
import ProtectRoute from '../ProtectRoute';


/**
 * 
 * 
 * @class AdminDashBoard
 * @extends {Component}
 */
class AdminDashBoard extends ProtectRoute {
  /**
   * Creates an instance of AdminDashBoard.
   * @param {any} props 
   * @memberof AdminDashBoard
   */
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      showBookList: true,
      showBorrowRequestList: false,
      showReturnRequestList: false
    };
    this.handleLogout = this.handleLogout.bind(this);
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
    super.componentWillMount()
    const user = getUser();
    const { role }  = user 
    role === 'normal' ? this.setState({ redirect: true })  : null
  }
  /**
   * 
   * @returns {object} redirects to the home page
   * @memberof AdminDashBoard
   */
  handleLogout() {
    this.props.logout();
  }


  handleShowBookList() {
    this.setState({
      showBookList: true,
      showBorrowRequestList: false,
      showReturnRequestList: false
    })
  }

  handleShowBorrowRequestList() {
    this.setState({
      showBookList: false,
      showBorrowRequestList: true,
      showReturnRequestList: false
    })
  }

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
  render () {
  // console.log(this.props)
    const { redirect, showBorrowRequestList, showReturnRequestList, showBookList } = this.state;
    const user = getUser();
    return (
      redirect ? <Redirect to='/allbooks'/> : 
      <div>
        <header>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper">
                <a href="/" className="brand-logo left adjust">HelloBooks</a>
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/addbook">Add book</Link></li>
                {/* <li><a href="favorite.html">Favorite Books</a></li> */}
                  {/* <!-- <i className="material-icons prefix">notifications</i> --> */}
                  <li><a href="notifications.html">Notifications<span className="new badge red">4</span></a></li>
                  <li><a className="dropdown-button" href="#" data-activates="dropdown1">{user.username}<i className="material-icons right">arrow_drop_down</i></a>
                    {/* <!-- Dropdown Structure --> */}
                    <ul id="dropdown1" className="dropdown-content">
                      <li><Link to="/profile"><i className="material-icons ">account_box</i>Profile</Link></li>
                      <li><a href="#!">Terms and Condition</a></li>
                      <li className="divider"></li>
                      <li><Link to=""  onClick={this.handleLogout}><i className="material-icons ">lock</i>Log Out</Link></li>
                    </ul>
                    </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <div className="row ">
          <div className="col s12 m9">
              <div className="card-panel">
                  <div className="row">
                      <div className="col s12">
                        <ul className="tabs">
                          <li className="tab col s4"><a className="active" href="#allbooks" onClick={this.handleShowBookList}>Book List</a></li>
                          <li className="tab col s4"><a href="#accept" onClick={this.handleShowBorrowRequestList}>Borrow Request</a></li>
                          <li className="tab col s4"><a href="#return" onClick={this.handleShowReturnRequestList}>Return Request</a></li>
                        </ul>
                      </div>
                    { showBookList ? <BookList /> : '' }
                    { showBorrowRequestList ?  <BookBorrow /> : ''}
                    { showReturnRequestList ? <BookReturn /> : ''}
                  </div>
              </div>
          </div>
          <div className="col s12 m3  profile-bio ">
            <div className="card-panel responsive-table">
              <table className="bordered centered highlight ">
                <thead>
                  <tr>
                    <th>Categories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><a href="notifications.html">Finance<span className="new badge red">4</span></a></td>
                  </tr>
                  <tr>
                    <td><a href="notifications.html">Engineering<span className="new badge red">4</span></a></td>
                  </tr>
                  <tr>
                    <td><a href="notifications.html">Afrincan Literature<span className="new badge red">4</span></a></td>
                  </tr>
                  <tr>
                    <td><a href="notifications.html">Children<span className="new badge red">4</span></a></td>
                  </tr>
                  <tr>
                    <td><a href="notifications.html">Law<span className="new badge red">4</span></a></td>
                  </tr>
                  <tr>
                    <td><a href="notifications.html">Business<span className="new badge red">4</span></a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashBoard)