import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import NavBar from "./components/navbar/navbar";
import Profile from "./pages/profilePage";
import Home from "./pages/homePage";
import Login from "./pages/Login";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
