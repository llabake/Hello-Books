import React from 'react';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Stay Connected</h5>
            <p className="grey-text text-lighten-4">Join our over 5 million users today.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <ul>
              <li>
                <a href="http://facebook.com/hellobooksapp"> <i className="fa fa-facebook"></i></a>
              </li>
              &emsp;&emsp;
              <li>
                <a href="http://twitter.com/hellobooksapp"> <i className="fa fa-twitter"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2017 Happy Girl World
        </div>
      </div>
    </footer>
  );
};

export default Footer;

