import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import requireAuthentication from './Authentication';
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
import NotFound from './NotFound';

import '../styles/style.scss';
import Header from './common/Header';
import Footer from './common/Footer';
/**
 * 
 * 
 * @export
 * @class App
 * @extends {Component}
 */
export default class App extends Component {
  /**
   *@returns {void}
   *
   * @memberof App
   */
  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 250, // Default is 300
      edge: 'left', // Choose the horizontal origin
      draggable: true // Choose whether you can drag to open on touch screens
    }
    );
    $('.slider').slider({
      full_width: true,
    }
    );
    $('.dropdown-button').dropdown({
      belowOrigin: true,
    });
    $('.tooltipped').tooltip({ delay: 50 });
    $('ul.tabs').tabs();
    $('.tooltipped').tooltip({ delay: 50 });
  }

  /**
   * 
   * 
   * @returns {object} main App
   * @memberof App
   */
  render() {
    return (
      <Router>
        <div className="body">
          <header>
            <Header />
          </header>
          <main>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/signup' component={SignUpForm} />
              <Route exact path='/signin' component={SignInForm} />
              <Route exact path='/allbooks' component={requireAuthentication(AllBooks)} />
              <Route exact path='/addbook' component={requireAuthentication(AddBook)} />
              <Route exact path='/admindashboard' component={requireAuthentication(AdminDashBoard)} />
              <Route exact path='/book/:bookId' component={requireAuthentication(SingleBook)} />
              <Route exact path='/profile' component={requireAuthentication(UserProfilePage)} />
              <Route exact path='/favorite' component={requireAuthentication(Favorite)} />
              <Route exact path='/search/:searchTerm' component={requireAuthentication(SearchResult)} />
              <Route exact path='/editprofile' component={requireAuthentication(EditProfile)} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    );
  }
}





