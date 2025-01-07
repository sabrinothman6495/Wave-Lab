import React from "react";
import "./instrument.css";

interface InstrumentSelectorProps {
  onSelectInstrument: (instrument: string) => void;
}

const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({ onSelectInstrument }) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectInstrument(event.target.value);
  };

  return (
    <div className="instrument-selector">
      <label htmlFor="instrumentSelect">Select Instrument:</label>
      <select id="instrumentSelect" onChange={handleSelect}>
        <option value="piano">Piano</option>
        <option value="guitar">Guitar</option>
        <option value="trumpet">Trumpet</option>
      </select>
    </div>
  );
};

export default InstrumentSelector;