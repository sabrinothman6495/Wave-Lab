import React from "react";
import "./tone.css";

interface EQControlsProps {
  onEQChange: (preset: string) => void;
}

const EQControls: React.FC<EQControlsProps> = ({ onEQChange }) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onEQChange(event.target.value);
  };

  return (
    <div className="eq-controls">
      <label htmlFor="eq-presets">EQ Presets:</label>
      <select id="eq-presets" onChange={handleSelect}>
        <option value="flat">Flat</option>
        <option value="bassBoost">Bass Boost</option>
        <option value="midBoost">Mid Boost</option>
        <option value="trebleBoost">Treble Boost</option>
      </select>
    </div>
  );
};

export default EQControls;
