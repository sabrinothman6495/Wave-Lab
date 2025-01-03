
import { Schema, model } from 'mongoose';

const soundSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creatorUsername: {  // Adding username for easy reference
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  toneData: {
    sequence: {
      type: Object,
      required: true
    },
    bpm: {
      type: Number,
      required: true,
      default: 120
    },
    settings: {
      type: Object,
      required: true
    }
  },
  tags: [String],
  isPublic: {
    type: Boolean,
    default: false
  }
});

const Sound = model('Sound', soundSchema);
export default Sound;