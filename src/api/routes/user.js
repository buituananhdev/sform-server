import { Router } from 'express';
import { changePassword, login, logout } from '../controllers/user/index.js';
import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// AUTH
router.post('/login', login);
router.post('/logout', auth, logout);
// EDIT
router.post('/change-password', auth, changePassword);

export default router