import express, { Request, Response } from 'express';
import multer from 'multer';
import AudioProjectModel from '../models/AudioProject';

interface AudioUploadBody {
  userId: string;
  title: string;
}

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/upload',
  upload.single('audioFile'),
  async (req: Request<{}, {}, AudioUploadBody>, res: Response) => {
    try {
      const result = {
        filename: req.file?.filename,
        path: req.file?.path,
      };

      const audioProject = new AudioProjectModel({
        userId: req.body.userId,
        title: req.body.title,
        audioUrl: result.path, // Assuming you want to store the file path
      });

      await audioProject.save();
      res.status(200).json(audioProject);
    } catch (error) {
      res.status(500).send('Error uploading audio file');
    }
  }
);

export default router;
