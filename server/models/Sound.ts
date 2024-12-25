import mongoose, { Document, Schema } from 'mongoose';

export interface ISound extends Document {
  title: string;
  filePath: string;
  tags: string[];
  createdBy: mongoose.Schema.Types.ObjectId;
  duration?: number; 
  format?: string;   
  size?: number;     
  isPublic: boolean; 
  createdAt: Date;
  updatedAt: Date;
}

// Sound Schema
const soundSchema = new Schema<ISound>(
  {
    title: { type: String, required: true },
    filePath: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => /^https?:\/\/.*|^[a-zA-Z]:\\/.test(value),
        message: 'Invalid file path or URL.',
      },
    },
    tags: { type: [String], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    duration: { type: Number }, 
    format: { type: String },   
    size: { type: Number },     
    isPublic: { type: Boolean, default: true }, 
  },
  { timestamps: true }
);

soundSchema.index({ title: 'text', tags: 1 });

const Sound = mongoose.model<ISound>('Sound', soundSchema);

export default Sound;
