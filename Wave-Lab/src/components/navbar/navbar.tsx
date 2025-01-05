import React from "react";

interface navBar {
    profile: string;
    home: string;
    landingPage: string;
}

const NavBar: React.FC<navBar> = ({ profile, home, landingPage }) => {
    return (
        <nav>
            <ul>
                <li>
                    <a href={profile}>Profile</a>
                </li>
                <li>
                    <a href={home}>Home</a>
                </li>
                <li>
                    <a href={landingPage}>Landing Page</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;