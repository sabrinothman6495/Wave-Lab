import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
const upload = multer();
const router = Router();
router.post('/upload', upload.single('audioFile'), [
    body('userId').notEmpty().withMessage('User ID is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Continue with file upload logic...
    }
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Continue with file upload logic...
});
