import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
    return (
        <header>
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
            <NavLink to="/" 
            className="brand-logo left adjust">HelloBooks
            </NavLink>
                        <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <form>
                                    <div className="input-field col s6 s12 ">
                                        <input id="search" type="search"  placeholder="Title, author, or ISBN" required/>
                                        <label className="label-icon icon-sit" htmlFor="search"><i className="material-icons">search</i></label>
                                        <i className="material-icons">close</i>
                                    </div>
                                </form>
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
                                <form>
                                    <div className="input-field col s6 s12 ">
                                        <input id="search" type="search"  placeholder="Title, author, or ISBN" required/>
                                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                        <i className="material-icons">close</i>
                                    </div>
                                </form>
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
