import React from "react";
import NavBar from "../components/navbar/navbar";
import Piano from "../components/piano/piano";

const HomePage: React.FC = () => {
    return (
        <div>
            <NavBar profile="/profile" home="/home" landingPage="/" />
            <Piano />
        </div>
    );
};

export default HomePage;