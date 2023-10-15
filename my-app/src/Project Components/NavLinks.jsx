import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { getLoginInfo, removeLoginInfo } from '../utils/loginInfo'; // Import removeLoginInfo function

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogoutClick = () => {
    removeLoginInfo();
    navigate('/login');
  };

  const loginInfo = getLoginInfo();
  const userEmail = loginInfo?.email;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Chat.AI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {loginInfo?.token ? null : (
                <button className="nav-link" onClick={handleLoginClick}>
                  Login
                </button>
              )}
            </li>
            <li className="nav-item">
              {loginInfo?.token ? null : (
                <button className="nav-link" onClick={handleRegisterClick}>
                  Register
                </button>
              )}
              {loginInfo?.token ? (
                <div className="d-flex align-items-center">
                  <span className="nav-link">Logged in as <br></br>{userEmail}</span>
                  <button className="nav-link" onClick={handleLogoutClick}>
                    Logout
                  </button>
                </div>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
