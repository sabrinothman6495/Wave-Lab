import mongoose, { Document, Schema } from "mongoose";

export interface IAudio extends Document {
  filename: string;
  filepath: string;
  uploadTime: Date;
}

const AudioSchema: Schema = new Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  uploadTime: { type: Date, default: Date.now },
});

export default mongoose.model<IAudio>("Audio", AudioSchema);
