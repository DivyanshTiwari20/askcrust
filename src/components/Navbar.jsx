import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
          Crustdata ChatApp
        </Link>
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item" style={{ color: "white" }}>
              {/* <ThemeToggle theme={theme} onToggle={toggleTheme} /> */}
              <Link className="nav-link" to="/login" style={{ color: "white" }}>
                Login
              </Link>
            </li>
            <li className="nav-item" style={{ color: "white" }}>
              <Link
                className="nav-link"
                to="/signup"
                style={{ color: "white" }}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
