import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/profilePage";
import Home from "./pages/homePage";
import LandingPage from "./pages/landingPage";
import Login from "./pages/Login";
import SignUp from "./pages/signUp";

const App: React.FC = () => {
  return (
    <Router>
      
      {/* Define routes for each page */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
