// src/routes/upload.ts
import express, { Request, Response } from 'express';
import multer from 'multer';
// import cloudinary from '../config/cloudinary';  // Ensure Cloudinary is properly configured


// Initialize the Express Router
const router = express.Router();

// Setup multer storage and file validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where audio files will be temporarily saved
  },
  filename: (req, file, cb) => {
    // You can modify the filename to avoid name collisions
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size (example: 50MB)
  fileFilter: (req, file, cb) => {
    // Only allow audio files
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      // cb(new Error('Invalid file type, only audio files are allowed'), false);
    }
  }
});

// Audio file upload route
router.post('/upload', upload.single('audioFile'), async (req: Request, res: Response) => {
  try {
    // Validate the request body
    if (!req.body.userId || !req.body.title) {
      return res.status(400).json({ message: 'Missing required fields: userId or title' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto', // Automatically detect file type (audio, video, etc.)
    });

    // Create a new audio project entry in the database
    // const audioProject = new AudioProjectModel({
    //   userId: req.body.userId,         // Ensure userId is passed in request
    //   title: req.body.title,           // Ensure title is passed in request
    //   audioUrl: result.secure_url,     // URL of the uploaded file in Cloudinary
    //   cloudinaryId: result.public_id,  // Cloudinary public_id for future reference (deleting/updating)
    // });

    // Save the audio project to the database
    // await audioProject.save();

    // // Send success response
    // res.status(200).json(audioProject);

  } catch (error: any) {
    console.error(error);  // Log the error for debugging

    // Send error response
    res.status(500).json({
      message: 'Error uploading audio file',
      error: error.message || 'Internal server error',
    });
  }
});

export default router;
