// server/src/models/Sound.ts
import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for Sound document
export interface ISound extends Document {
  title: string;
  filePath: string;
  tags: string[];
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Sound Schema
const soundSchema = new Schema<ISound>({
  title: { type: String, required: true },
  filePath: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Sound Model
const Sound = mongoose.model<ISound>('Sound', soundSchema);

export default Sound;
