import React, { useState } from "react";
import Piano from "../components/piano/piano";
import "./homePage.css";

const HomePage: React.FC = () => {
    const [isInstrumentsOpen, setIsInstrumentsOpen] = useState(false);
    const [isLevelsOpen, setIsLevelsOpen] = useState(false);

    const toggleInstruments = () => {
        setIsInstrumentsOpen(!isInstrumentsOpen);
    };

    const toggleLevels = () => {
        setIsLevelsOpen(!isLevelsOpen);
    };

    return (
        <div className="homepage-container">
            {/* Navbar */}
            <nav className="navbar">
                
            

            {/* Dropdown Buttons */}
            <div className="dropdown-container-intrument">
                <div className={`dropdown ${isInstrumentsOpen ? "show" : ""}`}>
                    <button className="dropbtn" onClick={toggleInstruments}>
                        Instruments
                    </button>
                    {isInstrumentsOpen && (
                        <div className="dropdown-content">
                            <label>
                                <input type="checkbox" name="piano" /> Piano
                            </label>
                            <label>
                                <input type="checkbox" name="guitar" /> Guitar
                            </label>
                            <label>
                                <input type="checkbox" name="violin" /> Violin
                            </label>
                            <label>
                                <input type="checkbox" name="flute" /> Flute
                            </label>
                        </div>
                    )}
                </div>
                </div>
                <div className="dropdown-container-levels">
                <div className={`dropdown ${isLevelsOpen ? "show" : ""}`}>
                    <button className="dropbtn" onClick={toggleLevels}>
                        Levels
                    </button>
                    {isLevelsOpen && (
                        <div className="dropdown-content">
                            <label>
                                Bass:
                                <input type="range" min="0" max="100" />
                            </label>
                            <label>
                                Treble:
                                <input type="range" min="0" max="100" />
                            </label>
                            <label>
                                Mid:
                                <input type="range" min="0" max="100" />
                            </label>
                        </div>
                    )}
                </div>
                </div>
            
            </nav>

            {/* Piano Section */}
            <div className="piano-section">
                <Piano />
            </div>
        </div>
    );
};

export default HomePage;
