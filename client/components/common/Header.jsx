import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../actions/userAction'

import SearchBar from './SearchBar';
import SideNav from './SideNav';

/**
 * 
 * 
 * @class Header
 * @param {any} user
 * @extends {Component}
 */
export class Header extends Component {

  /**
   * Creates an instance of Header.
   * @memberof Header
   */
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  /**
 * @returns {object} redirects to home page
 * 
 * @memberof Header
 */
  handleLogout() {
    this.props.logout();
  }

  /**
   * @returns {void}
   * 
   * @memberof Header
   */
  componentDidMount() {
    // Initialize materialize dropdown class
    $('.dropdown-button').dropdown({
      belowOrigin: true,
    });
    $('.button-collapse').sideNav({
      closeOnClick: true,
      draggble: true
    })
    $('.collapsible').collapsible();
  }

  /**
   * @returns {void}
   * 
   * @memberof Header
   */
  componentDidUpdate() {
    // Initialize materialize dropdown class
    $('.dropdown-button').dropdown({
      belowOrigin: true,
    });
  }



  /**
   * 
   * 
   * @param {any} user 
   * @returns {object} admin navigation bar
   * @memberof Header
   */
  renderAdminNavigation(user) {
    if (user.role === "admin") {
      return (
        <li><a className="dropdown-button" id="adminusername" data-activates="dropdown1">{user.username}
          <i className="material-icons large left">account_circle</i>
          <i className="material-icons right">arrow_drop_down</i></a>
          <ul id="dropdown1" className="dropdown-content">
            <li><Link to="/admindashboard">Admin Dashboard</Link></li>
            <li><Link to="/favorite">Favorite Books</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/addbook">Add Book</Link></li>
            <li><Link to="/allbooks">All Books</Link></li>
            <li className="divider"></li>
            <li><Link to=""  id='adminLogout' onClick={this.handleLogout}><i className="material-icons ">lock</i>Log Out</Link></li>
          </ul>
        </li>
      )
    }
  }


  /**
   * 
   * @returns {object} index navigation bar
   * 
   * @memberof Header
   */
  renderIndexNavigation() {
    return (
      <li>
        <a className="dropdown-button" data-activates="dropdown1">Hi, User
        <i className="material-icons large left">account_circle</i>
          <i className="material-icons right">arrow_drop_down</i>
        </a>
        <ul id="dropdown1" className="dropdown-content">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
          <li className="divider"></li>
        </ul>
      </li>
    )

  }

  /**
   * 
   * @param {any} user
   * 
   * @returns {object} authenticated user nav bar
   * 
   * @memberof Header
   */
  renderAuthUserNavigation(user) {
    return (
      <li>
        <a className="dropdown-button" id="username" data-activates="dropdown1">{user.username}
          <i className="material-icons large left">account_circle</i>
          <i className="material-icons right">arrow_drop_down</i>
        </a>

        <ul id="dropdown1" className="dropdown-content">
          <li><Link to="/allbooks">All Books</Link></li>
          <li><Link to="/favorite">Favorite Books</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li className="divider"></li>
          <li>
            <NavLink to=""
            id='userLogout'
              onClick={this.handleLogout}>Log Out
          </NavLink>
          </li>
        </ul>
      </li>
    )
  }

  /**
   *
   * @memberof Header
   * 
   * @param {any} user
   * 
   * @returns {Object} nav bar based on user's role
   */
  renderNavigation = (user) => user.role === "admin"
    ? this.renderAdminNavigation(user)
    : this.renderAuthUserNavigation(user)

  /**
   * 
   * @returns {void}
   * 
   * @memberof Header
   */
  render() {
    const { user, authenticated } = this.props
    return (
      <header>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <NavLink
                to="/"
                className="brand-logo left adjust">HelloBooks
              </NavLink>
              <a href="#" data-activates="mobile-demo" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <SearchBar />
                </li>
                {
                  authenticated && user
                    ? this.renderNavigation(user) :
                    this.renderIndexNavigation()
                }
              </ul>
            </div>
          </nav>
        </div>
        <SideNav
          user={user}
          handleLogout={this.handleLogout}
          authenticated={authenticated}
        />
      </header>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.userReducer.authUser,
    authenticated: state.userReducer.authenticated,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
