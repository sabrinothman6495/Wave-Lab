import React from "react";
import NavBar from "../components/navbar/navbar";
import Piano from "../components/piano/piano";
import Title from "../components/navbar/title";

const homePage: React.FC = () => {
    return (
        <div>
            <Title logo="/logo192.png" title="Wave Lab" />
            <NavBar profilePage="/profile" homePage="/home" landingPage="/" />
            <Piano />
        </div>
    );
};

export default homePage;