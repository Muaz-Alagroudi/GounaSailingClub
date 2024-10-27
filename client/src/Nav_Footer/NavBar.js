import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../logo.png";

function NavBar() {
  const [menuOpen, setMenu] = useState(false);
  const handleClick = () => {
    setMenu(!menuOpen);
  };

  return (
    <>
      <nav className="navBar">
        <div className="logo">
          <Link to="/">
            <img src={logo}></img>
          </Link>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
          <li>
            <NavLink to="/booking">Book</NavLink>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <div className={menuOpen ? "overlay" : ""} onClick={handleClick} />
        </ul>
        <div className="menu" onClick={handleClick}>
            <i class="fa-solid fa-bars"></i>
          </div>
      </nav>
    </>
  );
}

export default NavBar;
