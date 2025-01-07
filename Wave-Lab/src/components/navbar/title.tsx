import React from "react";
import "./title.css";
import MyAccount from "./myAccount";
import ThemeToggleButton from "../ThemeToggleButton";
import logo from "../../assets/blackwavelab.png";
console.log(ThemeToggleButton);

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="title-container">
       <div className="dark-mode">
        <ThemeToggleButton />
        </div>
        <img src={logo} alt="logo" className="logo" />
      <h1>{title}</h1>
      <div className="my-account">
        <MyAccount  />
        </div>
       
    </div>
  );
};

export default Title;
