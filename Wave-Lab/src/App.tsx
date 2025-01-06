import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Login from "./pages/Login";
import SignUp from "./pages/signUp";
import HomePage from "./pages/homePage";
import Profile from "./pages/profilePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/profile" element={<Profile  />} />
      </Routes>
    </Router>
  );
};

export default App;

