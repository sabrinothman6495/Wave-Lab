// src/controllers/recordingController.ts
import { Request, Response } from 'express';
import Recording from '../models/Recording';
import cloudinary from '../config/cloudinary';  // Make sure Cloudinary is configured
import { generateAudioMetadata } from '../utils/audioUtils';  // Utility to extract metadata from audio

// Handle uploading a new recording
export const uploadRecording = async (req: Request, res: Response) => {
  try {
    const { userId, title } = req.body;

    // Check if userId and title are provided
    if (!userId || !title) {
      return res.status(400).json({ message: 'Missing userId or title' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }

    // Upload the audio file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'audio',  // Specifically for audio files
    });

    // Extract metadata from the uploaded audio file (e.g., duration, file type)
    const metadata = await generateAudioMetadata(req.file.path);

    // Create a new recording document
    const recording = new Recording({
      title,
      audioUrl: result.secure_url,  // URL of the audio file from Cloudinary
      duration: metadata.duration,  // Audio duration in seconds
      fileType: metadata.fileType,  // File format (mp3, wav, etc.)
      createdBy: userId,            // User who uploaded the file
    });

    // Save the new recording to the database
    await recording.save();

    // Send success response
    res.status(200).json(recording);

  } catch (error: any) {
    console.error(error);  // Log the error
    res.status(500).json({
      message: 'Error uploading the recording',
      error: error.message || 'Internal server error',
    });
  }
};
