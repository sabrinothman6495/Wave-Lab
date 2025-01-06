import React from "react";
import "./navbar.css";
import { Link } from "@chakra-ui/react";

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
          <Link href={profilePage}>Profile</Link>
        </li>
        <li>
          <Link href={homePage}>Home</Link>
        </li>
        <li>
          <Link href={landingPage}>Landing Page</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
