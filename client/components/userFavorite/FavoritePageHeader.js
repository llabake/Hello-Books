import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../helpers/utils';


/**
 * 
 * 
 * @class FavoritePageHeader
 * @extends {Component}
 */
class FavoritePageHeader extends Component {

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
                <form>
                  <div className="input-field col s6 s12 ">
                    <input id="search" type="search"  placeholder="Title, author, or ISBN" required/>
                    <label className="label-icon icon-sit" htmlFor="search"><i className="material-icons">search</i></label>
                    <i className="material-icons">close</i>
                  </div>
                </form>
              </li>
              
              <li><a className="dropdown-button" href="#" data-activates="dropdown1">{user.username}<i className="material-icons right">arrow_drop_down</i></a>
                {/* <!-- Dropdown Structure --> */}
                <ul id="dropdown1" className="dropdown-content">
                  {/* <li><Link to="detail.html!">Terms and Condition</Link></li> */}
                  <li className="divider"></li>
                  <li><Link to="/signin"><i className="material-icons ">lock</i>Log Out</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default FavoritePageHeader;