import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import AllBooks from './main/AllBooks'
import AddBook from './adminDashBoard/AddBook';
import SingleBook from './main/SingleBook';
import AdminDashBoard from './adminDashBoard/AdminDashBoard';
import UserProfilePage from './userDashBoard/UserProfilePage';
import Favorite from './userFavorite/Favorite';
import SearchResult from './common/SearchResult';
import EditProfile from './userDashBoard/EditProfile';

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
          <Route exact path='/signin' component={SignInForm} />
          <Route exact path='/allbooks' component={AllBooks} />
          <Route exact path='/addbook' component={AddBook} />
          <Route exact path='/admindashboard' component={AdminDashBoard} />
          <Route exact path='/book/:bookId' component={SingleBook} />
          <Route exact path='/profile' component={UserProfilePage} />
          <Route exact path='/favorite' component={Favorite}/>
          <Route exact path='/search/:searchTerm' component={SearchResult}/>
          <Route exact path='/editprofile' component={EditProfile} />
        </Switch>
        </div>
      </Router>
    );
  }
}





