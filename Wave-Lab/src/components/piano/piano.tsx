import React from "react";
import "./piano.css";

interface KeyProps {
  isBlack: boolean;
  position?: string; // Used for black key positioning
}

const PianoKey: React.FC<KeyProps> = ({ isBlack }) => {
  return (
    <div className={isBlack ? "black-key" : "white-key"}>
      {isBlack && <div />}
    </div>
  );
};

const Piano: React.FC = () => {
  const notes = [
    { isBlack: false }, // C
    { isBlack: true },  // C#
    { isBlack: false }, // D
    { isBlack: true },  // D#
    { isBlack: false }, // E
    { isBlack: false }, // F
    { isBlack: true },  // F#
    { isBlack: false }, // G
    { isBlack: true },  // G#
    { isBlack: false }, // A
    { isBlack: true },  // A#
    { isBlack: false }, // B
  ];

  return (
    <div className="piano">
      {notes.map((note, index) => (
        <PianoKey key={index} isBlack={note.isBlack} />
      ))}
    </div>
  );
};

export default Piano;
