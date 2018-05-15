import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const presentYear = new Date().getFullYear();
  return (
    <footer className="page-footer center">
      <div className="container">
        <div className="row">
          <div className="col s12 m4 l3">
            <h5 className="white-text">My Account</h5>
            <ul className="navigation">
              <li><Link to="/" className="grey-text text-lighten-4">Home</Link></li>
              <li><Link to="/profile" className="white-text text-lighten-4">Profile</Link></li>
              <li><Link to="/favorite" className="grey-text text-lighten-4">Favorite</Link></li>
            </ul>
          </div>
          <div className="col s12 m4 l6">
            <h5 className="white-text">Hello Books</h5>
            <p className="white-text text-lighten-4">Stay Connected. Join our over 5 million users today</p>
          </div>
          <div className="col s12 m4 l3" >
            <h5 className="white-text">Be Social</h5>
            <ul className="list-inline">
              <li>
                <a href="https://facebook.com/hellobooksapp" className="social-btn" ><i className="fa fa-facebook-square fa-2x icon-style" /></a>
              </li>
              <li><a href="https://instagram.com/hellobooksapp" className="social-btn"><i className="fa fa-instagram fa-2x icon-style" /></a></li>
              <li><a href="https://twitter.com/hellobooksapp" className="social-btn" ><i className="fa fa-twitter-square fa-2x icon-style" /></a></li>
              <li><a href="https://pinterest.com/hellobooksapp" className="social-btn"><i className="fa fa-pinterest-square fa-2x icon-style" /></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright center-align">
        <div className="container">
          © {presentYear} Happy Girl World
      </div>
      </div>
    </footer>
  );
};

export default Footer;

