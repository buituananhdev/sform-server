import { Router } from 'express';
import { uploadFile } from '../controllers/storage/index.js';
import upload from '../middlewares/upload.middleware.js';
import { auth } from '../middlewares/index.js';

const router = Router();

// POST
router.post('/upload', auth, upload.single('file'), uploadFile);

export default router