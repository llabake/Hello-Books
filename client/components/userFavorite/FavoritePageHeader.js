import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { getUser } from '../../helpers/utils';
import { logout } from '../../actions/userAction';
import SearchBar from '../common/SearchBar';


/**
 * 
 * 
 * @class FavoritePageHeader
 * @extends {Component}
 */
class FavoritePageHeader extends Component {

  /**
   * Creates an instance of FavoritePageHeader.
   * @param {any} props 
   * @memberof FavoritePageHeader
   */
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  /**
   * @returns {object} redirects to home page
   * 
   * @memberof FavoritePageHeader
   */
  handleLogout() {
    this.props.logout();
  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof FavoritePageHeader
   */
  render () {
    const user = getUser();
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left adjust">HelloBooks</Link>
            <Link to="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {/* <!-- <i className="material-icons prefix">notifications</i> --> */}
              <li>
                <SearchBar/>
              </li>
              
              <li><a className="dropdown-button" data-activates="dropdown1">{user.username}<i className="material-icons right">arrow_drop_down</i></a>
                {/* <!-- Dropdown Structure --> */}
                <ul id="dropdown1" className="dropdown-content">
                  {/* <li><Link to="detail.html!">Terms and Condition</Link></li> */}
                  <li className="divider"></li>
                  <li><Link to=""  onClick={this.handleLogout}><i className="material-icons ">lock</i>Log Out</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePageHeader)