import React from "react";
import NavBar from "../components/navbar/navbar";
import Piano from "../components/piano/piano";
import Title from "../components/navbar/title";

const homePage: React.FC = () => {
    return (
        <div>
<<<<<<<<< Temporary merge branch 1
            <Title logo="/logo192.png" title="Wave Lab" />
            <NavBar profilePage="/profile" homePage="/home" landingPage="/" />
=========
            <NavBar profile="/profile" home="/home" landingPage="/landingPage" />
>>>>>>>>> Temporary merge branch 2
            <Piano />
        </div>
    );
};

export default homePage;