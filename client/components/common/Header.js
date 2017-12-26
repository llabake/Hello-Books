import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import SearchBar from './SearchBar';

const Header = () => {
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
              <li>
                <NavLink to="/signin">Sign In
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up
                </NavLink>
              </li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li>
                <SearchBar />
              </li>
              <li>
                <Link to="#popular-books">Popular Books
                </Link></li> 
              <li>
                <NavLink to="/signin">Sign In
                </NavLink></li>
              <li>
                <NavLink to="/signup">Sign Up
                </NavLink></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
