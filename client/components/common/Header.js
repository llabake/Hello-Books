import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <a href="index.html" className="brand-logo left adjust">HelloBooks</a>
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
                            <li><a href="signin.html">Sign In</a></li>
                            <li><a href="signup.html">Sign Up</a></li>
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
                            <li><a href="#popular-books">Popular Books</a></li> 
                            <li><a href="signin.html">Sign In</a></li>
                            <li><a href="signup.html">Sign Up</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
