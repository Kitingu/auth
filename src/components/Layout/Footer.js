// Importing Libraries
import React from 'react';

// Importing Style
import './Footer.css';

function Footer() {
  return (
      <React.Fragment>
      <footer id="footer" className="footer-niceadmin">
        <div className="copyright">
          &copy; Copyright <strong><span>Proto Energy</span></strong>. All Rights Reserved
        </div>
      </footer>
      <a href="/#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </React.Fragment>
  );
}

export default Footer;