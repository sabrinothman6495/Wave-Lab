import React from "react";
import { useNavigate } from "react-router-dom";
import "./myAccount.css";

const MyAccount: React.FC = () => {
  const navigate = useNavigate();

  const handleMyAccountClick = () => {
    navigate("/profile");
  };

  return (
    <div>
      <div className="my-account-container">
        <button onClick={handleMyAccountClick}>My Account</button>
      </div>
    </div>
  );
};

export default MyAccount;

