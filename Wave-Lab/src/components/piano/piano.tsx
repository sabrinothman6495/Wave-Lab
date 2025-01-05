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
    { isBlack: false }, // C1
    { isBlack: true },  // C#
    { isBlack: false }, // D1
    { isBlack: true },  // D#
    { isBlack: false }, // E1
    { isBlack: false }, // F1
    { isBlack: true },  // F#
    { isBlack: false }, // G1
    { isBlack: true },  // G#
    { isBlack: false }, // A1
    { isBlack: true },  // A#
    { isBlack: false }, // B1
    { isBlack: false }, // C2
    { isBlack: true },  // C#
    { isBlack: false }, // D2
    { isBlack: true },  // D#
    { isBlack: false }, // E2
    { isBlack: false }, // F2
    { isBlack: true },  // F#
    { isBlack: false }, // G2
    { isBlack: true },  // G#
    { isBlack: false }, // A2
    { isBlack: true },  // A#
    { isBlack: false }, // B2
    { isBlack: false }, // C3
    { isBlack: true },  // C#
    { isBlack: false }, // D3
    { isBlack: true },  // D#
    { isBlack: false }, // E3
    { isBlack: false }, // F3
    { isBlack: true },  // F#
    { isBlack: false }, // G3
    { isBlack: true },  // G#
    { isBlack: false }, // A3
    { isBlack: true },  // A#
    { isBlack: false }, // B3
    { isBlack: false }, // C4
    { isBlack: true },  // C#
    { isBlack: false }, // D4
    { isBlack: true },  // D#
    { isBlack: false }, // E4
    { isBlack: false }, // F4
    { isBlack: true },  // F#
    { isBlack: false }, // G4
    { isBlack: true },  // G#
    { isBlack: false }, // A4
    { isBlack: true },  // A#
    { isBlack: false }, // B4
    { isBlack: false }, // C5
    { isBlack: true },  // C#
    { isBlack: false }, // D5
    { isBlack: true },  // D#
    { isBlack: false }, // E5
    { isBlack: false }, // F5
    { isBlack: true },  // F#
    { isBlack: false }, // G5
    { isBlack: true },  // G#
    { isBlack: false }, // A5
    { isBlack: true },  // A#
    { isBlack: false }, // B5
    { isBlack: false }, // C6
    { isBlack: true },  // C#
    { isBlack: false }, // D6
    { isBlack: true },  // D#
    { isBlack: false }, // E6
    { isBlack: false }, // F6
    { isBlack: true },  // F#
    { isBlack: false }, // G6
    { isBlack: true },  // G#
    { isBlack: false }, // A6
    { isBlack: true },  // A#
    { isBlack: false }, // B6
    { isBlack: false }, // C7
    { isBlack: true },  // C#
    { isBlack: false }, // D7
    { isBlack: true },  // D#
    { isBlack: false }, // E7
    { isBlack: false }, // F7
    { isBlack: true },  // F#
    { isBlack: false }, // G7
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
