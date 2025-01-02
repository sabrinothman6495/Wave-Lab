import mongoose, { Schema, Document } from 'mongoose';

export interface ISound extends Document {
  piano: boolean;
  guitar: boolean;
  trumpet: boolean;
  
}


const SoundSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Sound = mongoose.model<ISound>('Sound', SoundSchema);

export default Sound;
