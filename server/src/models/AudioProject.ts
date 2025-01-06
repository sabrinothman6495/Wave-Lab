import { Schema, model, Document } from 'mongoose';

interface AudioProject extends Document {
  userId: string;
  title: string;
  audioUrl: string;
  // Add metadata fields
  duration?: number;
  waveformData?: number[];
  frequencyData?: number[];
  // You might want to add other metadata fields like:
  bpm?: number;
  key?: string;
  peakAmplitude?: number;
}

const audioProjectSchema = new Schema<AudioProject>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  audioUrl: { type: String, required: true },
  // Add metadata fields to schema
  duration: { type: Number },
  waveformData: [{ type: Number }],
  frequencyData: [{ type: Number }],
  // Optional additional metadata fields
  bpm: { type: Number },
  key: { type: String },
  peakAmplitude: { type: Number }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true },
});

const AudioProjectModel = model<AudioProject>('AudioProject', audioProjectSchema);

export default AudioProjectModel;