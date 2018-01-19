import React, { Component } from 'react';

import profileImage from '../../media/images.png';


class UserProfileSidePanel extends Component {

  render () {

  const { user } = this.props
    
    return (
      <div className="col s12 m4 profile-bio ">
      <div className="card large hide-on-small-only ">
        <div className="row">
          <div className="card-image ">
            <img src={profileImage}/>
          </div>
        </div>
        <div className="card-content">
          <span className="card-title">User Bio</span>
          <p> <b>Name: </b> {user.username} </p>
        </div>
        <div className="card-action">
          <a href="editprofile.html">Profile Setting</a>
        </div>
      </div>
      <div className="hide-on-med-and-up"> 
        <ul className="collapsible " data-collapsible="accordion">
          <li>
            <div className="collapsible-header "><i className="material-icons">account_circle</i>Profile</div>
            <div className="collapsible-body"><span><div className="card large ">
            <div className="row">
            <div className="card-image ">
              <img src={profileImage}/>
            </div>
            </div>
            <div className="card-content">
              <span className="card-title">User Bio</span>
              <p> <b>Name: </b> Sardaunan Koimako </p>
            </div>
            <div className="card-action">
              <a href="editprofile.html">Profile Setting</a>
            </div>
            </div>.</span></div>
          </li>
        </ul>
      </div>
      
    </div>
    )
  }
}

export default UserProfileSidePanel;
