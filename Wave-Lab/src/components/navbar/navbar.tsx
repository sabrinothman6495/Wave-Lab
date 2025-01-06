//import React, { useState } from "react";
import "./navbar.css";
import { Link } from "@chakra-ui/react";
import logo from "./whitewavelab.png"; 

interface NavBarProps {
  profilePage: string;
  homePage: string;
  landingPage: string;
}

const NavBar: React.FC<NavBarProps> = ({ profilePage, homePage, landingPage }) => {


  return (
    <nav>
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
      <li>
          <Link href={homePage} className="nav-link">Home</Link>
        </li>
        <li>
          <Link href={profilePage} className="nav-link">Profile</Link>
        </li>
        <li>
          <Link href={landingPage} className="nav-link">Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
