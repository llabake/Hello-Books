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

  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 250, // Default is 300
      edge: 'left', // Choose the horizontal origin
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
  // $('.carousel').carousel({
  //   dist: 0, // Perspective zoom. 
  //   shift: 0, // Set the spacing of the center item.
  //   padding: 50, // Set the padding between non center items.
  //   indicators: true, // Show indicators. Default is false
  // });
  // autoplay()
  // function autoplay() {
    // $('.carousel').carousel('next');
    // setTimeout(autoplay, 4500)}

    $('.slider').slider();
    $('.dropdown-button').dropdown();
    $('.tooltipped').tooltip({ delay: 50 });
    $('.tabs').tabs();

    // $('.modal').modal();
    // $('select').material_select();
  
  }
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





