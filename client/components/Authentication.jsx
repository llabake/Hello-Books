import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import toastMessage from '../helpers/toastMessage';
import { authenticateUser } from '../helpers/utils';

/**
 * 
 * 
 * @export
 * 
 * @param {any} ComposedComponent the child component to be rendered
 * 
 * @returns {void}
 */
export default function requireAuthentication(ComposedComponent) {
  /**
   * 
   * 
   * @class Authenticate
   * 
   * @extends {Component}
   */
  class Authenticate extends Component {
    static propTypes = {
      // authenticated: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired
    };
    /**
     * 
     * 
     * @param {any} nextProps
     * 
     * @memberof Authenticate
     * 
     * @returns {void}
     */
    componentWillReceiveProps(nextProps) {
      if (!nextProps.isAuthenticated) {
        <Redirect to={{
          pathname: '/signin',
          state: { from: this.props.location }
        }}
        />
      }
    }
    /**
     * 
     * 
     * @returns { object } returns the protected object
     * 
     * @memberof Authenticate
     */
    render() {
      const { isAuthenticated } = authenticateUser()
      return (
        <div>
          {isAuthenticated
            ? <ComposedComponent {...this.props} />
            :
            <Redirect to={{
              pathname: '/signin',
              state: { from: this.props.location }
            }}
            />
          }
          {/* toastMessage(' Please login to access this route', 'failure') */}

        </div>
      );
    }
  }


  return connect(mapStateToProps, null)(Authenticate);
}

export const mapStateToProps = (state) => {
  return {
    error: state.userReducer.error,
    user: state.userReducer.authUser,
    authenticated: state.userReducer.authenticated
  };
};