import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import profileImage from '../../media/images.png';

/**
 * 
 * 
 * @class UserProfileSidePanel
 * @extends {Component}
 */
export class UserProfileSidePanel extends Component {

  /**
   * Creates an instance of UserProfileSidePanel.
   * @param {any} props 
   * @memberof UserProfileSidePanel
   */
  constructor(props) {
    super(props);
    this.state = {}

  }


  /**
   * 
   * 
   * @returns {void}
   * @memberof UserProfileSidePanel
   */
  render() {
    const { user, profile } = this.props;

    return (
      <div className="col s12 m4 profile-bio ">
        <div className="card large hide-on-small-only ">
          <div className="row">
            <div className="card-image">
              {profile.image == undefined ? '' :
                <img
                  src={profile.image || profileImage}
                  className="responsive-img"
                  style={{ marginTop: 34 }}
                />
              }
            </div>
          </div>
          <div className="card-action">
            <Link id="edit-user-profile" to="/editprofile" >Profile Setting</Link>
          </div>
        </div>
        <div className="hide-on-med-and-up">
          <ul className="collapsible " data-collapsible="accordion">
            <li>
              <div className="collapsible-header ">
                <i className="material-icons">account_circle
            </i>Profile
            </div>
              <div className="collapsible-body"><span><div className="card large">
                <div className="row">
                  <div className="card-image ">
                    {profile.image == undefined ? '' :
                      <img src={profile.image || profileImage} style={{ borderRadius: '50%' }} />
                    }
                  </div>
                </div>
                <div className="card-content">
                  <span className="card-title">User Bio</span>
                  <p> <b>Name: </b> {user.username} </p>
                </div>
                <div className="card-action">
                  <Link to="/editprofile" >Profile Setting</Link>
                </div>
              </div>.</span></div>
            </li>
          </ul>
        </div>

      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    profile: state.userReducer.profile,
  }
};

export default connect(mapStateToProps, null)(UserProfileSidePanel);
