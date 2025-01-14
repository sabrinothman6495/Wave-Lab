import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import "./piano.css";
import PlaybackEditor from "../playback/playbackEditor";
import EQControls from "../dropdown/tone";
import WaveSurfer from "wavesurfer.js";
import InstrumentSelector from "../dropdown/instrument";

interface PianoKeyProps {
  isBlack: boolean;
  note: string;
  onClick: (note: string) => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({ isBlack, note, onClick }) => {
  return (
    <div
      className={isBlack ? "black-key" : "white-key"}
      onClick={() => onClick(note)}
    ></div>
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

  const [audioBuffer, setAudioBuffer] = useState<ArrayBuffer | null>(null);
  const [savedRecordings, setSavedRecordings] = useState<
    { name: string; audioUrl: string }[]
  >([]);
  const [recordName, setRecordName] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<Tone.Recorder | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  const [selectedInstrument, setSelectedInstrument] = useState<string>("piano");
  const [synth, setSynth] = useState<Tone.PolySynth>(new Tone.PolySynth().toDestination());
  const eq = useRef(new Tone.EQ3().toDestination());

  useEffect(() => {
    switchInstrument(selectedInstrument);
  }, [selectedInstrument]);

  const switchInstrument = (instrument: string) => {
    synth.disconnect();

    let newSynth: Tone.PolySynth;
    switch (instrument) {
      case "guitar":
        newSynth = new Tone.PolySynth(Tone.FMSynth).toDestination();
        break;
      case "trumpet":
        newSynth = new Tone.PolySynth(Tone.AMSynth).toDestination();
        break;
      case "piano":
      default:
        newSynth = new Tone.PolySynth(Tone.Synth).toDestination();
        break;
    }

    newSynth.connect(eq.current);
    setSynth(newSynth);
  };

  const playNote = (note: string) => {
    synth.triggerAttackRelease(note, "8n");
  };

  const startRecording = () => {
    recorder.current = new Tone.Recorder();
    synth.connect(recorder.current);
    recorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (!recorder.current) return;

    const recording = await recorder.current.stop();
    const arrayBuffer = await recording.arrayBuffer();
    setAudioBuffer(arrayBuffer);

    setIsRecording(false);
    recorder.current = null;
  };

  const playbackRecording = () => {
    if (!audioBuffer) {
      alert("No recording available for playback.");
      return;
    }

    const audioUrl = URL.createObjectURL(new Blob([audioBuffer]));
    waveSurferRef.current?.load(audioUrl);
    waveSurferRef.current?.on("ready", () => waveSurferRef.current?.play());
  };

  const saveRecording = () => {
    if (!audioBuffer || !recordName.trim()) {
      alert("Please enter a name for the recording.");
      return;
    }

    const audioUrl = URL.createObjectURL(new Blob([audioBuffer]));
    setSavedRecordings((prev) => [...prev, { name: recordName, audioUrl }]);
    setRecordName("");
  };

  const handleEQChange = (preset: string) => {
    switch (preset) {
      case "flat":
        eq.current.low.value = 0;
        eq.current.mid.value = 0;
        eq.current.high.value = 0;
        break;
      case "bassBoost":
        eq.current.low.value = 12;
        eq.current.mid.value = 0;
        eq.current.high.value = -12;
        break;
      case "midBoost":
        eq.current.low.value = -12;
        eq.current.mid.value = 12;
        eq.current.high.value = -12;
        break;
      case "trebleBoost":
        eq.current.low.value = -12;
        eq.current.mid.value = 0;
        eq.current.high.value = 12;
        break;
      default:
        eq.current.low.value = 0;
        eq.current.mid.value = 0;
        eq.current.high.value = 0;
    }
  };

  return (
    <div className="piano-container">
      {/* Instrument Selector */}
      <InstrumentSelector onSelectInstrument={setSelectedInstrument} />

      {/* EQ Controls */}
      <EQControls onEQChange={handleEQChange} />

      {/* Recording Controls */}
      <div className="recording-controls">
        {!isRecording && (
          <button className="start-record-btn" onClick={startRecording}>
          </button>
        )}
        {isRecording && (
          <button className="stop-record-btn" onClick={stopRecording}>
          </button>
        )}
      </div>

      {/* Piano Keys */}
      <div className="piano">
        {notes.map((note, index) => (
          <PianoKey key={index} isBlack={note.isBlack} note={note.note} onClick={playNote} />
        ))}
      </div>

      {/* Playback Controls */}
      <div className="playback-controls">
        <button className="play-btn" onClick={playbackRecording}>
        </button>
      </div>

      {/* Save Recording Section */}
      {audioBuffer && (
        <div className="save-recording">
          <input
            type="text"
            value={recordName}
            placeholder="Enter recording name"
            onChange={(e) => setRecordName(e.target.value)}
          />
          <button onClick={saveRecording}>Save Recording</button>
        </div>
      )}

      {/* Playback Editor */}
      <PlaybackEditor
        audioBuffer={audioBuffer}
        savedRecordings={savedRecordings}
        waveSurferRef={waveSurferRef}
      />
    </div>
  );
};

export default Piano;