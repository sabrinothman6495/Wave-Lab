import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import multer from 'multer';

const upload = multer();

const router = Router();

interface AudioUploadBody {
  userId: string;
  title: string;
}

router.post(
  '/upload',
  upload.single('audioFile'),
  [
    body('userId').notEmpty().withMessage('User ID is required'),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Continue with file upload logic...
    }
  ],
  async (req: Request<{}, {}, AudioUploadBody>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Continue with file upload logic...
  }
);
