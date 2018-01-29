import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction';

/**
 * 
 * 
 * @class UserProfileHeader
 * @extends {Component}
 */
class UserProfileHeader extends Component {
  /**
   * Creates an instance of UserProfileHeader.
   * @param {any} props 
   * @memberof UserProfileHeader
   */
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

 
  /**
   * 
   * 
   * @returns {object} redirects to home page
   * @memberof UserProfileHeader
   */
  handleLogout() {
    this.props.logout();
    this.setState({
      redirect: true
    })
    this.redirect ? <Redirect to='/' /> : null
  }

  /**
   * 
   * 
   * @returns {object} void
   * @memberof UserProfileHeader
   */
  render () {
    const { user } = this.props
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left adjust">HelloBooks</Link>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/favorite">Favorite Books</Link></li>
              {/* <!-- <i className="material-icons prefix">notifications</i> --> */}
              <li><Link to="/notifications">Notifications<span className="new badge red">4</span></Link></li>
              <li><a className="dropdown-button" href="#" data-activates="dropdown1">{user.username}<i className="material-icons right">arrow_drop_down</i></a>
                {/* <!-- Dropdown Structure --> */}
                <ul id="dropdown1" className="dropdown-content">
                  <li><Link to="/editprofile"><i className="material-icons ">settings</i>Profile Setting</Link></li>
                  <li><a href="#!">Terms and Condition</a></li>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileHeader)
