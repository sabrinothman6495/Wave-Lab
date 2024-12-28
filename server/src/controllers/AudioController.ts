import { Request, Response } from "express";
import Audio from "../models/Audio";

// To upload an audio file
export const uploadAudio = async (req: Request, res: Response) => {
  try {
    const audio = new Audio({
      filename: req.file?.originalname,
      filepath: req.file?.path,
    });
    const savedAudio = await audio.save();
    res.json({ message: "Audio uploaded successfully", audio: savedAudio });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// this should get the list of uploaded audio files
export const getAudioList = async (req: Request, res: Response) => {
  try {
    const audioFiles = await Audio.find().sort({ uploadTime: -1 });
    res.json(audioFiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
