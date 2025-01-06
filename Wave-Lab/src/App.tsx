import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Profile from "./pages/profilePage";
import Home from "./pages/homePage";
import LandingPage from "./pages/Login";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <img src="https://via.placeholder.com/100" alt="Wave Lab Logo" />
        <h1>Wave Lab</h1>
      </div>
      {/* NavBar displayed on all pages */}
      <NavBar
        profilePage="/profile"
        homePage="/home"
        landingPage="/"
      />
      
      {/* Define routes for each page */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
