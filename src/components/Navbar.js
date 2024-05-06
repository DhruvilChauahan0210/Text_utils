import React from "react";
import PropTypes from 'prop-types';
import './styles.css'

const Navbar = ({ title, darkMode }) => {
  return (
    <>
    <nav className={`navbar navbar-expand fixed-top ${darkMode ? 'navbar-dark bg-dark shadow' : 'navbar-light bg-light shadow'}`}>
      <div className="container-fluid">
        <h1>
          {title}
        </h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active " aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired
};

Navbar.defaultProps = {
  title: 'Set title here'
};

export default Navbar;
