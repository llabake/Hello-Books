import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import toastMessage from '../helpers/toastMessage';

/**
 * 
 * 
 * @export
 * @param {any} Component to be rendere
 * @returns 
 */
export default function requireAuthentication(Component) {
  /**
   * 
   * 
   * @class Authenticate
   * @extends {Component}
   */
  class Authenticate extends Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired
    };
  /**
   * 
   * 
   * @returns { js } protected component 
   * @memberof Authenticate
   */
  render() {
      return (
        <div>
          {this.props.authenticated
            ? <Component {...this.props} />
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

  const mapStateToProps = ({ userReducer }) => ({
    authenticated: userReducer.authenticated,
  });

  return connect(mapStateToProps)(Authenticate);
}
