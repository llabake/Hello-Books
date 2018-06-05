import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../actions/userAction'

import SearchBar from './SearchBar';

/**
 *
 * @param {*} { user, authenticated, handleLogout }
 * 
 * @returns {JSX} side nav
 */
const SideNav = ({ user, authenticated, handleLogout }) => {
  /**
   *
   * @param {*} normalUser
   * 
   * @returns {Object} auhtnticated user nav bar
   * 
   * @memberof SideNav
   */
  const renderAuthUserSideNavigation = (normalUser) => {
    return (
      <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header">{normalUser.username}
              <i class="material-icons">account_circle</i>
              <i class="material-icons right">arrow_drop_down</i>
            </a>
            <div class="collapsible-body">
              <ul>
                <li><Link to="/allbooks">All Books</Link></li>
                <li><Link to="/favorite">Favorite Books</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li className="divider"></li>
                <li>
                  <NavLink to=""
                    onClick={handleLogout}>
                    <i className="material-icons ">lock</i>Log Out
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    )
  }

  /**
   *
   * @param {*} adminUser
   * 
   * @returns {Object} admin navigation side bar
   * 
   * @memberof SideNav
   */
  const renderAdminSideNavigation = (adminUser) => {
    if (user.role === 'admin') {
      return (
        <li class="no-padding">
          <ul class="collapsible collapsible-accordion">
            <li>
              <a class="collapsible-header">{adminUser.username}
                <i class="material-icons">account_circle</i>
                <i class="material-icons right">arrow_drop_down</i>
              </a>
              <div class="collapsible-body">
                <ul>
                  <li><Link to="/admindashboard">Admin Dashboard</Link></li>
                  <li><Link to="/favorite">Favorite Books</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/addbook">Add Book</Link></li>
                  <li><Link to="/allbooks">All Books</Link></li>
                  <li className="divider"></li>
                  <li>
                    <Link to="" onClick={handleLogout}>
                      <i className="material-icons ">lock</i>Log Out
                  </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      )
    }
  }

  const renderSideNav = (authUser) => authUser.role === 'admin'
    ? renderAdminSideNavigation(user)
    : renderAuthUserSideNavigation(user)

  return (
    <ul id="mobile-demo" class="side-nav">
      <li>
        <SearchBar />
      </li>
      {authenticated && user
        ? renderSideNav(user)
        :
        <li class="no-padding">
          <ul class="collapsible collapsible-accordion">
            <li>
              <a class="collapsible-header">Hi, User
            <i class="material-icons">account_circle</i>
                <i class="material-icons right">arrow_drop_down</i>
              </a>
              <div class="collapsible-body">
                <ul>
                  <li><Link to="/signup">Sign Up</Link></li>
                  <li><Link to="/signin">Sign In</Link></li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      }
    </ul>
  )
}

export default SideNav;