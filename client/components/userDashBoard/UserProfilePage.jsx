
import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux'

import Footer from '../common/Footer';
import UserProfileSidePanel from '../userDashBoard/UserProfileSidePanel';
import UserBorrowedBookList from '../userDashBoard//UserBorrowedBookList';
import { getUserProfile } from '../../actions/userAction';

/**
 * 
 * 
 * @class UserProfilePage
 * @extends {Component}
 */
export class UserProfilePage extends Component {
  /**
   * Creates an instance of UserProfilePage.
   * @param {any} props 
   * @memberof UserProfilePage
   */
  constructor(props) {
    super(props)
  }

  /**
   * @returns {void}
   * 
   * @memberof UserProfilePage
   */
  componentDidMount() {
    this.props.getUserProfile()
  }
  /**
   * 
   * 
   * @returns {object} void
   * @memberof UserProfilePage
   */
  render () {
    const { user } = this.props;
    return (
      <div>
        <div className="row ">
            <UserProfileSidePanel user={user}/>
            <div className="col s12 m8">
              <UserBorrowedBookList />
            </div>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    user: state.userReducer.authUser
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: () => dispatch(getUserProfile()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (UserProfilePage);
