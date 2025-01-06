import mongoose, { Schema, Document } from 'mongoose';

export interface ISound extends Document {
  userId: string;
  title: string;
  audioUrl: string;
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
      ref: 'User' // This allows you to populate user data if needed
    },
    title: { 
      type: String, 
      required: true 
    },
    audioUrl: { 
      type: String, 
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
    // Audio metadata fields
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

const Sound = mongoose.model<ISound>('Sound', SoundSchema);

export default Sound;