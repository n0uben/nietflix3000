import React from 'react';
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <ul>
        <NavLink to="/">
          Accueil
        </NavLink>
        <br/>
        <NavLink to="/dashboard">
          Tableau de bord
        </NavLink>
      </ul>
    </div>
  );
};

export default NavBar;
