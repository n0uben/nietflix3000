import React from 'react';
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="navbar-item">
            <NavLink to="/">
              <div className="nav-link">Accueil</div>
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/dashboard">
              <div className="nav-link">Tableau de bord</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
