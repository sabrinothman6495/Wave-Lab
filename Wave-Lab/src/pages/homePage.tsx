import React from "react";
import Piano from "../components/piano/piano";
import Title from "../components/navbar/title";
{/*import NavBar from "../components/navbar/navbar"; */}

const homePage: React.FC = () => {
    return (
        <div>
            <Title logo="https://via.placeholder.com/100" title="Wave Lab" />
            {/* <NavBar profilePage="/Profile" homePage="/homePage" landingPage="/" /> */}
            <Piano />
        </div>
    );
};

export default homePage;