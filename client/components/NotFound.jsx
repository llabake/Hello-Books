import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './common/SearchBar';

const NotFound = (props) =>
  <div className="container">
    <div style={{ marginLeft: "0px" }} id="not-found">
      <h4>This is embarassing, something's missing.</h4>
      <b>404: page not found</b>
    </div>
    <div>
      <SearchBar />
    </div>
    <div >
      <ul style={{ "textAlign": "center" }}>
        <li style={{ "display": "block" }}><Link to="/">Home</Link>
        </li>
        <li style={{ "display": "block" }}><Link to="/allbooks">Books</Link>
        </li>
        <li style={{ "display": "block" }}><Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  </div>

export default NotFound;

