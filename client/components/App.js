import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import SignUpForm from './SignUpForm'

import '../styles/style.scss';
/**
 * 
 * 
 * @export
 * @class App
 * @extends {Component}
 */
export default class App extends Component {
  /**
   * 
   * 
   * @returns {object} main App
   * @memberof App
   */
  render () {
    return (
      <Router>
        <div>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/signup' component={SignUpForm} />
        </Switch>
        </div>
      </Router>
    );
  }
}





