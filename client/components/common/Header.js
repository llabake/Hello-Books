import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import  { logout } from '../../actions/userAction'

import SearchBar from './SearchBar';

/**
 * 
 * 
 * @class Header
 * @extends {Component}
 */
class Header extends Component {

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
   * 
   * 
   * @returns {void}
   * @memberof Header
   */
  render () {
    const { user }  = this.props
    return (
      <header>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <NavLink to="/" 
              className="brand-logo left adjust">HelloBooks
              </NavLink>
              <a href="#" data-activates="mobile-demo" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <SearchBar />
                </li>
                { user.authenticated ? 
                  <li>
                    <NavLink to=""
                    onClick={this.handleLogout}>Log Out
                    </NavLink>
                  </li> 
                  :
                  <span>
                    <li>
                      <NavLink to="/signin">Sign In
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/signup">Sign Up
                      </NavLink>
                    </li>
                    </span>
                  }

              </ul>
              <ul className="side-nav" id="mobile-demo">
                <li>
                  <SearchBar />
                </li>
                { user.authenticated ? 
                  <li>
                    <NavLink to="" 
                    onClick={this.handleLogout}>Log Out
                    </NavLink>
                  </li> 
                  :
                  <span>
                    <li>
                      <NavLink to="/signin">Sign In
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/signup">Sign Up
                      </NavLink>
                    </li>
                  </span>
                }
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
