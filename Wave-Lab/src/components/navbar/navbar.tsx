import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom
import "./navbar.css";

interface NavBarProps {
  profilePage: string;
  homePage: string;
  landingPage: string;
}

const NavBar: React.FC<NavBarProps> = ({ profilePage, homePage, landingPage }) => {
  return (
    <nav>
      <ul>
        <li>
          {/* Use RouterLink for internal navigation */}
          <RouterLink to={profilePage}>Profile</RouterLink>
        </li>
        <li>
          <RouterLink to={homePage}>Home</RouterLink>
        </li>
        <li>
          <RouterLink to={landingPage}>Landing Page</RouterLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
