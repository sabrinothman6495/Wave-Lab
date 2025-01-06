import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import * as Tone from "tone";
import "./playbackEditor.css";

const PlaybackEditor: React.FC = () => {
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState<ArrayBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const recorder = useRef<Tone.Recorder | null>(null);
  const synth = useRef(new Tone.Synth().toDestination());

  useEffect(() => {
    // Initialize WaveSurfer
    waveSurferRef.current = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#ddd",
      progressColor: "#007bff",
      cursorColor: "#333",
      height: 100,
    });

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, []);

  const startRecording = () => {
    if (recorder.current) return;
    setIsRecording(true);

    // Initialize Tone.Recorder
    recorder.current = new Tone.Recorder();
    synth.current.connect(recorder.current);
    recorder.current.start();
  };

  const stopRecording = async () => {
    if (!recorder.current) return;
    setIsRecording(false);

    const recording = await recorder.current.stop();
    const audioData = URL.createObjectURL(recording);
    const arrayBuffer = await recording.arrayBuffer();
    setAudioBuffer(arrayBuffer);
    loadWaveform(audioData);

    recorder.current = null; // Reset the recorder
  };

  const loadWaveform = (audioUrl: string) => {
    waveSurferRef.current?.load(audioUrl);
  };

  const playAudio = () => {
    if (!audioBuffer) return;
    setIsPlaying(true);

    waveSurferRef.current?.play();
    waveSurferRef.current?.on("finish", () => {
      setIsPlaying(false);
    });
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    waveSurferRef.current?.pause();
  };

  const saveAudio = () => {
    if (!audioBuffer) return;

    // Save audio as a file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([audioBuffer]));
    link.download = "recording.wav";
    link.click();
  };

  const cutAudio = () => {
    if (!audioBuffer || !waveSurferRef.current) return;

    const start = waveSurferRef.current.getCurrentTime();
    const end = waveSurferRef.current.getDuration();

    console.log(`Cut audio from ${start} to ${end}`);
    // Implement audio cutting logic if needed
  };

  return (
    <div className="playback-editor">
      <div id="waveform"></div>

      <div className="controls">
        {isRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
        <button onClick={isPlaying ? pauseAudio : playAudio} disabled={!audioBuffer}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={saveAudio} disabled={!audioBuffer}>
          Save
        </button>
        <button onClick={cutAudio} disabled={!audioBuffer}>
          Cut
        </button>
      </div>
    </div>
  );
};

export default PlaybackEditor;
