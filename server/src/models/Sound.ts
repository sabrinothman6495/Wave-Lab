import mongoose, { Schema, Document } from 'mongoose';

export interface ISound extends Document {
  userId: string;
  title: string;
  audioData: string;  // Base64 encoded audio data
  instrument: {
    piano: boolean;
    guitar: boolean;
    trumpet: boolean;
  };
  duration?: number;
  waveformData?: number[];
  frequencyData?: number[];
  createdAt: Date;
  updatedAt: Date;
}

const SoundSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    audioData: {
      type: String,  // Will store Base64 encoded audio data
      required: true
    },
    instrument: {
      piano: {
        type: Boolean,
        default: false
      },
      guitar: {
        type: Boolean,
        default: false
      },
      trumpet: {
        type: Boolean,
        default: false
      }
    },
    duration: {
      type: Number
    },
    waveformData: [{
      type: Number
    }],
    frequencyData: [{
      type: Number
    }]
  },
  { timestamps: true }
);

// Add index for faster queries
SoundSchema.index({ userId: 1, createdAt: -1 });

const Sound = mongoose.model<ISound>('Sound', SoundSchema);

export default Sound;