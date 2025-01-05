import mongoose, { Schema, Document } from 'mongoose';

export interface ISound extends Document {
  piano: boolean;
  guitar: boolean;
  trumpet: boolean;
  
}


const SoundSchema: Schema = new Schema(
  {
    piano: { type: String, required: true },
    guitar: { type: String, required: true },
    trumpet: { type: String },
  },
  { timestamps: true }
);

const Sound = mongoose.model<ISound>('Sound', SoundSchema);

export default Sound;
