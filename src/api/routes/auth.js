import { Router } from 'express';
import { login, logout, refreshToken } from '../controllers/auth/index.js';
import { auth } from '../middlewares/index.js';
const router = Router();

// AUTH
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/refresh', auth, refreshToken);

export default router