import React from "react";
import "./title.css";
import MyAccount from "./myAccount";

interface TitleProps {
  logo: string;
  title: string;
}

const Title: React.FC<TitleProps> = ({ logo, title }) => {
  return (
    <div className="title-container">
      <img src={logo} alt="logo" />
      <h1>{title}</h1>
      <div className="my-account">
        <MyAccount  />
        </div>
    </div>
  );
};

export default Title;
