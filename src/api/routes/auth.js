import { Router } from 'express';
import { login } from '../controllers/auth/index.js';

const router = Router();

// AUTH
router.post('/login', login);

export default router