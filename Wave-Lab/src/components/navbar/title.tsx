import React from "react";
import "./title.css";
import MyAccount from "./myAccount";
import ThemeToggleButton from "../ThemeToggleButton";

console.log(ThemeToggleButton);

interface TitleProps {
  logo: string;
  title: string;
}

const Title: React.FC<TitleProps> = ({ logo, title }) => {
  return (
    <div className="title-container">
       <div className="dark-mode">
        <ThemeToggleButton />
        </div>
      <img src={logo} alt="logo" />
      <h1>{title}</h1>
      <div className="my-account">
        <MyAccount  />
        </div>
       
    </div>
  );
};

export default Title;
