import React, { useState } from "react";
import * as Tone from "tone";
import "./piano.css";

// Interface for key properties
interface KeyProps {
  isBlack: boolean;
  note: string;
  onClick: (note: string) => void;
}

// Individual Piano Key Component
const PianoKey: React.FC<KeyProps> = ({ isBlack, note, onClick }) => {
  return (
    <div
      className={isBlack ? "black-key" : "white-key"}
      onClick={() => onClick(note)}
    >
      {isBlack && <div />}
    </div>
  );
};

const Piano: React.FC = () => {
  const notes = [
    { isBlack: false, note: "C1" }, // C1
    { isBlack: true, note: "C#1" },  // C#
    { isBlack: false, note: "D1" }, // D1
    { isBlack: true, note: "D#1" },  // D#
    { isBlack: false, note: "E1" }, // E1
    { isBlack: false, note: "F1" }, // F1
    { isBlack: true, note: "F#1" },  // F#
    { isBlack: false, note: "G1" }, // G1
    { isBlack: true, note: "G#1" },  // G#
    { isBlack: false, note: "A1" }, // A1
    { isBlack: true, note: "A#1" },  // A#
    { isBlack: false, note: "B1" }, // B1
    { isBlack: false, note: "C2" }, // C2
    { isBlack: true, note: "C#2" },  // C#
    { isBlack: false, note: "D2" }, // D2
    { isBlack: true, note: "D#2" },  // D#
    { isBlack: false, note: "E2" }, // E2
    { isBlack: false, note: "F2" }, // F2
    { isBlack: true, note: "F#2" },  // F#
    { isBlack: false, note: "G2" }, // G2
    { isBlack: true, note: "G#2" },  // G#
    { isBlack: false, note: "A2" }, // A2
    { isBlack: true, note: "A#2" },  // A#
    { isBlack: false, note: "B2" }, // B2
    { isBlack: false, note: "C3" }, // C3
    { isBlack: true, note: "C#3" },  // C#
    { isBlack: false, note: "D3" }, // D3
    { isBlack: true, note: "D#3" },  // D#
    { isBlack: false, note: "E3" }, // E3
    { isBlack: false, note: "F3" }, // F3
    { isBlack: true, note: "F#3" },  // F#
    { isBlack: false, note: "G3" }, // G3
    { isBlack: true, note: "G#3" },  // G#
    { isBlack: false, note: "A3" }, // A3
    { isBlack: true, note: "A#3" },  // A#
    { isBlack: false, note: "B3" }, // B3
    { isBlack: false, note: "C4" }, // C4
    { isBlack: true, note: "C#4" },  // C#
    { isBlack: false, note: "D4" }, // D4
    { isBlack: true, note: "D#4" },  // D#
    { isBlack: false, note: "E4" }, // E4
    { isBlack: false, note: "F4" }, // F4
    { isBlack: true, note: "F#4" },  // F#
    { isBlack: false, note: "G4" }, // G4
    { isBlack: true, note: "G#4" },  // G#
    { isBlack: false, note: "A4" }, // A4
    { isBlack: true, note: "A#4" },  // A#
    { isBlack: false, note: "B4" }, // B4
    { isBlack: false, note: "C5" }, // C5
    { isBlack: true, note: "C#5" },  // C#
    { isBlack: false, note: "D5" }, // D5
    { isBlack: true, note: "D#5" },  // D#
    { isBlack: false, note: "E5" }, // E5
    { isBlack: false, note: "F5" }, // F5
    { isBlack: true, note: "F#5" },  // F#
    { isBlack: false, note: "G5" }, // G5
    { isBlack: true, note: "G#5" },  // G#
    { isBlack: false, note: "A5" }, // A5
    { isBlack: true, note: "A#5" },  // A#
    { isBlack: false, note: "B5" }, // B5
    { isBlack: false, note: "C6" }, // C6
    { isBlack: true, note: "C#6" },  // C#
    { isBlack: false, note: "D6" }, // D6
    { isBlack: true, note: "D#6" },  // D#
    { isBlack: false, note: "E6" }, // E6
    { isBlack: false, note: "F6" }, // F6
    { isBlack: true, note: "F#6" },  // F#
    { isBlack: false, note: "G6" }, // G6
    { isBlack: true, note: "G#6" },  // G#
    { isBlack: false, note: "A6" }, // A6
    { isBlack: true, note: "A#6" },  // A#
    { isBlack: false, note: "B6" }, // B6
    { isBlack: false, note: "C7" }, // C7
    { isBlack: true, note: "C#7" },  // C#
    { isBlack: false, note: "D7" }, // D7
    { isBlack: true, note: "D#7" },  // D#
    { isBlack: false, note: "E7" }, // E7
    { isBlack: false, note: "F7" }, // F7
    { isBlack: true, note: "F#7" },  // F#
    { isBlack: false, note: "G7" }, // G7
  ];

  

// Synth instance for sound generation
const synth = new Tone.Synth().toDestination();

// State to track recorded notes
const [recordedNotes, setRecordedNotes] = useState<
  { note: string; time: number }[]
>([]);
const [isRecording, setIsRecording] = useState(false);

// Start time for recording
const [recordStartTime, setRecordStartTime] = useState<number | null>(null);

// Play a note
const playNote = (note: string) => {
  synth.triggerAttackRelease(note, "8n");

  // If recording, log the note and time
  if (isRecording && recordStartTime !== null) {
    const time = Tone.now() - recordStartTime;
    setRecordedNotes((prev) => [...prev, { note, time }]);
  }
};

// Start recording
const startRecording = () => {
  setRecordedNotes([]); // Clear previous recordings
  setRecordStartTime(Tone.now()); // Set start time
  setIsRecording(true);
};

// Stop recording
const stopRecording = () => {
  setIsRecording(false);
  setRecordStartTime(null);
};

// Playback recorded notes
const playback = () => {
  const now = Tone.now();
  recordedNotes.forEach(({ note, time }) => {
    synth.triggerAttackRelease(note, "8n", now + time);
  });
};

return (
  <div className="piano-container">
    {/* Piano Keys */}
    <div className="piano">
      {notes.map((note, index) => (
        <PianoKey
          key={index}
          isBlack={note.isBlack}
          note={note.note}
          onClick={playNote}
        />
      ))}
    </div>

    {/* Controls */}
    <div className="controls">
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <button onClick={playback} disabled={recordedNotes.length === 0}>
        Playback
      </button>
    </div>
  </div>
);
};

export default Piano;