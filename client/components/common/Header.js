import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

import SearchBar from './SearchBar';

/**
 * 
 * 
 * @class Header
 * @extends {Component}
 */
class Header extends Component {

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
                    <NavLink to="/">Log Out
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
                    <NavLink to="/">Log Out
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

export default connect(mapStateToProps, null)(Header);
