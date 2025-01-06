import React from "react";
import "./title.css";

interface TitleProps {
  logo: string;
  title: string;
}

const Title: React.FC<TitleProps> = ({ logo, title }) => {
  return (
    <div className="title-container">
      <img src={logo} alt="logo" />
      <h1>{title}</h1>
    </div>
  );
};

export default Title;
