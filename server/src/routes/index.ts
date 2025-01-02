import type { Request, Response } from 'express';
import express from 'express';
const router = express.Router();
import { dirname } from 'path';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
import apiRoutes from './api/index.js';

router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

export default router;
