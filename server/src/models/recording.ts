import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for Recording document
export interface IRecording extends Document {
  title: string;
  audioUrl: string;
  duration: number;         
  fileType: string;      
  createdBy: mongoose.Schema.Types.ObjectId;  
  createdAt: Date;
  updatedAt: Date;
}

// Recording Schema
const recordingSchema = new Schema<IRecording>({
  title: { type: String, required: true },
  audioUrl: { type: String, required: true }, // URL of the audio file (from Cloudinary or local storage)
  duration: { type: Number, required: true },  // Duration in seconds
  fileType: { type: String, required: true },  // e.g., mp3, wav, etc.
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });  // Adds createdAt and updatedAt automatically

// Recording Model
const Recording = mongoose.model<IRecording>('Recording', recordingSchema);

export default Recording;
