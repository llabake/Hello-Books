import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


// main app
import App from '../components/App';
import store from '../store';


// import { setCurrentUser } from './actions/userActions';
// import jwtDecode from 'jwt-decode';


// const store = configureStore();

// if (localStorage.jwtToken) {
//   setAuthorizationToken(localStorage.jwtToken);
//   axios.defaults.headers.common.Authorization = localStorage.jwtToken;
//   store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
// }
render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('app'))